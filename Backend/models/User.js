const mongoose=require("mongoose");
const Schema=require('mongoose').Schema

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female','Others']
    },
    qualification:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        enum:["Allergy and immunology","Anesthesiology","Dermatology","Diagnostic radiology","Emergency medicine","Family medicine","Internal medicine","Medical genetics","Neurology","Nuclear medicine","Obstetrics and gynecology","Ophthalmology","Pathology","Pediatrics","Physical medicine and rehabilitation","Preventive medicine","Psychiatry","Radiation oncology","Surgery","Urology"]
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ['Doctor','Receptionist','Admin','Pharmaceutical']
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
},
    {timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);