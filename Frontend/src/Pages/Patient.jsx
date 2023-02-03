import React from "react";
import Header from "../UI/Header";
import SideNav1 from "../Components/Patient/Sidebar/SideNav1";
// import Footer from "../UI/Footer";
import classes from "./Admin.module.css";
import {
  Routes,
  Route,
//   Navigate
} from "react-router-dom";
import DashboardPatient from "../Components/Patient/DashboardPatient";
import MyDetails from "../Components/Patient/MyDetails/MyDetails";
import AppointDash from "../Components/Patient/AppointmentPatient/AppointDash";
import HistoryDash from "../Components/Patient/History/HistoryDash";
import BookAppointment from "../Components/Patient/AppointmentPatient/BookAppiontment/BookAppointment/BookAppointment";
// import AppointmentStatus from "../Components/Patient/AppointmentPatient/BookAppiontment/AppointmentStatus/AppointmentStatus";
import MedicalHistoryPatient from "../Components/Patient/History/MedicalHistory/MedicalHistoryPatient";
import PaymentHistoryPatient from "../Components/Patient/History/PaymentHistory/PaymentHistoryPatient";
import EditDetails from "../Components/Patient/MyDetails/EditDetails";
import DisplayAppoint from "../Components/Patient/AppointmentPatient/BookAppiontment/AppointmentStatus/DisplayAppoint";



export default function Patient() {
  return (
    <div>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <SideNav1 />
        </nav>
        <header className={classes.header}>
          <Header />
        </header>
        <main className={classes.main}>
        <Routes>
          <Route path="/" element={<DashboardPatient/>} />
          <Route path="/mydetails" element={<MyDetails/>} />
          <Route path="/mydetails/editdetails" element={<EditDetails/>} />
          <Route path="/appointment" element={<AppointDash/>} />
          <Route path="/appointment/bookappointment" element={<BookAppointment/>} />
          <Route path="/appointment/appointmentstatus" element={<DisplayAppoint/>} />
          <Route path="/myhistory" element={<HistoryDash/>} />
          <Route path="/myhistory/medicalhistory" element={<MedicalHistoryPatient/>} />
          <Route path="/myhistory/paymentshistory" element={<PaymentHistoryPatient/>} />
        </Routes>
        

        </main>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}