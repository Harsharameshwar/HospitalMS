import React, { useEffect } from 'react'
import Crums from '../../../../UI/Crums';
import classed from '../../../../UI/Crums.module.css';
import { Table } from "baseui/table";
import { Select } from "baseui/select";
import { FormControl } from 'baseui/form-control';
// import { DatePicker } from "baseui/datepicker";
import { Button,SHAPE,SIZE } from 'baseui/button';
import { Textarea } from "baseui/textarea";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {StatefulCalendar} from 'baseui/datepicker';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE
  } from "baseui/modal";

export default function AllotAppointment() {

    let crum = ['Home','Appointments', 'Allot Appointments'];
    const {state}=useLocation()
    const data=state?.data
    // console.log(data)

    // eslint-disable-next-line no-unused-vars
    // const [initial, setInitial] = React.useState({name: 'Suraj', dob: '2010-07-21', age: '12', gender: 'Male', phone: '9087564321', mail: 'suraj12@gmail.com', pov: 'Just for funnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', requested: 'Physician'})
    const [dept, setDept] = React.useState([]);
    const [doct, setDoct] = React.useState([]);
    const [date, setDate] = React.useState([new Date()]);
    const [load1,setLoad1]= React.useState(false);
    const [load2,setLoad2]= React.useState(false);
    const [cancelRsn, setCancelRsn] = React.useState("");
   
    const path=process.env.REACT_APP_PATH;
    const [deptList,setdeptList]=useState([])
    const [doctList,setDoctList]=useState([])
    const [modal,setModal]=React.useState("");
    const navigate=useNavigate()
    const [isOpen, setIsOpen] =React.useState(false);
    // console.log(data)


    useEffect(()=>{
        async function fetch(){
            var data2=[]
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
    useEffect(()=>{
        async function fetch(){
            // console.log(deptList)
            if(dept[0]?.label !== undefined && dept !== null ) {
                var data3=[]
            const res=await axios.get(`${path}receptionist/doctorsindepartment/${dept[0].label}`)
            res.data.forEach((i)=>{
               data3.push({
                    label:i.name,
                    id:i._id
                })
                setDoctList(data3)
              })
            }
        } 
        fetch()

    })


    // console.log(doct1)

    // var deptList =[
    //     {label: 'Orthopedic', id: 'Orthopedic'},
    //     {label: 'General Physican', id: 'General Physican'},
    //     {label: 'Gynochologist', id: 'Gynochologist'},
    // ]

    // var doctList =[
    //     {label: 'Rohit', id: 'Rohit'},
    //     {label: 'Jai', id: 'Jai'},
    //     {label: 'Satish', id: 'Satish'},
    // ]

    const HandleSubmit1 = async (e) => {
        e.preventDefault()
        console.log(date)
        if(doct[0] && dept[0] && date){
            setLoad1(true)
            try{
                const res=await axios.put(`${path}receptionist/confirmrequestedappointments/${data.aid}/${doct[0]?.id}`,{dept: dept[0].label, appointmentStartTime: new Date(date).toLocaleTimeString('en-US').toString(),appointmentEndTime: new Date(date.getTime()+(1*60*60*1000)).toLocaleTimeString('en-US').toString(),appointmentDate:date.toLocaleString( 'sv', { timeZoneName: 'short' } ).slice(0, 10)}) 
                // console.log({dept: dept[0].label, appointmentStartTime: new Date(date).toLocaleTimeString('en-US').toString(),appointmentEndTime: new Date(date.getTime()+(1*60*60*1000)).toLocaleTimeString('en-US').toString(),appointmentDate:date.toLocaleString( 'sv', { timeZoneName: 'short' } ).slice(0, 10)})
                // console.log(date.toLocaleString( 'sv', { timeZoneName: 'short' } ).slice(0, 10))
                if(res.data==='Success'){
                        navigate(-1)
                }
            }
            catch(err){
            setLoad1(false)
            setModal(err.response.data.message)
            setIsOpen(true)
        }
            setLoad1(false)
            
        }
        setLoad1(false)
    }
    const HandleSubmit2= async () =>{
            setLoad2(true)
            try{
                const res=await axios.post(`${path}patients/cancelappointment/${data.aid}`,{cancelReason:cancelRsn}) 
                if(res.data==='Success'){
                        navigate(-1)
                }
            }
            catch(err){
            setLoad2(false)
            setModal(err.response.data.message)
            setIsOpen(true)
        }
            console.log()
            setLoad2(false)
        
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
        <div className={`${classed.crum} mt-3 pt-1`} >
          <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Allot Appointment</h1>
        <div className='mx-auto my-auto w-[80%]'>
            <Table
            data={[
                [
                "Name",
                <p className='break-all font-bold'>{data.patient.name}</p>
                ],
                [
                    "Date Of Birth",
                    <p className='break-all font-bold'>{data.patient.dob.split('T')[0]}</p>
                ],
                [
                "Age",
                <p className='break-all font-bold'>{data.patient.age}</p>
                ],
                [
                    "Gender",
                    <p className='break-all font-bold'>{data.patient.gender}</p>
                ],
                [
                    "Phone No",
                    <p className='break-all font-bold'>{data.patient.phone}</p>
                ],
                [
                    "Mail ID",
                    <p className='break-all font-bold'>{data.patient.email}</p>
                ],
                [
                    "Purpose Of Consultation",
                    <p className='break-all font-bold'>{data.purpose}</p>
                ],
                [
                    "Requested Department",
                    <p className='break-all font-bold'>{data.requestedDept}</p>
                ],
            ]}
            />
        </div>
        <form className=' mt-2 pt-2' onSubmit={HandleSubmit1}>
            <div className='flex flex-wrap justify-around'>
                <div className='w-[18rem]'>
                    <FormControl label={() => "Department for Consultation"}>
                            <Select
                                options={deptList}
                                value={dept}
                                required
                                placeholder="Select Department"
                                onChange={params => {setDept(params.value) ;setDoct([])}}
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
                </div>
                <div className='w-[18rem]'>
                    <FormControl label={() => "Doctor for Consultation"}>
                            <Select
                                options={doctList}
                                value={doct}
                                required
                                placeholder="Select Doctor"
                                onChange={params => setDoct(params.value)}
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
                </div>
                </div>
                <div className=' flex flex-wrap justify-center'>
                <div className='w-[18rem] ' >
                    <FormControl label={() => "Date & Time of Consultation"}>
                    <StatefulCalendar
                        onChange={({date}) => setDate(date)}
                        timeSelectStart

                        required
                        minDate={new Date()}
                    />
                        {/* <DatePicker
                            value={date}
                            onChange={({ date }) =>
                                setDate(Array.isArray(date) ? date : [date])
                            }
                            timeSelectStart
                            required
                            minDate={new Date()}
                        /> */}
                    </FormControl>
                </div>
                </div>
            
            <div className='flex justify-center'>
                <Button 
                    size={SIZE.large}
                    isLoading={load1}
                    shape={SHAPE.square}
                    //navigate('/admin/usersetup/edituser/user')
                    overrides={{
                        BaseButton: {
                        style: ({ $theme }) => ({
                            backgroundColor: $theme.colors.positive400,
                            width: "12em",
                        })
                        }
                        }}
                    >
                    Confirm Appointment
                </Button>
            </div>
        </form>
        <form className='w-[18rem] mx-auto flex flex-col items-center mt-8 mb-5 pb-5' onSubmit={HandleSubmit2}>
            <FormControl label={() => "Cancel Appointment"}>
                <Textarea
                    value={cancelRsn}
                    onChange={e => setCancelRsn(e.target.value)}
                    placeholder={`Doctor not available`}
                    clearOnEscape
                    required
                />
            </FormControl>
            <Button 
                // startEnhancer={<UserMinus size={30}/>}
                size={SIZE.large}
                isLoading={load2}
                shape={SHAPE.square}
                overrides={{
                    BaseButton: {
                    style: ({ $theme }) => ({
                        backgroundColor: $theme.colors.negative400,
                        width: "10em",
                    })
                    }
                    }}
                >
                Cancel Appointment
            </Button>
        </form>
    </>
  )
}