
const { Post, User } = require('../models');

exports.likesOrDislikes = async (req, res, next) => {

    const postId = req.params.id; 
    const userId = req.token.userId
    const foundPost = await Post.findOne({include: [{model: User, attributes: ['username']}], attributes: ['id', 'title', 'content', 'attachment', 'likes'], where: { id: postId}})
    const likes =  req.body

    const liked = 1
    const notLikedOrDisliked = 0
    let userLiked ;
    
    if (likes.likes == liked) {
        
         /* Récuperation des id des utilisateurs déja existant stockage dans un array */
        let addUser = []
        let idInLikes = foundPost.likes.split(',')
        
        idInLikes.forEach(id => {
            addUser.push(parseInt(id) )
        })
            /* Vérification si id déja existant dans la base de donnée */
            if (addUser.includes(userId)) {
                return res.status(404).json({error: "Vous avez déja liké le post " + foundPost.User.username})
            }

        /* Ajout de l'id de l'utilisateur dans l'array */
        userLiked = userId
        addUser.push(userLiked)

        /* Transformation de l'array en string et stock dans la colonne Likes */
        foundPost.likes = addUser.toString()
        await foundPost.save() 
        return res.status(201).json({message: "vous avez liké le post de " + foundPost.User.username})

    }

    

    if ( likes.likes == notLikedOrDisliked) {

        let idInLikes = []
        let userInLikes = foundPost.likes.split(',');

        userInLikes.forEach(searchId => {
            idInLikes.push( parseInt(searchId) ); 
        });
        
        if (idInLikes.includes(userId)) {  
            
            idInLikes = idInLikes.filter(id => id !== userId)
            foundPost.likes = idInLikes.toString()
            await foundPost.save()
            return res.status(201).json({message: "vous ne likez plus le post de " + foundPost.User.username })
        }

    }
    
}