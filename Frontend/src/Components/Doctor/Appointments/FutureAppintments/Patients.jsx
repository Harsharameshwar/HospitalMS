import React from 'react'
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { User } from "react-feather";
// import classes from './TodaysAppointments.module.css'
import { useNavigate } from "react-router-dom";

export default function Patients({card}) {

    const navigate=useNavigate()
    // console.log(card)

  return (
    // <div
    //   className={(card.status==="pending" && `${classes.Card1}`)|| (card.status==="scan" && `${classes.Card2}`) || (card.status==="ready" && `${classes.Card3}`) }
    //   style={{ marginTop: "20%", display: "flex",width:"16rem"}}
    // >
      <Card style={{ textAlign: "center",width:"16rem" }}>
        <div className="container ">
          <div className="flex flex-row justify-center">
            <User size={45} />
          </div>
          <div className="flex flex-row justify-center">
            <b>Name.:</b>
            <p>&#160;{card.name}</p>
          </div>
          <div className="flex flex-row flex-wrap">
            <b>Consultation at.:</b>
            <p>&#160;{card.consult}</p>
          </div>
        </div>

        <StyledAction>
        <Button
            onClick={()=>{navigate('/doctor/appointments/futureappointments/viewdetails', {state:{pg:'futureappointments',patient:card.patient,purpose:card.purpose}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            View Details
          </Button>
          <Button
          onClick={()=>{navigate('/doctor/appointments/futureappointments/medicalhistory', {state:{pg:'futureappointments',id:card.patient._id}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Medical History
          </Button>
          {/* {card.waiting &&(<Button
            onClick={()=>{navigate('/doctor/appointments/todaysappointments/diagnosecure')}}//,{ state: { id:card.bid} }
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Diagnose & Cure
          </Button>)} */}
        {/* </div> +2*/}
        </StyledAction>
      </Card>
  )
}
