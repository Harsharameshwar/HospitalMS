import React from 'react'
import classes from '../../../../../UI/Crums.module.css';
import Crums from '../../../../../UI/Crums';
import { Select } from "baseui/select";
import { FormControl } from 'baseui/form-control';
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE,SIZE
  } from "baseui/modal";

export default function BookAppointment() {

    let crum = ['Home', 'Appointment','Book Appointment'];
    const navigate =useNavigate()
  


    const [dept, setDept] = React.useState([]);
    const [cause, setCause] = React.useState('');
    const [load, setLoad] = React.useState(false)
    const [deptList,setdeptList]=useState([])
    
    const [modal,setModal]=React.useState("");

const [isOpen, setIsOpen] =React.useState(false);
    var data2=[]
    const path=process.env.REACT_APP_PATH;
    
    const userid=JSON.parse(localStorage.getItem('user')) 
    // console.log(userid._id) 

    useEffect(()=>{
        async function fetch(){
            const res=await axios.get(`${path}doctor/returnuniquespecializations`)
            res.data.forEach((i)=>{
               data2.push({
                    label:i,
                    id:i
                })
                setdeptList(data2)
              })
        } 
        fetch()
    })


    const HandleSubmit = async (e) =>{
        e.preventDefault()
        var d =''
        setLoad(true)
        if(dept[0] !== undefined){
            d = dept[0]?.label            
        }
        else{
            d ='none'
        }
        try{
            const res=await axios.post(`${path}patients/onlineappointment/${userid._id}`,{desiredDepartment:d,purposeOfVisit:cause}) 
            if(res.data==='Success'){
                    navigate('/patient/appointment')
            }
        }
        catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
    }
    }

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
        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl font-medium text-center mt-5 mb-4'>Book An Appointment</h1>
        <form className='w-[18rem] mx-auto' onSubmit={HandleSubmit}>
                <FormControl label={() => "Department for Consultation"}>
                    <Select
                        options={deptList}
                        value={dept}
                        placeholder="Select Department"
                        onChange={params => setDept(params.value)}
                        overrides={{
                            ControlContainer: {
                                style: ({ $theme }) => ({
                                    borderRadius: '10px',
                                    width: '18rem'
                                })
                            }
                        }}
                    />
                </FormControl>
                <FormControl label={() => "Cause for Consultation"}>
                    <Textarea
                    value={cause}
                    required
                    onChange={e => setCause(e.target.value)}
                    placeholder={`Fever,\nCold,\n...`}
                    clearOnEscape
                    />
                </FormControl>
                <div className='mb-[10%] pb-[10%] flex justify-center'>
                    <Button
                        shape={SHAPE.pill}
                        isLoading={load}
                        >
                        Request For Approval
                    </Button>
                </div>
        </form>
    </>
  )
}
