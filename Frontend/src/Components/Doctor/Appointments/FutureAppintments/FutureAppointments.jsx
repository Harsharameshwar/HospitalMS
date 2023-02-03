import React, {useEffect, useState} from 'react'
import Crums from '../../../../UI/Crums';
import classed from '../../../../UI/Crums.module.css';
import classes from './FutureAppointments.module.css'
import { Input } from "baseui/input";
import Patients from './Patients';
import axios from 'axios';

export default function FutureAppointments() {

    // const data=[
    //       {name:"Akshar",consult:"2022-05-10",pid:"2221",},
    //       {name:"Aakash",consult:"2022-05-10",pid:"2222",},
    //       {name:"Pranav",consult:"2022-05-12",pid:"2223",},
    //     ]

    let crum = ['Home','Appointments','Future Appointments'];
     const [finder, setFinder] = useState('');
      var rows = [];

      const path=process.env.REACT_APP_PATH;
      var data2=[]
      const [data,setData]=useState([])
      const user=JSON.parse(localStorage.getItem('user'))


      useEffect(()=>{
      const fetchData= async()=>{
        const res=await axios.get(`${path}doctor/futureappointments/${user._id}`)
        // console.log(res.data)
        res.data.forEach((i)=>{
          data2.push({   
            name:i.Patient?.name+"",
            consult:i.appointmentDate ? i.appointmentDate.split('T')[0] : "//",
            aid:i._id,
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
          if(i.name.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || i.consult.includes(finder)){
            rows.push(i);
          }
        })
      }

  return (
    <>
    <div className={`${classed.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
    <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Future Appointments</h1>
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
  {data.length===0 && (<div className=' flex justify-center mt-4'><b>No Appointments</b></div>)}
    <div className={`${classes.wrapper}`}>
        {rows.map((card,index)=>(
          <Patients card={card} key={index}/>   
          ))}
     </div>
     </>
  )
}
