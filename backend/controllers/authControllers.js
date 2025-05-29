const User = require('../models/User'); // user models for db 
const bcrypt = require('bcryptjs'); // its help us to protect our password with hashing
const jwt = require('jsonwebtoken'); // jwt help in user authentication and user session 
const dotenv = require('dotenv'); // it help us to hide our enviorment  variable 

dotenv.config();  // dotenv class to access evnorment variable



const register = async(req , res )=>{    // register fun()
   const {username , email , password} = req.body;  //  aquring varable from body 
   try{              // block for cases
    const userExist = await User.findOne({email}); // condition that checkk the user is already exist or not
     if(userExist){ //
        return res.status(400).json({message: 'Email Already Exist'}); //return status email alreay exist
     }
     const hash = bcrypt.hashSync(password ,10); //hash for password 
     const newUser = await User.create({username , email , password:hash}); // saving new user in db 
      res.status(201).json({message:'User Registerd Successfully'}); // respons after creating  user
   }catch(err){   // block that catch error 
     res.status(500).json({message:'Server error' ,error:err.message}) // server error
   }
}

const login = async(req , res)=>{   // login function   
    const {email , password} = req.body;  // aquire email and password from body 

    try{   // try block that help to for condition  
        const user = await User.findOne({email}); // condition to check user is existed in  db or not
        if(!user){ 
            return res.status(400).json({message:'User not found'});  // response if user is not existed
        }
        const isMatch = bcrypt.compareSync(password, user.password);  // if user found check password is correct or not
         if(!isMatch){  
            return res.status(401).json({message:"Invalid credentials"});  //send response thta user is existed
         }
         const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET_KEY);  // create user session 
         res.status(200).json({token , user:{    //send response to clint side 
            username:user.username,     
            email: user.email,
         }});
    }catch(err){   // block for error 
        console.error('Login Error:' , err);  // diaplay error 
        res.status(500).json({message:'Server error' , error:err.message});
    }

};




module.exports = {register , login};