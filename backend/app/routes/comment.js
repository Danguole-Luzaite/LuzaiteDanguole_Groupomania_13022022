const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require ('../controllers/comment');

router.post('/comments', auth, commentCtrl.createComment);
router.get('/comments/:postId', commentCtrl.getCommentsByPostId);
//router.get('/comments/:commentId', commentCtrl.getOneCommentByPostId);
router.delete('/comments/:commentId/:userId', auth, commentCtrl.deleteComment);
router.put('/comments/:commentId/:userId', auth, commentCtrl.modifyComment);


module.exports = router;