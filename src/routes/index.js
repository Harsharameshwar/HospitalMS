const userRoute=require("./users")
const historyRoute=require("./history")
const patientRoute=require("./patient");
const DoctorRoute=require("./Doctor");
const ReceptionistRoute=require("./Receptionist");
const authRoute=require("./auth")

const express = require("express");
const app = express();


app.use("/api/users",userRoute);
app.use("/api/history",historyRoute);
app.use("/api/patients",patientRoute);
app.use("/api/auth",authRoute);
app.use("/api/doctor",DoctorRoute);
app.use("/api/receptionist",ReceptionistRoute);

module.exports=app