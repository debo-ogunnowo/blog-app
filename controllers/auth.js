const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const renderLogin = (req, res) => {
  res.render('pages/login');
}

const renderSignup = (req, res) => {
  res.render('pages/signup');
}

const createUser = async (req, res) => {
  const {username, password} = req.body;

  const user = new User({username, password});

  await user.save();

  const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET);
  res.cookie('token', token, {httpOnly: true});
  console.log(`User created: ${user.username}`, token);
  res.redirect('/api/posts');
};

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password required');
    }

    const user = await User.findOne({username});

    if (!user){
      return res.status(401).send('Incorrect username or passwrod');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword){
      return res.status(401).send('Incorrect username or passwrod');
    }

    const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/api/posts');
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
};

module.exports = { createUser, loginUser, renderLogin, renderSignup };

