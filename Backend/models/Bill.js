const mongoose=require('mongoose')
const Schema=require('mongoose').Schema
const BillSchema=new mongoose.Schema({
    billItems:{
        type:Array,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:["Card","Cash","Online"],
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    totalAmount:{
        type:String,
        required:true
    }
},
{timestamps:true})

module.exports=mongoose.model("Bills",BillSchema)