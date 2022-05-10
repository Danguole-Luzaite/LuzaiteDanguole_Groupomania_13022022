const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const passwordValidator = require('../middleware/password_validator');

router.post('/auth/create', userCtrl.create);
router.post('/auth/login', userCtrl.login );
router.get('/auth/users', userCtrl.getAllUsers );
router.get('/auth/users/:userId', userCtrl.getOneUser );
router.put('/auth/users/profile/:userId', auth, multer, userCtrl.updateUserProfile );
router.delete('/auth/users/:userId', auth, userCtrl.deleteUser );



module.exports = router;