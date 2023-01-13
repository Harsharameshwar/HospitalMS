import React, { useState} from "react";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./Pages/Admin";
import Doctor from "./Pages/Doctor";
import Patient from "./Pages/Patient";
import Pharma from "./Pages/Pharma";
import Signup from "./Components/Login/Signup";
import Reception from "./Pages/Reception";
import Landing from "./Components/Login/Landing";



function App() {

  const [role,setRole]=useState(JSON.parse(localStorage.getItem("user"))?.role ? JSON.parse(localStorage.getItem("user"))?.role:"")

  // if(){
  //   const role=JSON.parse(localStorage.getItem("user"))
  //   setRole(role?.role)
  // }
  function CallBack(x){
    setRole(x?.role)
  }

  return (
    <Router>
 
      <Routes>
        <Route path="/login" element={<Login OnLogin={CallBack}/>} />
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/*"
          element={
            role === "Admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/doctor/*"
          element={
            role === "Doctor" ? <Doctor /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/patient/*"
          element={
            role === "Patient" ? <Patient /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/receptionist/*"
          element={
            role === "Receptionist" ? (
              <Reception />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/pharma/*"
          element={
            role === "Pharmaceutical" ? <Pharma /> : <Navigate to="/login" />
          }
        />
      </Routes>
      </Router>
  );
}

export default App;
