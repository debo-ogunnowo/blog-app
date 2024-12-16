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
  try {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username});

    if (!existingUser) {
      const user = new User({username, password});

      await user.save();

      const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
      res.cookie('token', token, {httpOnly: true});
      console.log(`User created: ${user.username}`, token);
      res.redirect('/api/posts');
    }
    else {
      return res.status(401).send('<h1> Username already exists </h1>');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
};

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).send('<h1> Username and password required </h1>');
    }

    const user = await User.findOne({username});

    if (!user){
      return res.status(401).send('<h1> Incorrect username or password </h1>');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword){
      return res.status(401).send('<h1> Incorrect username or password </h1>');
    }

    const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/api/posts');
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1> Internal server error </h1>');
  }
};

module.exports = { createUser, loginUser, renderLogin, renderSignup };

