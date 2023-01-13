import React from 'react'
import AppointmentStatus from './AppointmentStatus'
import classes from '../../../../../UI/Crums.module.css';
import Crums from '../../../../../UI/Crums';
import axios from 'axios';
import { useEffect } from 'react';

export default function DisplayAppoint() {

    const path=process.env.REACT_APP_PATH;
    const user=JSON.parse(localStorage.getItem("user"))
    const data2=[]
    const [data,setData]=React.useState([])

    useEffect(()=>{
      const fetchData=async ()=>{
        const res=await axios.get(`${path}patients/paitentappointments/${user._id}`)
        // console.log(res.data)
        res.data.forEach((i)=>{
        data2.push({
          id:i._id+"",
          cause:i.purposeOfVisit+"",
          name:i.Patient?.name+"",
          dept:i.desiredDepartment+"",
          status:i.appointmentStatus+"",
          doctorName:i.Doctor? i.Doctor.name+"" : "Not Applicable",
          dateTime: i.Doctor ? new Date(i.createdAt).toString().split("GMT")[0]: "Not Applicable",
        })
        data2.reverse()
        setData(data2)
      })
      }
      fetchData()
    })

//     var initial = [{
//         cause: 'Broken Bone',
//         name: 'Ram',
//         dept: 'Orthopedic',
//         status: 'Requested',
//         doctorName: '',
//         dateTime: ''
//     },
//     {
//         cause: 'Orthotist',
//         name: 'Rahul S',
//         dept: 'Orthopedic',
//         status: 'Confirmed',
//         doctorName: 'Sahil',
//         dateTime: '2022-12-11T10:15:00.00'
//     },
//     {
//         cause: 'General Checkup',
//         name: 'Rahul',
//         dept: 'Eye Specilist',
//         status: 'Completed',
//         doctorName: 'Pavan',
//         dateTime: '2022-12-11T10:15:00.00'
//     },
//     {
//         cause: 'Head Ache',
//         name: 'Ram',
//         dept: 'General Physican',
//         status: 'Paid',
//         doctorName: 'Pavan',
//         dateTime: '2022-12-11T10:15:00.00'
//     },
// ]

// console.log(data)
let crum = ['Home','Appointment', 'Appointment Status'];

  return (
    <>
        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl font-medium text-center mb-3 mt-3'>Appointment Status</h1>
         {data.length===0 && <p className='h3' style={{textAlign:"center"}}>No Appointments</p>}
        <ul className='mb-10 pb-10'>
            {
                data.map((i, index) => <li> <AppointmentStatus key={index} init ={ i } /> </li>)
            }
        </ul>
    </>
  )
}
