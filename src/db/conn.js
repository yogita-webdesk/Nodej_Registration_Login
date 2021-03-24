const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/registrationForm",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>
{
    console.log("successfull")
}).catch((e)=>
{
    console.log("no connection")
})