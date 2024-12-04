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
  const {username, passowrd} = req.body;

  const user = new User({username, password});

  await User.save();

  res.json(user);
};

const loginUser = async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }

  const user = await User.findOne({username});

  if (!user){
    return res.status(401).send('Incorrect username or passwrod');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword){
    return res.status(401).send('Incorrect username or passwrod');
  }

  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
};

module.exports = { createUser, loginUser, renderLogin, renderSignup };

