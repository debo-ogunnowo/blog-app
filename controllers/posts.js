const Post = require('../models/Post');

const renderHome = (req, res) => {
  const posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
  ];
  res.render('pages/home', { posts });
}

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

  const updatedPost = await Post.findByIdAndUpdate({_id: postId}, {userId: userId}, req.body);
};

module.exports = { renderHome, createPost, getPosts, updatePost, deletePost };

