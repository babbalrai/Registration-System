const express = require('express')
const path = require("path");
require("./conn");

const app = express();
const port = 3000;
const static_path = path.join(__dirname,"/public")
// console.log(path.join(__dirname,"/public"));
app.use(express.static(static_path))
app.set("view engine","hbs")
app.get('/',(req,res)=>{
  res.send("hello fromt the harish")
})
app.listen(port,()=>{
  console.log(`server is ruunig at port no ${port}`)
})