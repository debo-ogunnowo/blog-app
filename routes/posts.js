const express = require('express');
const router = express.Router();
const { renderHome, renderNewPost, createPost, getPost, updatePost, deletePost } = require('../controllers/posts');

router.route('/posts').get(renderHome).post(createPost);
router.route('/posts/new').get(renderNewPost).post(createPost);
router.route('/posts/:id/edit').get(getPost);
router.route('/posts/:id').post(updatePost).delete(deletePost);

module.exports = router