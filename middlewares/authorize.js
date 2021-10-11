const jwt = require('jsonwebtoken');

exports.authCheck = async (req,res,next) =>{
  // Get the request from header 
  let token = req.header('Authorization');
  if(!token){
      res.status(401).send('Access denied, No toke provided!')
  }
  token = token.split(" ")[1]
  // verify token 
  try{
      const validUser =  jwt.verify(token, process.env.mySecretKey)
      req.user = validUser;
      next();
  }catch(err) {
      return res.status(400).send('Invalid token')
  }
}