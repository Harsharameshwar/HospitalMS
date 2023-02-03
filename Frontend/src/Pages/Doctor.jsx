import React from "react";
import Header from "../UI/Header";
import SideNav1 from "../Components/Doctor/Sidebar/SideNav1";
// import Footer from "../UI/Footer";
import classes from "./Admin.module.css";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import DashboardDctr from "../Components/Doctor/DashboardDctr";
import AppointDash from "../Components/Doctor/Appointments/AppointDash";
import TodaysAppointments from "../Components/Doctor/Appointments/TodaysAppointments/TodaysAppointments";
import ShowDetails from "../Components/Doctor/Appointments/ShowDetails/ShowDetails";
import CheckupHistory from "../Components/Doctor/CheckUpHistory/CheckupHistory";
import DiagnoseCure from "../Components/Doctor/Appointments/DiagnoseCure/DiagnoseCure";
import FutureAppointments from "../Components/Doctor/Appointments/FutureAppintments/FutureAppointments";
import MedicalHistory from "../Components/Doctor/Appointments/MedicalHistory/MedicalHistory";



export default function Doctor() {
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
          <Route path="/" element={<DashboardDctr/>} />
          <Route path="/appointments" element={<AppointDash/>} />
          <Route path="/appointments/todaysappointments" element={<TodaysAppointments/>} />
          <Route path="/todaysappointments" element={<Navigate to="/doctor/appointments/todaysappointments" />} />
          <Route path="/appointments/todaysappointments/viewdetails" element={<ShowDetails/>} />
          <Route path="/appointments/todaysappointments/diagnosecure" element={<DiagnoseCure/>} />
          <Route path="/checkuphistory" element={<CheckupHistory/>} />
          <Route path="/appointments/futureappointments" element={<FutureAppointments/>} />
          <Route path="/futureappointments" element={<Navigate to="/doctor/appointments/futureappointments" />} />
          <Route path="/appointments/futureappointments/viewdetails" element={<ShowDetails/>} />
          <Route path="/appointments/todaysappointments/medicalhistory" element={<MedicalHistory/>} />
          <Route path="/appointments/futureappointments/medicalhistory" element={<MedicalHistory/>} />
        </Routes>
        

        </main>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}