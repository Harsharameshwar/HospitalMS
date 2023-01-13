import React from 'react'
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import MessageCard from '../../../UI/Message_CardDash';


export default function AppointDash() {

    let mods = ['Book Appointment', 'Appointment Status'];
    let crum = ['Home', 'Appointment'];

  return (
    <>
        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <div className='flex flex-wrap justify-around mt-5 mb-5 text-center'>
            { mods.map((mod)=>(<MessageCard mod={mod} key={mod}/>)) }
        </div>
    </>
  )
}
