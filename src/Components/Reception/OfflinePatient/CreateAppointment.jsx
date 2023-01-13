import React from 'react'
import Crums from '../../../UI/Crums';
import classed from '../../../UI/Crums.module.css';
import { FormControl } from 'baseui/form-control';
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
import { Table } from "baseui/table";
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE,SIZE
  } from "baseui/modal";
import axios from 'axios';

export default function CreateAppointment() {

    let crum = ['Home','Find Patient', 'Patient'];

    const [cause, setCause] = React.useState('');
    const [load, setLoad] = React.useState(false)
    const {state} = useLocation();
    const [modal,setModal]=React.useState("");
    const navigate=useNavigate()
    const [isOpen, setIsOpen] =React.useState(false);
    const path=process.env.REACT_APP_PATH;



    // console.log(state?.data)

    // eslint-disable-next-line no-unused-vars
    // const [initial, setInitial] = React.useState({name: 'Suraj', dob: '2010-07-21', age: '12', gender: 'Male', phone: '9087564321', mail: 'suraj12@gmail.com'})

    const HandleSubmit = async (e) =>{
        e.preventDefault()
        var d ='none'
        try{
            const res=await axios.post(`${path}patients/onlineappointment/${state?.data?._id}`,{desiredDepartment:d,purposeOfVisit:cause}) 
            if(res.data==='Success'){
                    navigate('/receptionist/appointments')
            }
        }
        catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
    }
        // console.log({d, cause})
        setLoad(false)
        // navigate('/patient/appointment/')
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
        <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Create Patient Appointment</h1>
        <div className='mx-auto my-auto w-[80%]'>
            <Table
            data={[
                [
                "Name",
                <p className='break-all font-bold'>{state?.data?.name}</p>
                ],
                [
                    "Date Of Birth",
                    <p className='break-all font-bold'>{state?.data?.dob.split('T')[0]}</p>
                ],
                [
                "Age",
                <p className='break-all font-bold'>{state?.data?.age}</p>
                ],
                [
                    "Gender",
                    <p className='break-all font-bold'>{state?.data?.gender}</p>
                ],
                [
                    "Phone No",
                    <p className='break-all font-bold'>{state?.data?.phone}</p>
                ],
                [
                    "Mail ID",
                    <p className='break-all font-bold'>{state?.data?.email}</p>
                ],
            ]}
            />
        </div>
        <form className='w-[18rem] mx-auto' onSubmit={HandleSubmit}>
                <FormControl label={() => "Cause for Consultation"}>
                    <Textarea
                    value={cause}
                    required
                    onChange={e => setCause(e.target.value)}
                    placeholder={`Fever,\nCold,\n...`}
                    clearOnEscape
                    />
                </FormControl>
                <div className='mb-[10%] pb-[10%] flex justify-center'>
                    <Button
                        shape={SHAPE.pill}
                        isLoading={load}
                        >
                        Request For Approval
                    </Button>
                </div>
        </form>
    </>
  )
}
