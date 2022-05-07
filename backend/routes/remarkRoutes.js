const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const remarkCtrl = require('../controllers/remarkControllers')

router.post('/addRemark/:postId/:userId', auth, remarkCtrl.createRemark)
router.get('/allRemark/:id', auth, remarkCtrl.getRemarkAll)
router.delete('/remarkDelete/:id', auth, remarkCtrl.deleteRemark)
router.put('/remarkUpdate/:id', auth, remarkCtrl.updateRemark)


module.exports = router;
