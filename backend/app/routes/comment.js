const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require ('../controllers/comment');

router.post('/comments', auth, commentCtrl.createComment);
router.get('/comments/:postId', commentCtrl.getCommentsByPostId);
router.delete('/comments/:commentId/:userId', auth, commentCtrl.deleteComment);


module.exports = router;