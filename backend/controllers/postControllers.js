const { Post, User, Remark } = require('../models');
const fs = require('fs')

exports.createPost = async (req, res, next) => {
    const {title, content} = req.body;
    let attachment = req.file;
    
    try {
        
        if (!title || !content) {
            return res.status(400).json({'error': 'le titre et le contenu doivent etre compléter'})
        }

        if (attachment) {
            attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        const userIdToken = req.token.userId;
        const reqSqlSearchUser = await User.findOne({ where : userIdToken })

        if (!reqSqlSearchUser) {
            return res.status(401).json({'error': "Impossible de verifier l'utilisateur"})
        }
        
        const userPost = await Post.create({UserId: userIdToken, title: title, content: content, attachment: attachment, likes: 0})

        if (userPost) {
            res.status(200).json({message :'Nouveau post ajouté'})
        }
    } catch (error) {
        return res.status(500).json({error})
    }
   
}

exports.updatePost = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.token.userId;
    const {title, content} = req.body;
    let attachment = req.file
     
    const updatePost = {title: title, content:content, attachment:attachment};
    const searchUserPost = await Post.findOne({attributes: ['id','userId', 'title', 'content', 'attachment', 'likes'], where: { userId: userId, id: postId}})
    
    try {
        if (searchUserPost) {
            
            if (searchUserPost.userId == userId) {

                if (attachment) {
                    attachment =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                
                searchUserPost.update({
                    title: (title ? title : searchUserPost.title),
                    content: (content ? content : searchUserPost.content),
                    attachment: (attachment ? attachment : searchUserPost.attachment)
                })
                
                return res.status(200).json({message: "mise à jour de votre post réussi !"})
            }
            
        } else {
            return res.status(500).json({error: "mise a jour de votre poste échouer "})
        }
    } catch (error) {
        return res.status(500).json({ error })
    }      
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id; 
    //const usernameToken = req.token.username;
    const userIdToken = req.token.userId
    const userIdPost = await Post.findOne({attributes: ['id','userId', 'title', 'content', 'attachment'], where: {  id: postId } })
    const searchAdmin = await User.findOne({attributes: ['isAdmin'], where: {id: userIdToken}})
    const fileName = userIdPost.attachment.split("/images/")[1];
    
        if (userIdPost) {

            if (searchAdmin.isAdmin === true) {
                
                Remark.destroy({where: {postId: postId}})
                    .then(() => {
                        fs.unlink(`images/${fileName}`, () => {
                            userIdPost.destroy({where: {postId: postId}})
                            return res.status(200).json({message: "Vous avez supprimé ce post en tant qu'administrateur !" })
                        })
                    })
                    .catch((error) => {
                        return res.status(404).json({error})
                    })
            }
            
            if(userIdPost.userId == userIdToken) {

                Remark.destroy({where: {postId: postId}})
                    .then(() => {
                        fs.unlink(`images/${fileName}`, () => {
                            userIdPost.destroy({where: {postId: postId}})
                            return res.status(200).json({message: "Vous avez supprimé votre post !" })
                        })
                    })
                    .catch((error) => {
                        return res.status(404).json({error})
                    })
            } 
             
        }  
}

exports.getOneUserPost = async (req, res, next) => {
    try {
        const postId = req.params.id; 
        const userId = req.token.userId;
        const userIdPost = await Post.findAll({include: [{model: User, attributes: ['username', 'attachment']} ,{model: Remark}], attributes: ['id','title', 'content', 'attachment','likes','createdAt','updatedAt'], where: {userId : userId /*, postId: postId*/} }) // utiliser req params pour trouver élément selectionner 
        
            if (userIdPost) {
                res.status(200).json({profilPost :userIdPost})
                
            } else {
                res.status(404).json({message: "Vous avez aucun post pour l'instant !"})
            }
    } catch (error) {
        return res.status(404).json({ error })
    }  
}

exports.getAllPost = async (req, res, next) => {
    try {
        const allPost = await Post.findAll(
            {
                include: [
                    {   
                        model: User,
                        attributes: ['id','username', 'attachment']
                    }, 
                    {
                        model: Remark, 
                        attributes:['id','postId','username','comment'],
                        
                    }
                ], 
                attributes: ['id','userId','title', 'content', 'attachment','likes','createdAt','updatedAt'],
                
            });
            
            if (allPost) {
                res.status(200).json({allPostUser: allPost })
            }
        
    } catch (error) {
        return res.status(404).json({ message:error})
    }       
}

