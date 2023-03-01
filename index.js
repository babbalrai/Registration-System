const express = require('express')
const path = require("path");
const hbs = require('hbs')
require("./conn");
const Register = require("./register")
const bodyParser = require('body-parser');



const app = express();

const port = 3000;
const static_path = path.join(__dirname,"/public")
// console.log(path.join(__dirname,"/public"));
// const template_path = path.join(__dirname,"/template/partials");

const template_path = path.join(__dirname,"/template/views");
const partials_path = path.join(__dirname,"/template/partials");
// app.use(express.static(static_path))

app.set('views', path.join(__dirname,"/views"))
app.set('view engine', 'hbs')
app.set("views",template_path);
hbs.registerPartials(partials_path)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  res.render("index")
})
app.get('/register',(req,res)=>{
  res.render("register")
})
app.get('/login',(req,res)=>{
  res.render("login")
})
app.get('/secret',(req,res)=>{
  res.render("secret")
})



app.post('/register',async(req,res)=>{
  try{
    console.log(req.body.firstname)
    console.log(req.body.password)
    console.log(req.body.confirmpassword)
    const password1 = req.body.password;
    const confirm = req.body.confirmpassword
    if(password1 == confirm){
     const registerEmployee = new Register({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      phone:req.body.phone,
      age:req.body.age,
      password:req.body.password,
      confirmpassword:req.body.confirmpassword,
     })
     const registered = await registerEmployee.save()
     console.log(registered)
    res.status(201).render("index")
    }
    else{
      res.send("password not matching")
    }
    

  }
  catch (err){
    res.status(400).send(err)
    console.log(err)
  }
})


app.post('/login',(req,res)=>{
try{
  const email = req.body.email;
  const password = req.body.password;
  const useremail= await Register.findOne({email:email})
  if(useremail.password === password){
    res.status(201).render("index")
  }
  else{
    res.send("password are not matching")
  }

}
catch(err){
  res.status(400).send("invalid login details")
}
})


app.listen(port,()=>{
  console.log(`server is ruunig at port no ${port}`)
})