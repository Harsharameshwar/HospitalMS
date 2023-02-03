const mongoose=require("mongoose");

const HistoryofUsersSchema=new mongoose.Schema({
    action:{
        type:String,
        required:true
    },
    actionType:{
        type:String,
        required:true,
    },
    creator:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
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
    },
    specialization:{
        type:String,
        enum:["Allergy and immunology","Anesthesiology","Dermatology","Diagnostic radiology","Emergency medicine","Family medicine","Internal medicine","Medical genetics","Neurology","Nuclear medicine","Obstetrics and gynecology","Ophthalmology","Pathology","Pediatrics","Physical medicine and rehabilitation","Preventive medicine","Psychiatry","Radiation oncology","Surgery","Urology"]
    },
    role:{
        type:String,
        required:true,
        enum: ['Doctor','Receptionist','Admin','Pharmaceutical']
    },
    phone:{
        type:Number,
        required:true
    }
},
{timestamps:true});


module.exports=mongoose.model("HistoryOfUsers",HistoryofUsersSchema);