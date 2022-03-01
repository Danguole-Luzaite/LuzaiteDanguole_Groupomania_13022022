const express = require('express');
const router = express.Router();
const userCtrl = require ('../controllers/user');

router.post('/auth/create', userCtrl.create);
//router.post('/', userCtrl.login );


module.exports = router;