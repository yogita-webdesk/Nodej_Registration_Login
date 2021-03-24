const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    },
     confirmpassword:{
        type:String,
        required:true
    },

})


// create collection

const Register = new mongoose.model("Registeruser",userSchema)

module.exports = Register