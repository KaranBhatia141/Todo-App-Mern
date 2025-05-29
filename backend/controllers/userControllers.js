const User = require('../models/User');  
const bcrypt = require("bcryptjs"); // bcrypt that use for hashing for secure password 

const updateUsername = async (req,res)=>{ // update username fun()
    const {newUsername , password} = req.body;  // requring newUsername and pass  
    
    try{  // codition check or error 
       const user = await User.findById(req.user.userId); // finding user in db by id 

        if(!user){  // checking user 
            return res.status(404).json({message:'User not found'});  // sending response 
        }
        const isMatch = await bcrypt.compare(password , user.password); // is Matched condition for capmare password is rigth or not 

        if(!isMatch){ // condition that password is rigth or not  
            return res.status(401).json({message:"Invalid password"}); // sending response 

        }
            user.username = newUsername; // puting newUsername
            await user.save(); // saving name in db 
            res.json({message: 'Username updated Successfully' , username:user.username});  // sending response 
    }catch(err){ // block for error 
        console.error(err);  // display error
        res.status(500).json({message:'Server error'});  // sending error 

        
    }
};

const updatePassword = async (req , res )=>{  // update password 
    const {currentPassword , newPassword} = req.body;  // require current password , newPassword 

    try{  // check error or conditions 
        const user = await User.findById(req.user.userId);  // finding user in Db 

         if(!user){  // if user in not there send messages uesser not found 
            return res.status(404).json({message:'User not found'});
        }
        const isMatch = await bcrypt.compare(currentPassword , user.password);  // checking password that user is legitemate 

        if(!isMatch){  // check  password is right or not 
            return res.status(401).json({message:"Invalid password"});  // send msg that invalid password

        }
        const hash = bcrypt.hashSync(newPassword ,(10));  // new pass hashing
        user.password = hash;  // covernt into hashing 
        await user.save(); // saving in db 
        res.json({ message: 'Password changed successfully' }); // sending response 
    }catch(err){  // catch error if there 
        console.error(err);  // display error 
        res.status(500).json({message:'server error'})  //sending response to client
    }
}

module.exports = {updateUsername , updatePassword};