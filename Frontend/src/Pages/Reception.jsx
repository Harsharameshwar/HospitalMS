import React from "react";
import Header from "../UI/Header";
import SideNav1 from "../Components/Reception/Sidebar/SideNav1";
// import Footer from "../UI/Footer";
import classes from "./Admin.module.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ReceptionDash from "../Components/Reception/ReceptionDash";
import ViewAppointments from "../Components/Reception/Appointments/ViewAppointments";
import AllotAppointment from "../Components/Reception/Appointments/AllotAppointment/AllotAppointment";
import Payment from "../Components/Reception/Appointments/Payment/Payment";
import FindPatient from "../Components/Reception/OfflinePatient/FindPatient";
import CreateAppointment from "../Components/Reception/OfflinePatient/CreateAppointment";
import Billings from "../Components/Reception/Billings/Billings";
import PaymentTowards from "../Components/Reception/Appointments/Payment/PaymentTowards";
import PrinterFile from "../Components/Reception/Appointments/Payment/PrinterFile";


export default function Reception() {

  const loc = useLocation()

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
            <Route path="/" element={<ReceptionDash/>} />
            <Route path="/appointments" element={<ViewAppointments/>} />
            <Route path="/appointments/allotappointments" element={<AllotAppointment/>} />
            <Route path="/appointments/payment" element={<Navigate to="/receptionist/appointments/payment/1" />} />
            <Route path="/appointments/payment/1" element={<Payment/>} />
            <Route path="/appointments/payment/2" element={loc.state!==null ? <PaymentTowards/> : <Navigate to="/receptionist/appointments/payment/1" />} />
            <Route path="/appointments/payment/print" element={loc.state!==null ? <PrinterFile/> : <Navigate to="/receptionist/appointments/payment/1" />} />
            <Route path="/findpatient" element={<FindPatient/>} />
            <Route path="/findpatient/patient" element={<CreateAppointment/>} />
            <Route path="/billings" element={<Billings/>} />
          </Routes>
        </main>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}