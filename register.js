const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const employeeschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        default:"men"
    },
    phone:{
        type:Number,
        requried:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        require:true
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
employeeschema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({id:this._id.toString()},"harishthedeveloperheroworldsaver")
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token;
    }catch(error){
        res.send("the eror part"+error)
        console.log("the error part"+error)
    }
}


employeeschema.pre("save",async function(next){
   if(this.isModified("password")){
    console.log(`the current password is ${this.password}`)
    this.password = await bcrypt.hash(this.password,10);
    console.log(`the courrent passwrod is ${this.passowrd}`)
    this.confirmpassword= this.password 
   }
})

const Register = new mongoose.model("Register",employeeschema)
module.exports = Register;