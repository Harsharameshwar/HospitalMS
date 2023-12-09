const router = require("express").Router();
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");
const HistoryOfUsers = require("../models/HistoryOfUsers");
const Patients = require("../models/Patients");
const User = require("../models/User");

//User History
router.get("/users",async(req,res)=>{
    try{
      res.status(200).json(await HistoryOfUsers.find())
    }
    catch(err){
      res.status(500).json(err);
    }
  })

//Doctor's Checkup History
router.get("/doctor/appointment/:doctorid",async(req,res)=>{
  try{
    const a=await User.findById(req.params.doctorid);
    if(a.role!=="Doctor"){
      res.status(401).json("Doctor Is Not Being Referred... Please Check The Doctor ID");
    }
    else{
      res.status(200).json(await Appointment.find({Doctor:req.params.doctorid,$or:[{'appointmentStatus': 'Completed'}, {'appointmentStatus': 'Paid'}]}).populate('Patient').populate('Doctor'))
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Payment History
router.get("/payment/:patientid",async(req,res)=>{
try{
      Appointment.find({Patient:req.params.patientid,'appointmentStatus': 'Paid'}).populate("Payment").populate("Tests").populate("Pharma").exec((err, apps)=>{
        if(err) res.status(401).json(err)
          var lstbills=[]
          apps.forEach((i)=>{
            if(i.Tests)
              lstbills.push(i.Tests)
            if(i.Payment)
              lstbills.push(i.Payment)
            if(i.Pharma)
              lstbills.push(i.Pharma)
          })
        res.status(200).json(lstbills)
    })
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Patient's Medical History
router.get("/patient/appointmenthistory/:patientid",async(req,res)=>{
  try{
      res.status(200).json(await Appointment.find({Patient:req.params.patientid,$or:[{'appointmentStatus': 'Completed'}, {'appointmentStatus': 'Paid'}]}));
  }
  catch(err){
    res.status(500).json(err);
  }
})


//Patient's Ordering Medical History
router.get("/patient/particularmedicalhistory/:patientid/:index",async(req,res)=>{
  try{
    Appointment.find({Patient:req.params.patientid,$or:[{'appointmentStatus': 'Completed'}, {'appointmentStatus': 'Paid'}]}).sort({appointmentDate: 'descending'}).populate('Doctor').populate('Patient').exec((err, docs) => {
      if (err) {res.status(401).json(err);}
      if(docs.length<=req.params.index || req.params.index<0){
        res.status(401).json({message:"Not Possible"});
      } 
      else{
        res.status(200).json({docs:docs[req.params.index],length:docs.length});
      }
    });
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Payment History
router.get("/pharma/payment",async(req,res)=>{
  try{
      Appointment.find({'appointmentStatus': 'Paid'}).populate("Pharma").exec((err, apps)=>{
        if(err) res.status(401).json(err)
          var lstbills=[]
          apps.forEach((i)=>{
            if(i.Pharma)
              lstbills.push(i.Pharma)
          })
        res.status(200).json(lstbills)
    })
  }
  catch(err){
    res.status(500).json(err);
  }
})


//All Payment History
router.get("/paymenthistory",async(req,res)=>{
try{
      Appointment.find({'appointmentStatus': 'Paid'}).populate("Payment").populate("Tests").populate("Pharma").exec((err, apps)=>{
        if(err) res.status(401).json(err)
          var lstbills=[]
          apps.forEach((i)=>{
            if(i.Tests)
              lstbills.push(i.Tests)
            if(i.Payment)
              lstbills.push(i.Payment)
            if(i.Pharma)
              lstbills.push(i.Pharma)
          })
        res.status(200).json(lstbills)
    })
  }
  catch(err){
    res.status(500).json(err);
  }
})

  module.exports=router