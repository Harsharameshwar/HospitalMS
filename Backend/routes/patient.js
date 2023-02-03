const router = require("express").Router();
const bcrypt = require("bcrypt");
const Appointment = require("../models/Appointment");
const Patients = require("../models/Patients");
const Users = require("../models/User");


//Patient Registration
router.post("/",async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    try{
        const a=new Date(req.body.dob)
        var month_diff = Date.now() - a.getTime();
        var age_dt = new Date(month_diff);  
        var year = age_dt.getUTCFullYear();
        var ages = Math.abs(year - 1970);
        const npat= new Patients({
            name:req.body.name,
            dob:req.body.dob,
            age:ages,
            email:req.body.email,
            password:hashedPass,
            gender:req.body.gender,
            phone:req.body.phone
        })
        const result=await npat.save();
        res.status(200).json("Success");
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get patient Details

router.get("/:email", async (req, res) => {
  try {
    const user = await Patients.findOne({email:req.params.email});
    if(user===null){
       res.status(400).json({message:"Patient Not Found"});
    }
    else{
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Patient Edit Details
router.put("/:id", async (req, res) => {
      try {
        console.log(req.body)
        if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        if(req.body.dob!==null){
          const a=new Date(req.body.dob)
          var month_diff = Date.now() - a.getTime();
          var age_dt = new Date(month_diff);  
          var year = age_dt.getUTCFullYear();
          var ages = Math.abs(year - 1970);
          req.body['ages']=ages
        }
        Patients.findByIdAndUpdate(req.params.id,req.body,{ new: true }).exec((err,pat)=>{
          if(err){
            res.status(400).json(err)
          }
          const {password,...others}=pat._doc
          res.status(200).json(others);
        });
      } catch (err) {
        console.log(err)
        if(err.message){
          res.status(500).json(err)
        }
        else if(err.keyValue.email){
          res.status(500).json({message:`Email ${err.keyValue.email} already exists`})
        }
        else if(err.keyValue.phone){
          res.status(500).json({message:`Phone ${err.keyValue.phone} already exists`})
        }
      }
});

//Offline Appointment Booking
router.post("/appointment/:patientid/:doctorid",async(req,res)=>{
    try{
        var patient=await Patients.findById(req.params.patientid)
        var doc=await Users.findById(req.params.doctorid)
        if(doc.designation!=="Doctor"){
            res.status(401).json("Doctor Is Not Being Referred... Please Check The Doctor ID");
        }
        if(doc.specialization!==req.body.desiredDepartment){
            res.status(401).json("Doctor Does Not Belong To The Requested Department");
        }
        const appoint=new Appointment({
            purposeOfVisit:req.body.purposeOfVisit,
            desiredDepartment:req.body.desiredDepartment,
            appointmentStatus:"Confirmed",
            arriveStatus:"Pending",
            appointmentStartTime:req.body.appointmentStartTime,
            appointmentEndTime:req.body.appointmentEndTime,
            appointmentDate:req.body.appointmentDate,
            Patient:patient,
            Doctor:doc
        })
        appntmnt=await appoint.save();
        Appointment.findById(appntmnt._id).populate('Doctor').populate('Patient').exec(function(err, app) {
            if (err) return handleError(err);
            res.status(200).json(app.Doctor);
          });
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Online Appointments
router.post("/onlineappointment/:patientid",async(req,res)=>{
  console.log(req.params.patientid)
    try{
       var patient=await Patients.findById(req.params.patientid)
       console.log(patient)
        const appoint=new Appointment({
            purposeOfVisit:req.body.purposeOfVisit,
            desiredDepartment:req.body.desiredDepartment,
            appointmentStatus:"Requested",
            Patient:patient
        })
        // console.log(appoint)
        appntmnt=await appoint.save();
        res.status(200).json("Success");
     }
    catch(err){
        res.status(500).json(err)
     }
})

//Cancel Appointment
router.post("/cancelappointment/:appointmentid",async(req,res)=>{
    try{
        const appntmnt=await Appointment.findById(req.params.appointmentid);
        if(appntmnt.appointmentStatus==="Completed" || appntmnt.appointmentStatus==="Paid" || appntmnt.appointmentStatus==="Cancelled"){
            res.status(401).json("Given Appointment Cannot Be Cancelled As It Is Completed Or Already Has Been Cancelled");
        }
        else{
            const app={...appntmnt._doc,appointmentStatus:"Cancelled",cancelReason:req.body.cancelReason,cancelledDate:new Date()}
            const {_id,__v, createdAt,updatedAt,...others}=app;
            const a=await Appointment.findByIdAndUpdate(req.params.appointmentid,{ $set:others},{new:true})
            res.status(200).json("Success");
        }
    }
    catch{
        res.status(500).json(err);
    }
})



//Patient's Appointments
router.get("/paitentappointments/:patientid",async(req,res)=>{
    try{
        Appointment.find({Patient:req.params.patientid}).populate('Doctor').populate('Patient').exec(function(err, app) {
            if (err) return handleError(err);
            res.status(200).json(app);
          })
      }
      catch(err){
        res.status(500).json(err);
      }
})


//Get Patient Details
router.get("/getdetails/:id", async (req, res) => {
  try {
    const user = await Patients.findById(req.params.id);
    if(user===null){
       res.status(400).json({message:"Patient Not Found"});
    }
    else{
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;