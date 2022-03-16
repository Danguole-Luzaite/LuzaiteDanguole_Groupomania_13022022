const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require ('../controllers/post');
const multer = require('../middleware/multer-config');



router.post('/posts', auth, multer, postCtrl.createPost);
router.get('/posts/:postId', /*auth,*/ postCtrl.getOnePost);
//router.get('/posts', /*auth,*/ postCtrl.getAllPosts);
//router.put('/posts/:id', /*auth, multer,*/ postCtrl.modifyPost);
//router.post('/posts/:id', /*auth,*/ postCtrl.deletePost);


module.exports = router;