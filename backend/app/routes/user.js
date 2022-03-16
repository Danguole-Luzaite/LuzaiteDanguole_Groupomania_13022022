const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');
// pour password-validator
//const passwordValidator = require('../middleware/password_validator');

router.post('/auth/create', /*passwordValidator,*/ userCtrl.create);
router.post('/auth/login', userCtrl.login );
router.get('/auth/users', userCtrl.getAllUsers );


module.exports = router;