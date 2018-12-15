
const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts-controller');
const app = require('../app');

router.post('/', postsController.postPost);
router.put('/:id', postsController.putPost);
router.delete('/:id', postsController.deletePost);
router.post('/comment', postsController.postComment);
router.put('/comment/:id', postsController.putComment);
router.delete('/comment/:id', postsController.deleteComment);

module.exports = router;
