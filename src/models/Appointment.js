const mongoose=require('mongoose')
const Schema=require('mongoose').Schema
const Patients = require("../models/Patients");
const User = require("../models/User");
const Bills = require("../models/Bill");


const AppointmentSchema=new mongoose.Schema({
    purposeOfVisit:{
        type:String,
        required:true 
    },
    desiredDepartment:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
        enum:["Requested","Confirmed","Cancelled","Completed","Paid"],
    },
    arriveStatus:{
        type:String,
        enum:["Scan","Ready","Pending","Visited"],
    },
    appointmentStartTime:{
        type:String,//or date
    },
    appointmentEndTime:{
        type:String,//or date
    },
    appointmentDate:{
        type:Date,
    },
    generalCheckupInfo:{
        type:String
    },
    observation:{
        type:String
    },
    TestsName:{
        type:String
    },
    ReportDescription:{
        type:String
    },
    ReportContent:{
        type:Schema.Types.Mixed
    },
    findings:{
        type:String
    },
    finalFindings:{
        type:String
    },
    emergencyMedications:{
        type:Array
    },
    medications:{
        type:Array
    },
    typeoffood:{
        type:String
    },
    cancelReason:{
        type:String
    },
    cancelledDate:{
        type:Date
    },
    Doctor: {type: mongoose.Schema.Types.ObjectId, ref: User},
    Patient: {type: mongoose.Schema.Types.ObjectId, ref: Patients},
    Payment:{type: mongoose.Schema.Types.ObjectId, ref: Bills},
    Tests:{type: mongoose.Schema.Types.ObjectId, ref: Bills},
    Pharma:{type: mongoose.Schema.Types.ObjectId, ref: Bills}
},
{timestamps:true})

module.exports=mongoose.model("Appointments",AppointmentSchema)
