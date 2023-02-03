import React from 'react'
import { FormControl } from 'baseui/form-control';
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import { Button, SHAPE } from "baseui/button";
import { Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function MyDetails() {

    const navigate = useNavigate()
    const details=JSON.parse(localStorage.getItem("user"))
    const [user,setUser]=useState({})
    const path=process.env.REACT_APP_PATH;
    useEffect(()=>{
        async function fetch(){
            const res=await axios.get(`${path}patients/getdetails/${details._id}`)
            setUser(res.data)
        }
        fetch()
    })
    var initial = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        // addr: user.address,
        gender: user.gender,
        dob: new Date(user.dob).toDateString()
    }
    const [load, setLoad] = React.useState(false)

    const HandleEdit = () =>{
        setLoad(true)
        console.log('Canel')
        navigate('/patient/mydetails/editdetails',{state:{data:user}})
        setLoad(false)
    }

    let crum = ['Home', 'My Details'];

  return (
    <>
    <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
    </div>
    <p className='text-2xl font-medium text-center mb-5 mt-3'>Account Details</p>
    <div className='flex flex-wrap mb-5 pb-5'>
    <div className='mx-auto'>
        <FormControl label={() => "Name:"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.name}</p>
        </div>
        </FormControl>
        <FormControl label={() => "Phone Number:"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.phone}</p>
        </div>
        </FormControl>
    </div>
    <div className='mx-auto'>
        <FormControl label={() => "Email ID:"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.email}</p>
        </div>
        </FormControl>
        <FormControl label={() => "Date of birth"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.dob}</p>
        </div>
        </FormControl>
    
        {/* <FormControl label={() => "Address:"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.addr}</p>
        </div>
        </FormControl> */}
    </div>
    <div className='mx-auto'>
        <FormControl label={() => "Gender"}>
        <div className='w-[18rem]'>
            <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.gender}</p>
        </div>
        </FormControl>
    

    </div>
    </div>
    <div className='mb-[5%] pb-[5%] flex justify-center'>
        <Button
            shape={SHAPE.pill}
            isLoading={load}
            onClick={HandleEdit}
            startEnhancer = {<Edit/>}
            title='Edit Password'
            >
            Edit Details
        </Button>
    </div>
    </>
  )
}
