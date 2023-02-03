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
    // console.log(card)

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
      className={(card.status==="Requested" && `${classes.Card1}`)|| (card.status==="Confirmed" && `${classes.Card2}`) || (card.status==="Completed" && `${classes.Card3}`)}
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
          <div className="flex flex-row flex-wrap justify-center">
            <b>Consultation at.:</b>
            <p>&#160;{card.consult}</p>
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            <b>To Doctor.:</b>
            <p>&#160;{card.doctor}</p>
          </div>
        </div>

        <StyledAction>
        {card.status!=="Completed" && (<Button
            onClick={()=>{navigate('/receptionist/appointments/allotappointments',{state:{data:card}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Allot Appointment
          </Button>)}
          <Button
          onClick={()=>{navigate('/receptionist/appointments/payment/1',{state:{data:card}})}}
            overrides={{
              BaseButton: { style: { width: "100%", marginBottom: "1%" } },
            }}
          >
            Payment
          </Button>
        {card.arriveStatus==="Pending" && (<Button
          isLoading={load}
          onClick={async (e)=>{
            setLoad(true)
            try{
              const res=await axios.get(`${path}receptionist/sendtodoctor/${card.aid}`)
            if(res.status===200){
              navigate('/receptionist/appointments')
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
            Send to Doctor
          </Button>)}
        </StyledAction>
      </Card>
      </div>
      </>
  )
}
