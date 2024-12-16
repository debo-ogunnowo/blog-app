const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).send('<h1> Unauthorized access </h1>');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // Add the decoded user information to the request object
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).send('<h1> User does not exist </h1>');
    }
  
    req.user = user;
  
    // call the next middleware function
    next();
  
  } catch (error) {
    res.clearCookie('token');
    console.error(error);
    return res.status(401).send('<h1> Invalid Token </h1>');
  }
} 

module.exports = auth