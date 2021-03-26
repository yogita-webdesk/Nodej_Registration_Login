const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

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
    role:
    {
        type:String,
        default:"user",
        enum:['user','admin','superadmin']
    },
    password:{
        type:String,
        required:true
    },
     confirmpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
        required:true
        }
    }]

})

userSchema.methods.generateToken = async function(){
    try
    {
        const token = await jwt.sign({_id:this._id},"gfkeugyeufkygygrkuegfrktekegfrykegfkyk")
        console.log(token)
        this.tokens = this.tokens.concat({token:token})
        return token;

    }
    catch(error)
    {
        console.log("the error part"+error)
    }
}

// create collection

const Register = new mongoose.model("Registeruser",userSchema)

module.exports = Register