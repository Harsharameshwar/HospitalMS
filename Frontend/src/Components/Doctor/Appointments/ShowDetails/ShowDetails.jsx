import React, { useState } from 'react'
import { Table } from "baseui/table";
import classes from '../../../../UI/Crums.module.css';
import Crums from '../../../../UI/Crums';
import { useLocation } from 'react-router-dom';

export default function ShowDetails() {

    const {state} = useLocation();
    const {pg,patient,purpose} = state


    // eslint-disable-next-line no-unused-vars
    const [initial, setInitial] = useState({name: 'Suraj', age: '30', gender: 'Male', phone: '9087564321', mail: 'suraj601@gmail.com', pov: "I'm losing of too much weight without reason and I feel thirsty very often"})

    // setInitial({name: 'Suraj', age: '69', gender: 'Male', phone: '9087564321', mail: 'suraj69@gaymail.com', pov: 'Just for fun'})
    let crum = ['Home','Appointments',`${pg}`, 'View Details'];
  return (
    <>
        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl font-medium text-center mb-3 mt-3'>Patent Details</h1>
        <div className='mx-auto my-auto w-[80%]'>
            <Table
            data={[
                [
                "Name",
                <p className='break-all font-bold'>{patient.name}</p>
                ],
                [
                "Age",
                <p className='break-all font-bold'>{patient.age}</p>
                ],
                [
                    "Gender",
                    <p className='break-all font-bold'>{patient.gender}</p>
                ],
                [
                    "Phone No",
                    <p className='break-all font-bold'>{patient.phone}</p>
                ],
                [
                    "Mail ID",
                    <p className='break-all font-bold'>{patient.email}</p>
                ],
                [
                    "Purpose Of Consultation",
                    <p className='break-all font-bold'>{purpose}</p>
                ],
            ]}
            />
        </div>
    </>
  )
}
