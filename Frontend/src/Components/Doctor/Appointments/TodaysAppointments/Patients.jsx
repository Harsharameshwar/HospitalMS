import React, { useState } from 'react'
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { User } from "react-feather";
import classes from './TodaysAppointments.module.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,SIZE
} from "baseui/modal";

export default function Patients({card}) {

  const path=process.env.REACT_APP_PATH;
  const [load,setLoad]=useState(false)
  const [modal,setModal]=React.useState("");
    const navigate=useNavigate()
    const [isOpen, setIsOpen] =React.useState(false);

  return (
    <>
    <Modal
    onClose={() => setIsOpen(false)}
    closeable
    isOpen={isOpen}
    animate
    autoFocus
    size={SIZE.default}
    role={ROLE.dialog}
  >
   <ModalHeader>Notice!</ModalHeader>
    <ModalBody>
    {modal}
    </ModalBody>
    <ModalFooter>
      <ModalButton onClick={() => setIsOpen(false)} >Okay</ModalButton>
    </ModalFooter>
  </Modal>
    <div
      className={(card.arriveStatus==="Pending" && `${classes.Card1}`)|| (card.arriveStatus==="Scan" && `${classes.Card2}`) || (card.arriveStatus==="Ready" && `${classes.Card3}`) }
      style={{ marginTop: "20%", display: "flex",width:"16rem"}}
    >
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
            onClick={()=>{navigate('/doctor/appointments/todaysappointments/viewdetails', {state:{pg:'todaysappointments',patient:card.patient,purpose:card.purpose}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            View Details
          </Button>
          <Button
          onClick={()=>{navigate('/doctor/appointments/todaysappointments/medicalhistory', {state:{pg:'todaysappointments',id:card.patient._id}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Medical History
          </Button>
          {card.arriveStatus==='Ready'  &&(<Button
            onClick={()=>{navigate('/doctor/appointments/todaysappointments/diagnosecure',{ state: { id:card.aid,purpose:card.purpose} })}}//,{ state: { id:card.bid} }
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Diagnose & Cure
          </Button>)}
          {(card.arriveStatus==='Scan') &&(<Button
          isLoading={load}
            onClick={async (e)=>{
            setLoad(true)
            try{
              const res=await axios.get(`${path}receptionist/sendtodoctor/${card.aid}`)
            if(res.status===200){
              navigate('/doctor/appointments/todaysappointments')
              setLoad(false)
            }
            }
            catch(err){
              setLoad(false)
            setModal(err.response.data.message)
            setIsOpen(true)
            }
            }}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Scan Completed
          </Button>)}
        </StyledAction>
      </Card>
    </div>
    </>
  )
}
