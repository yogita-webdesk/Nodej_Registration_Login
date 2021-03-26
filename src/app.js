const express = require("express")
const path = require("path")
const hbs = require("hbs")
const cookie_parcer = require("cookie-parser")


const app = express()
require("./db/conn")
const Register = require("./models/registers")
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")

const index = path.join(__dirname,"../templates/views/index.hbs")
console.log(index)

app.use(express.json());

app.use(cookie_parcer())

const auth = require("./middleware/auth")

app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))

app.set("view engine","hbs");

app.set("views",template_path)

app.get("/",(req,res)=>
{ 
    res.render("index");
})
app.get("/secret",auth,(req,res)=>
{ 
    res.render("secret");
   console.log(`this is awesome ${req.cookies.jwt}`);

})
app.get("/register",(req,res)=>
{ 
    res.render("register");
})
app.post("/register",async(req,res)=>
{ 
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
if(password === cpassword)
{
    const registerUsers = new Register({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,

    })

    const token = await registerUsers.generateToken()
    console.log(token)

   
   const registered =  await registerUsers.save()
   res.status(201).render("login");
   res.cookie("jwt",token)
    

}
else{
    res.send("password are not matching")
}
        // console.log(req.body.firstname);
        // res.send(req.body.firstname)
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})
app.get("/login",(req,res)=>
{ 
    res.render("login");
})

app.post("/login",async(req,res)=>
{ 
   try
   {
        const email = req.body.email;
        const password = req.body.password;

    const userEmail= await Register.findOne({email:email})
    const token = await userEmail.generateToken()
    console.log(token)

    res.cookie("jwt",token)

    

    if((userEmail.email === email) && (userEmail.password === password))
    {
        res.status(201).render("index")
    }
    else{
        res.send("invalid details")
    }

   }
   catch(error)
   {
       res.status(400).send("invalid")
   }
})

// const jwt = require("jsonwebtoken")

// const createTokenc=async()=>
// {
//   const token = await jwt.sign({_id:"605b35834f7a2f381c0d0ff5"},"cyfcejcvgyygyjyuuuuuuuuuvcejv")
//     console.log(token)
//   const veryToken = await jwt.verify(token,"cyfcejcvvcejv")
//   console.log(veryToken)
// }
// createTokenc()
app.listen(port,()=>
{
    console.log(`server is running at port no ${port}`)
})