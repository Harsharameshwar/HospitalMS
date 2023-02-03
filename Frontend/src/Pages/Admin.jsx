import React from "react";
import HistoryDashboard from "../Components/Admin/History/HistoryDashboard";
import PaymentHistory from "../Components/Admin/History/PaymentHistory";
import UserHistory from "../Components/Admin/History/UserHistory";
import Header from "../UI/Header";
import SideNav1 from "../Components/Admin/Sidebar/SideNav1";
// import Footer from "../UI/Footer";
import classes from "./Admin.module.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Dashboard from "../Components/Admin/Dashboard";

import FindUser from "../Components/Admin/User/FindUser";
import UpdateUser from "../Components/Admin/User/UpdateUser";
import CreateUser from "../Components/Admin/User/CreateUser";
import DeleteUser from "../Components/Admin/User/DeleteUser";
import UserSetup from "../Components/Admin/User/UserSetup";


export default function Admin() {
  const data = useLocation()

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
            <Route path="/" element={<Dashboard/>} />
            <Route path="/usersetup" element={<UserSetup/>} />
            <Route path="/history" element={<HistoryDashboard/>} />
            <Route path="/history/paymenthistory" element={<PaymentHistory/>} />
            <Route path="/history/usersetuphistory" element={<UserHistory/>} />
            <Route path="/edituser" element={<Navigate to="/admin/usersetup/edituser" />} />
            <Route path="/usersetup/createuser" element={<CreateUser/>} />
            <Route path="/usersetup/edituser" element={<FindUser/>} />
            <Route path="/usersetup/deleteuser" element={<DeleteUser/>} />
            <Route path="/usersetup/edituser/user" element={data.state!==null ?<UpdateUser/>: <Navigate to="/admin/usersetup/edituser" />} />
          </Routes>
        </main>
      </div>
      {/* <div className={classes.footer}>
        <Footer />
      </div> */}
    </div>
  );
}