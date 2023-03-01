const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://comedyjungle12:matpuchyar@cluster0.kz31trb.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> console.log("connection successfull")).catch((err)=>console.log(err));
