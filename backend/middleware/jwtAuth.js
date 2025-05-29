const jwt = require('jsonwebtoken');

const auth = function(req ,res , next){  // auth middleware that chech user is authenticated or not 
    const authHeader = req.header('Authorization') // header that conferm that req coming is autharized 
    const token = authHeader?.split(' ')[1];  // exctarcting token 
    if(!token){   // check credentials or user data 
       return  res.status(401).json({message:'No token Auth denied'});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);  //check user server is not expired 
        req.user = {userId:decode.userId} // showing user role 
        
        
        next(); //continue
    }catch(err){  // check error
       res.status(401).json({message:"Token is not valid "})
    }
};

module.exports = auth;
