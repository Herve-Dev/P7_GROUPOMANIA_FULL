const { Post, User } = require('../models');

module.exports = async (req, res, next) =>  {
    const postId = req.params.id;
    const userId = req.token.userId
    const foundPost = await Post.findOne({include: [{model: User, attributes: ['username']}], attributes: ['id', 'title', 'content', 'attachment', 'likes', 'dislikes'], where: { id: postId}})
   
        let idInLikes = []//foundPost.likes.split(',')
        let idInDislikes = []

        let userInLikes = foundPost.likes.split(',');
        let userInDislikes = foundPost.dislikes.split(',');

        userInLikes.forEach(searchId => {
            idInLikes.push(parseInt(searchId)) ;        
        }); 

        userInDislikes.forEach(searchId => {
            idInDislikes.push(parseInt(searchId))
        })

        if (idInDislikes.includes(userId)) {  
            return res.status(404).json({message: "vous avez deja disliké le post de " + foundPost.User.username })
        }

        if (idInLikes.includes(userId)) {
            return res.status(404).json({message: "vous avez deja liké le post de " + foundPost.User.username})
        }

        next()
        
}