const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/postControllers');
const LikesCtrl = require('../controllers/likesControllers');
const multer = require('../middleware/multer-config');

router.post('/newsWall', auth, multer, postCtrl.createPost);
router.put('/newsWall/like/:id', auth, LikesCtrl.likesOrDislikes)
router.put('/newsWall/update/:id', auth, multer, postCtrl.updatePost);
router.delete('/newsWall/postDelete/:id', auth, postCtrl.deletePost);


router.get('/newsWall', postCtrl.getAllPost);
router.get('/newsWall/myPost/:id',auth, postCtrl.getOneUserPost);


module.exports = router;