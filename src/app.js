const express = require("express")
const path = require("path")
const hbs = require("hbs")

const app = express()
require("./db/conn")
const Register = require("./models/registers")
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))

app.set("view engine","hbs");
app.set("views",template_path)

app.get("/",(req,res)=>
{ 
    res.render("index");
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

   const registered =  await registerUsers.save()
   res.status(201).render("login");
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

    if((userEmail.email === email) && (userEmail.password === password))
    {
        res.status(201).render("successlogin")
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


app.listen(port,()=>
{
    console.log(`server is running at port no ${port}`)
})