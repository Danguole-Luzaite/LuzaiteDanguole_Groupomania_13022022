const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// pour password-validator
//const passwordValidator = require('../middleware/password_validator');

router.post('/auth/create', /*passwordValidator,*/ userCtrl.create);
router.post('/auth/login', userCtrl.login );
router.get('/auth/users', userCtrl.getAllUsers );
router.get('/auth/users/:userId', userCtrl.getOneUser );
router.put('/auth/users/profile/:userId', auth, multer, userCtrl.updateUserProfile );


module.exports = router;