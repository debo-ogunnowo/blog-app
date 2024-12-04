const express = require('express');
const router = express.Router();
const { renderHome, createPost, getPosts, updatePost, deletePost } = require('../controllers/posts');

router.route('/posts').get(renderHome).get(getPosts).post(createPost);
router.route('/posts/:id').patch(updatePost).delete(deletePost);

module.exports = router