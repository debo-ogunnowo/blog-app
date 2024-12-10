const Post = require('../models/Post');

const renderHome = async (req, res) => {
 try {
  const userId = req.user.id;
  /* const posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
  ]; */

  const DbPosts = await Post.find({userId: userId});
  const posts = DbPosts.reverse();

  if (!posts) {
    return res.status(401).send('<h1> Something went wrong </h1>');
  }

  if (posts.length === 0) {
    // add a page to show no posts yet later
    return res.render('pages/homeEmpty');
  }

  res.render('pages/home', { posts });
 } catch (error) {
  console.error(error);
  return res.status(500).send('<h1> Internal server error </h1>');
 }
};

const renderNewPost = (req, res) => {
  res.render('pages/newPost');
};

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;

    const {title, content} = req.body;

    const newPost = new Post({title, content, userId});
    await newPost.save();

    console.log(newPost);
    res.redirect('/api/posts');
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) 
      res.status(404).send('<h1> Post not found </h1>');

    return res.render('pages/editPost', {post});
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
}

const updatePost = async (req, res) => {
  const {title, content} = req.body;

  try {
    const postId = req.params.id;
  
    const updatedPost = await Post.findByIdAndUpdate(postId, {title, content}, {new: true});
    if (!updatedPost) 
      res.status(404).send('<h1> Post not found </h1>');

    console.log(updatedPost);
    res.redirect('/api/posts');
    
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
};

const deletePost = async (req, res) => {
 try {
  const postId = req.params.id;

  const post = await Post.findByIdAndDelete({_id: postId});
  
  console.log('Post deleted');
 } catch (error) {
  console.error(error);
  return res.status(500).send('<h1> Internal server error </h1>');
 }
  
};

module.exports = { renderHome, renderNewPost, createPost, getPost, updatePost, deletePost };

