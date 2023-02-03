import React, {useEffect, useState} from 'react'
import Crums from '../../../../UI/Crums';
import classed from '../../../../UI/Crums.module.css';
import classes from './TodaysAppointments.module.css'
import { Input } from "baseui/input";
import Patients from './Patients';
import axios from 'axios';

export default function TodaysAppointments() {

    // const data=[
    //       {name:"Rohan",consult:"2022-11-25",pid:"1221",status:"Ready",},
    //       {name:"Sujan",consult:"2022-11-25",pid:"1222",status:"Scan",},
    //       {name:"Arun",consult:"2022-11-25",pid:"1223",status:"Pending",},
    //     ]

    let crum = ['Home','Appointments','Todays Appointments'];
     const [finder, setFinder] = useState('');
      var rows = [];
      const user=JSON.parse(localStorage.getItem('user'))


      const path=process.env.REACT_APP_PATH;
      var data2=[]
      const [data,setData]=useState([])

    useEffect(()=>{
      const fetchData= async()=>{
        const res=await axios.get(`${path}doctor/todaysappointments/${user._id}`)
        // console.log(res.data)
        res.data.forEach((i)=>{
          data2.push({   
            name:i.Patient?.name+"",
            consult:i.appointmentDate ? i.appointmentDate.split('T')[0] : "//",
            aid:i._id,
            doctor:i.Doctor ? i.Doctor.name : "--",
            patient:i.Patient,
            requestedDept:i.desiredDepartment+"",
            purpose:i.purposeOfVisit+"",
            status:i.arriveStatus+"",
            arriveStatus:i.arriveStatus+""
          })
        setData(data2)
        })
      }
      fetchData()
    })


      if(finder !== undefined){
        data.forEach((i) => { 
          if(i.name.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || i.status.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || i.consult.includes(finder)){
            rows.push(i);
          }
        })
      }

  return (
    <>
    <div className={`${classed.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
    <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Todays Appointments</h1>
    <div className='flex flex-wrap gap-x-2 gap-y-2 mb-3 ml-[8%]'>
      <div className='flex'><p className='w-[2rem] bg-green-500'>&nbsp;</p>&nbsp;- Waiting for Doctor</div>
      <div className='flex'><p className='w-[2rem] bg-yellow-400'>&nbsp;</p>&nbsp;- Sent for Tests/Scans</div>
      <div className='flex'><p className='w-[2rem] bg-red-500'>&nbsp;</p>&nbsp;- Not Arrived</div>
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
        })
      }
    }}
  />
  {data.length===0 && (<div className=' flex justify-center mt-4'><b>No Appointments</b></div>)}
    <div className={`${classes.wrapper}`}>
        {rows.map((card,index)=>(
          <Patients card={card} key={index}/>   
          ))}
     </div>
     </>
  )
}
