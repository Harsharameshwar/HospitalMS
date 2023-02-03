import React from 'react'
import Crums from '../../../UI/Crums';
import classed from '../../../UI/Crums.module.css';
import classes from './ViewAppointments.module.css'
import { Input } from "baseui/input";
import Patients from './Patients';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function ViewAppointments() {
    // const data=[
    //     {name:"Rakshith",consult:"2022-05-10",pid:"1221",doctor: 'Nithin'},
    //     {name:"Rohan",consult:"2022-05-10",pid:"1222",doctor: 'Arun'},
    //     {name:"Rahul",consult:"2022-05-12",pid:"1223",doctor: 'Arun'},
    //     {name:"Roopesh",consult:"//",pid:"1224",doctor: '--'},
    //   ]


      const path=process.env.REACT_APP_PATH;
      var data2=[]
      const [data,setData]=useState([])

  let crum = ['Home','Appointments'];
   const [finder, setFinder] = React.useState('');
    var rows = [];

    useEffect(()=>{
      const fetchData= async()=>{
        const res=await axios.get(`${path}receptionist/getappointments`)
        // console.log(res.data)
        res.data.forEach((i)=>{
          // console.log(i.Patient)
          data2.push({   
            name:i.Patient?.name+"",
            consult:i.appointmentDate ? i.appointmentDate.split('T')[0] : "//",
            aid:i._id,
            doctor:i.Doctor ? i.Doctor.name : "--",
            patient:i.Patient,
            requestedDept:i.desiredDepartment+"",
            purpose:i.purposeOfVisit+"",
            status:i.appointmentStatus+"",
            arriveStatus:i.arriveStatus+"",
            appointmentStatus:i.appointmentStatus+""
          })
        setData(data2)
        })
      }
      fetchData()
    })

      // console.log(data)

    if(finder !== undefined){
      data.forEach((i) => { 
        if(i.name.toLocaleLowerCase().includes(finder.toLocaleLowerCase())||i.status.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || i.consult.includes(finder) || i.doctor.toLocaleLowerCase().includes(finder.toLocaleLowerCase())){
          rows.push(i);
        }
      })
    }

return (
  <>
    <div className={`${classed.crum} mt-3 pt-1`} >
          <Crums crum={crum}/>
    </div>
  <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Appointments</h1>
  <div className='flex flex-wrap gap-x-2 gap-y-2 mb-3 ml-[8%]'>
      <div className='flex'><p className='w-[2rem] bg-green-500'>&nbsp;</p>&nbsp;- Completed</div>
      <div className='flex'><p className='w-[2rem] bg-yellow-400'>&nbsp;</p>&nbsp;- Confirmed</div>
      <div className='flex'><p className='w-[2rem] bg-red-500'>&nbsp;</p>&nbsp;- Requested</div>
    </div>
  <Input
  value={finder}
  onChange={e => setFinder(e.target.value)}
  placeholder="Search"
  clearOnEscape
  clearable
  overrides={{
    Root: {
      style: ({ $theme }) => ({
        outline: `${$theme.colors.primary700} `,
        borderRadius: '20px',
        width: '49.445%',
        marginLeft: '5%',   
        marginBottom: '5%',       
      })
    }
  }}
/>
{data.length===0 && (<div className=' flex justify-center'><b>No Appointments</b></div>)}

  <div className={`${classes.wrapper}`}>
      {rows.map((card,i)=>(
        <Patients card={card} key={i}/>   
        ))}
   </div>
   </>
  )
}
