const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require ('../controllers/comment');

router.post('/comments', auth, commentCtrl.createComment);
router.get('/comments/:postId', auth, commentCtrl.getCommentsByPostId);
router.delete('/comments/:commentId/:userId', auth, commentCtrl.deleteComment);
router.put('/comments/:commentId/:userId', auth, commentCtrl.modifyComment);


module.exports = router;