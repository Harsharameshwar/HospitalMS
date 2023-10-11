const express=require("express")
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const userRoute=require("./routes/users")
const historyRoute=require("./routes/history")
const patientRoute=require("./routes/patient");
const DoctorRoute=require("./routes/Doctor");
const ReceptionistRoute=require("./routes/Receptionist");
const authRoute=require("./routes/auth")
const cors = require('cors');
const fs = require('fs')
const https = require('https')



const app=express()
dotenv.config();
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true, parameterLimit: 50000}));
app.use(cors({ origin: '*',method: ['GET','POST','PUT','DELETE'] }));

// https
//   .createServer(
//     {
//       key: fs.readFileSync('C:/Certbot/archive/mydesk.tk/key.pem'),
//       cert: fs.readFileSync('C:/Certbot/archive/mydesk.tk/cert1.pem'),
//       ca: fs.readFileSync('C:/Certbot/archive/mydesk.tk/chain1.pem'),
//     },
//     app
//   )
//   .listen(443, () => {
//     console.log('Listening...')
//   })

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(console.log("Connected to mongoDB"))
.catch((err)=>{console.log(err)})

app.use("/api/users",userRoute);
app.use("/api/history",historyRoute);
app.use("/api/patients",patientRoute);
app.use("/api/auth",authRoute);
app.use("/api/doctor",DoctorRoute);
app.use("/api/receptionist",ReceptionistRoute);

app.listen(process.env.PORT,(req,res)=>{
  console.log('Server is up and running');
})
