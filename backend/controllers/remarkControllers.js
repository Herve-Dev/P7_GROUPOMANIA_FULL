const { Post, User, Remark } = require('../models');

exports.createRemark = async (req, res, next) => {
    const postId = parseInt(req.params.postId)  ; 
    const userId = req.token.userId
    const usernameUser = req.token.username

    const {comment} = req.body

    if (!comment) {
        return res.status(400).json({'error': 'le Champs "Votre commentaire" doit être rempli '})
    }

    const addRemark = await Remark.create({postId: postId, userId: userId, comment: comment, username: usernameUser})
    
    if (addRemark) {
        res.status(200).json({addRemark ,message :'Nouveau commentaire ajouté'})
    }

}

exports.updateRemark = async (req, res, next) => {
    const {comment} = req.body
    const remarkId = parseInt(req.params.id)
    const userRemarkId = await Remark.findOne({where: {id: remarkId}})
    
    try {
        if (userRemarkId) {
            userRemarkId.comment = comment
            await userRemarkId.save()
            return res.status(200).json({message: "Commentaire mis à jour"})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
   
}

exports.deleteRemark = async (req, res, next) => {
    const remarkId = parseInt(req.params.id) 
    const postId = parseInt(req.params.postId)
    const userIdToken = req.token.userId
    const usernameToken = req.token.username
    const userRemarkId = await Remark.findOne({attributes: ['id', 'username'], where: {id: remarkId}})
    const searchAdmin = await User.findOne({attributes: ['username','isAdmin'], where: {id: userIdToken}})
    
    try {
        
        if (userRemarkId.username === usernameToken) {
            await userRemarkId.destroy();
            return res.status(200).json({message: "commentaire supprimez"})
        } 

        if (searchAdmin.isAdmin) {
            await userRemarkId.destroy()
            return res.status(200).json({message: "Vous avez supprimé ce commentaire en tant qu'administrateur !" })
        }

    } catch (error) {
        return res.status(400).json({error})
    }
    
}

exports.getRemarkAll = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.token.userId
    const searchRemark = Remark.findAll()
    res.status(200).json(searchRemark)
    
}

