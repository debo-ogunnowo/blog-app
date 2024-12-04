const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({message: 'Unauthorized'});
    }
  
    const token = req.headers.authorization.split(' ')[1];
  
    // verify token
    if (!token){
      return res.status(401).json({message: 'Unauthorized'});
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // Add the decoded user information to the request object
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({message: 'User does not exist'});
    }
  
    req.user = user;
  
    // call the next middleware function
    next();
  
  } catch (error) {
    return res.status(401).json({message: 'Invalid token'});
  }
} 

module.exports = auth