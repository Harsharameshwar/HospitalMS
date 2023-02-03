import React from "react";
import Header from "../UI/Header";
import SideNav1 from "../Components/Pharma/Sidebar/SideNav1";
// import Footer from "../UI/Footer";
import classes from "./Admin.module.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import DashboardPharma from "../Components/Pharma/DashboardPharma";
import FindPatient from "../Components/Pharma/Medication/FindPatient";
import Payment from "../Components/Pharma/Medication/Payment/Payment";
import PaymentTowards from "../Components/Pharma/Medication/Payment/PaymentTowards";
import PrinterFile from "../Components/Pharma/Medication/Payment/PrinterFile";
import PayHistory from "../Components/Pharma/PayHistory/PayHistory";

export default function Pharma() {

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
            <Route path="/" element={<DashboardPharma/>} />
            <Route path="/medication" element={<FindPatient/>} />
            <Route path="/appointments/payment" element={<Navigate to="/pharma/medication/payment/1" />} />
            <Route path="/medication/payment/1" element={<Payment/>} />
            <Route path="/medication/payment/2" element={loc.state!==null ? <PaymentTowards/> : <Navigate to="/receptionist/appointments/payment/1" />} />
            <Route path="/medication/payment/print" element={loc.state!==null ? <PrinterFile/> : <Navigate to="/receptionist/appointments/payment/1" />} />
            <Route path="/payhistory" element={<PayHistory/>} />
          </Routes>
        </main>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}