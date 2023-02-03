const router = require("express").Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Bills = require("../models/Bill");
const Patients = require("../models/Patients");

// All Appointments Except Cancelled
router.get("/getappointments",async(req,res)=>{
    try{
        Appointment.find({'appointmentStatus':{$nin: ['Paid', 'Cancelled']}}).populate("Patient").populate("Doctor").exec((err,apps)=>{
            if(err){
                res.status(500).json(err)
            }
            var listapps=[]
            const today = new Date(new Date().setHours(0,0,0,0));
            function toupdate(id){
                Appointment.findByIdAndUpdate(id,{appointmentStatus:"Cancelled",cancelReason:"Did Not Report On The Booked Date, Hence Automatically Removed",cancelledDate:new Date()}, {new: true}, function(err,upapp){
                    if(err){
                        res.status(500).json(err)
                    }
                    console.log("upapp is",upapp)
                })
            }
            var cnt=0
            apps?.forEach((i)=>{
                
                if(i.appointmentStatus==="Confirmed"){
                    if(i.appointmentDate<today){
                        console.log(cnt++)
                        console.log("App date is ",i.appointmentDate)
                        console.log("today is ",today)
                        console.log(i.appointmentDate<today)
                        toupdate(i._id)
                        return
                    }
                }
                const { password, ...others } = i.Patient._doc;
                i.Patient=others
                if(i.Doctor){
                    const { password, ...others } = i.Doctor._doc;
                    i.Doctor=others
                }
                listapps.push(i)
            })
            res.status(200).json(listapps)
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Cancelled Appointments
router.get("/getcancelledappointments",async(req,res)=>{
    try{
        Appointment.find({"appointmentStatus":"Cancelled"}).populate('Doctor').populate('Patient').exec((err,apps)=>{
            if(err){
                res.status(500).json(err)
            }
            var listapps=[]
            apps.forEach((i)=>{
                const{password,...others}=i.Patient._doc
                i.Patient=others
                if(i.Doctor){
                    const{password,...others}=i.Doctor._doc
                    i.Doctor=others
                }
                listapps.push(i)
            })
            res.status(200).json(listapps)
        })
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Confirming The Requested Appointments
router.put("/confirmrequestedappointments/:appointmentid/:doctorid",async(req,res)=>{
    const doc=await User.findById(req.params.doctorid);
    // console.log(req.body)
    try{
        const appointment=await Appointment.findById(req.params.appointmentid);
        if(appointment.appointmentStatus!=="Requested" && appointment.appointmentStatus!=="Confirmed"){
            res.status(401).json({message:"Given Appointment Is Not Requested... Please Check The Appointment ID"});
        }
        else{
            // console.log(doc)
            if(doc.role!=="Doctor"){
                res.status(401).json({message:"Doctor Is Not Being Referred... Please Check The Doctor ID"});
            }
            else{
                if(req.body.desiredDepartment==='none'){
                    res.status(401).json("Desired Department Cannot be Null")
                }
                Appointment.findByIdAndUpdate(req.params.appointmentid,{arriveStatus:"Pending",desiredDepartment:req.body.dept,appointmentStartTime:req.body.appointmentStartTime,appointmentEndTime:req.body.appointmentEndTime,appointmentStatus:"Confirmed",Doctor:doc._id,appointmentDate:req.body.appointmentDate},{new:true}).exec((err,app)=>{
                    if(err){
                        res.status(401).json(err);
                    }
                    console.log(app)
                    res.status(200).json("Success");
                });
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//Send To Doctor
router.get("/sendtodoctor/:appointmentid",async(req,res)=>{
    try{
        const a=await Appointment.findById(req.params.appointmentid)
        if(a.arriveStatus==="Ready"){
            res.status(401).json("The Specified Patient's Arrive Status Has Already Been Changed To Ready");
        }
        else{
            Appointment.findByIdAndUpdate(req.params.appointmentid,{arriveStatus:"Ready"},{new:true},function(err,app){
                if(err){
                    res.status(500).json(err)
                }
                // const{password,...others}=app.Patient._doc
                // app.Patient=others
                // if(app.Doctor){
                //     const{password,...others}=app.Doctor._doc
                //     app.Doctor=others
                // }
                res.status(200).json("Success");
            })
            // .populate('Doctor').populate('Patient')
        }
    }
    catch{
        res.status(500).json(err)
    }
})

//Doctors In Particular Department
router.get("/doctorsindepartment/:specialization",async(req,res)=>{
    try{
        res.status(200).json(await User.find({specialization:req.params.specialization}));
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Payment
router.put("/payment/:appointmentid",async(req,res)=>{
    try{
        const bill=new Bills({
            billItems:req.body.billItems,
            from:req.body.from,
            to:req.body.to,
            paymentMethod:req.body.paymentMethod,
            totalAmount:req.body.totalAmount
        })
        const biller=await bill.save()
        Appointment.findByIdAndUpdate(req.params.appointmentid,{ appointmentStatus:"Paid",Payment:biller},{new:true},function(err,a){
            if (err) { res.status(401).json(err);}
            res.status(200).json(a);
        }).populate('Payment')
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Tests Bill
router.put("/testbill/:appointmentid",async(req,res)=>{
    try{
        const bill=new Bills({
            billItems:req.body.billItems,
            from:req.body.from,
            to:req.body.to,
            paymentMethod:req.body.paymentMethod,
            totalAmount:req.body.totalAmount
        })
        const biller=await bill.save()
        Appointment.findByIdAndUpdate(req.params.appointmentid,{ Tests:biller},{new:true},function(err,a){
            if (err) { res.status(401).json(err);}
            res.status(200).json(a);
        }).populate('Tests')
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Pharma Bill
router.put("/pharmabill/:patientid",async(req,res)=>{
    try{
        const bill=new Bills({
            billItems:req.body.billItems,
            from:req.body.from,
            to:req.body.to,
            paymentMethod:req.body.paymentMethod,
            totalAmount:req.body.totalAmount
        })
        const biller=await bill.save();
        Appointment.find({Patient:req.params.patientid,$or:[{'appointmentStatus': 'Completed'}, {'appointmentStatus': 'Paid'}]}).sort({appointmentDate: 'descending'}).exec((err, docs) => {
            if (err) return res.status(401).json(err);
            console.log(docs[0]._id)
            Appointment.findByIdAndUpdate(docs[0]._id,{ Pharma:biller},{new:true},function(err,a){
                if (err) return res.status(401).json(err);
                res.status(200).json("Success");
            })
        });
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router