const mongoose=require('mongoose')
const Schema=require('mongoose').Schema

const PatientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female','Others']
    },
    phone:{
        type:Number,
        required:true,
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
    // appointments:[{ type: Schema.Types.ObjectId, ref: Appointment }]
},
{timestamps:true});


module.exports=mongoose.model("Patients",PatientSchema)