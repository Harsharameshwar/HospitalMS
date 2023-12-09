const router = require("express").Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");


//GET DOCTOR
router.get("/getdoctor", async (req, res) => {
    try {
      const user = await User.find({designation:'Doctor'});
      var doctors=[];
      user.forEach((e)=>{
        const {password,...others}=e._doc;
        doctors.push(others)
      })
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//GET Today's Appointments
router.get("/todaysappointments/:doctorid",async(req,res)=>{
    try{
      var todaysappointments=[]
      const a=await User.findById(req.params.doctorid);
      if(a.role!=="Doctor"){
        res.status(401).json("Doctor Is Not Being Referred... Please Check The Doctor ID");
      }
      else{
        const appntmnts=await Appointment.find({Doctor:req.params.doctorid,'appointmentStatus': 'Confirmed'}).populate('Patient')
          const todaydate=new Date().toString().split('T')[0]
          appntmnts.forEach((a)=>{
            // console.log(todaydate,a.appointmentDate.toString().split('T')[0])
              if(todaydate===a.appointmentDate.toString().split('T')[0]){
                todaysappointments.push(a);
              }
          })
          res.status(200).json(todaysappointments);
      }
    }catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  })
  
//GET Future Appointments  
router.get("/futureappointments/:doctorid",async(req,res)=>{
    try{
      var todaysappointments=[]
      const a=await User.findById(req.params.doctorid);
      if(a.role!=="Doctor"){
        res.status(401).json("Doctor Is Not Being Referred... Please Check The Doctor ID");
      }
      else{
        const appntmnts=await Appointment.find({Doctor:req.params.doctorid,'appointmentStatus': 'Confirmed'}).populate('Patient')
          const todaydate=new Date().toString().split('T')[0]
          appntmnts.forEach((a)=>{
              if(todaydate!==a.appointmentDate.toString().split('T')[0]){
                if(a.appointmentDate.getTime()>(new Date()).getTime()){
                  todaysappointments.push(a);
                }
              }
          })
          res.status(200).json(todaysappointments);
      }
    }catch(err){
      res.status(500).json(err);
    }
  })

//Send For Scan
router.put('/sendforscan/:appointmentid',async (req,res)=>{
  console.log(req.params.appointmentid)
  try{
    const appoint=await Appointment.findById(req.params.appointmentid)
    if(appoint.arriveStatus!=="Ready"){
      res.status(401).json("The Specified Appointment/Patient Has Not Arrived Yet");
    }
    else{
      const nobj={...req.body,arriveStatus:"Scan"}
      // console.log(nobj)
      const updatedApp= await Appointment.findByIdAndUpdate(req.params.appointmentid,{$set:nobj},{new:true});
      res.status(200).json(updatedApp);
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Diagnose And Cure
router.get('/getappointmentdetails/:appointmentid',async(req,res)=>{
  try{
    const appoint= await Appointment.findById(req.params.appointmentid)
    if(appoint.arriveStatus!=="Ready"){
      res.status(401).json({message:"The Specified Appointment/Patient Has Not Arrived Yet"});
    }
    else{
      res.status(200).json(appoint)
    }
  }
  catch(err){
    res.status.json(500);
  }
})

//Exit Patient
router.put('/exitpatient/:appointmentid',async (req,res)=>{
  try{
    const a= await Appointment.findById(req.params.appointmentid)
    if(a.arriveStatus!=="Ready"){
      res.status(401).json({message:"The Specified Appointment/Patient Has Not Arrived Yet"});
    }
    else{
      req.body.medications.forEach((e)=>{
        delete e.del
      })
      req.body.emergencyMedications.forEach((e)=>{
        delete e.del
      })
      const nobj ={...req.body,appointmentStatus:"Completed"}
      const updatedApp= await Appointment.findByIdAndUpdate(req.params.appointmentid,{$set:nobj},{new:true});
      res.status(200).json(updatedApp)
    }
  }
  catch(err){
    res.status(500).json(err);
  }
})

//Book Appointment
router.get("/returnuniquespecializations",async(req,res)=>{
    try{
      const docs=await User.find({designation:"Doctor"})
      const specializations=[]
      docs.forEach((a)=>{
        specializations.push(a.specialization)
      })
      let outputArray = specializations.filter(function(v, i, self)
      {
          return i == self.indexOf(v);
      });
      res.status(200).json(outputArray);
    }
    catch(err){
      res.status(500).json(err);
    }
})

//Today's Patient Count
router.get("/todaysappointments/count/:doctorid",async(req,res)=>{
    try{
      var todaysappointments=[]
      const a=await User.findById(req.params.doctorid);
     
      if(a.role!=="Doctor"){
        res.status(401).json("Doctor Is Not Being Referred... Please Check The Doctor ID");
      }
      else{
        const appntmnts=await Appointment.find({Doctor:req.params.doctorid,'appointmentStatus': 'Confirmed'}).populate('Patient')
          const todaydate=new Date().toString().split('T')[0]
          appntmnts.forEach((a)=>{
              
              if(todaydate===a.appointmentDate.toString().split('T')[0]){
                todaysappointments.push(a);
              }
          })
          var len
          todaysappointments ? (len=todaysappointments.length):(len=0)
          // console.log(len)
          res.status(200).json({length:len});
      }
    }catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  })

module.exports = router;