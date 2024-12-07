const Post = require('../models/Post');

const renderHome = async (req, res) => {
 try {
  const userId = req.user.id;
  /* const posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
  ]; */

  const posts = await Post.find({userId: userId});

  if (!posts) {
    return res.status(401).send('<h1> Something went wrong </h1>');
  }

  if (posts.length === 0) {
    // add a page to show no posts yet later
    return res.status(200).send('<h1> Nothing added yet </h1>');
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

const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Posts.find({userId: userId});
  if (!posts) {
    return res.status(401).send('<h1> Something went wrong </h1>');
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;

    const {title, content} = req.body;

    const newPost = await new Post({title, content, userId});
    await newPost.save();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updatePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const updatedPost = await Post.findByIdAndUpdate({_id: postId}, {userId: userId}, req.body);

};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  const updatedPost = await Post.findByIdAndDelete({_id: postId}, {userId: userId}, req.body);
};

module.exports = { renderHome, renderNewPost, createPost, getPosts, updatePost, deletePost };

