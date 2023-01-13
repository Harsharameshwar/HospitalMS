import React from 'react'
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import MessageCard from '../../../UI/Message_CardDash';

export default function HistoryDash() {

    let mods = ['Medical History', 'Payments History'];
    let crum = ['Home', 'My History'];

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
