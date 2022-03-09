const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require ('../controllers/post');
const multer = require('../middleware/multer-config');



router.post('/posts', multer, postCtrl.createPost);
//router.get('/posts', /*auth,*/ postCtrl.getAllPosts);
//router.put('/posts/:postId', /*auth,*/ postCtrl.modifyPost);
//router.post('/posts/:postId', /*auth,*/ postCtrl.deletePost);


module.exports = router;