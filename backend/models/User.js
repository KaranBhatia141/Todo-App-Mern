const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String, 
        required:true
}

});

let User = mongoose.model('User' , UserSchema);

module.exports = User;