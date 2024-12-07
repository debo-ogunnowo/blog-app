const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({message: 'Unauthorized access'});
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
    res.clearCookie('token');
    console.error(error);
    return res.status(401).json({message: 'Invalid token'});
  }
} 

module.exports = auth