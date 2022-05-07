const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/userControllers');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/passForget', userCtrl.verifyEmailPassForgot)

router.get('/myProfile/:id',auth, userCtrl.myprofile)
router.get('/profilUser/:id', auth, userCtrl.profilUserSelected)


router.put('/myProfile/update/:id', auth, multer, userCtrl.avatarAndBiography)
router.put('/updatePassworForget/:id',auth, userCtrl.updateForgetPassword)
router.put('/updateOldPassword/:id',auth, userCtrl.updateOldPass)

router.delete('/deleteProfil/:id', auth, userCtrl.deleteUser)


module.exports = router;