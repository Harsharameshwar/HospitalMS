import React, { useState } from 'react'
import classes from '../../UI/Crums.module.css';
import Crums from '../../UI/Crums';
import MessageCard from '../../UI/Message_CardDash';
import { useEffect } from 'react';
import axios from 'axios';


export default function DashboardDctr() {
  let mods = ['Todays Patient Count', 'Appointments', 'Checkup History'];
    let crum = ['Home', 'Dashboard'];
    const path=process.env.REACT_APP_PATH;
    const user=JSON.parse(localStorage.getItem('user'))
    // document.title="Dctr | Dashboard"
    const [len,setLength]=useState(0)

    useEffect(()=>{
      async function fetch(){
        try{
          const res=await axios.get(`${path}doctor/todaysappointments/count/${user._id}`)
          console.log(res.data)
          setLength(res.data.length)
        }
        catch(err){
          console.log(err)

        }
      }
      fetch()
    })
  return (
    <>
        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <div className='flex flex-wrap justify-around mt-5 mb-5 text-center'>
            { mods.map((mod)=>(<MessageCard mod={mod} key={mod} count={len} />)) }
        </div>
    </>
  )
}
