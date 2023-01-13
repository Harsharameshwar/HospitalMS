import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Crums from '../../../UI/Crums';
import classed from '../../../UI/Crums.module.css';
import {Input,SIZE} from 'baseui/input';
import { Button,SHAPE } from 'baseui/button';
import { FormControl } from "baseui/form-control";
import { Search } from 'react-feather';
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE
} from "baseui/modal";

export default function FindPatient() {

    let crum = ['Home','Find Patient'];


    const [load,setLoad]=useState(false);
    const [uid,setUid]=useState("");
    const [modal,setModal]=React.useState("");
    const navigate=useNavigate()
    const [isOpen, setIsOpen] =React.useState(false);
    const path=process.env.REACT_APP_PATH;


    async function handleSubmit(e){
        e.preventDefault()
        setLoad(true)
        try{
          const res=await axios.get(`${path}patients/${uid}`) 
          if(res.status===200){
            console.log(res.data)
            navigate('/receptionist/findpatient/patient',{state:{data:res.data}})
          }
      }
      catch(err){
      setLoad(false)
      setModal(err.response.data.message)
      setIsOpen(true)
      
  }
  setUid("")
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
        {/* <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Patient</h1> */}
        <p className="text-2xl font-medium text-center mb-3 mt-3" >Create Patient Appointment</p>
      <div className='flex'>
      <form className='mx-auto mb-5' onSubmit={handleSubmit}>
      <FormControl label={() => "Email ID:"}>
          <Input
              required
              id="uid"
              type='email'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              value={uid}
              autoFocus
              onChange={(e)=>setUid(e.target.value)}
              placeholder='Eg: john@gmail.com'
              autoComplete="off"
              clearable
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: () => ({ borderRadius: "10px", width:'18rem'}),
                },
              }}
            />
        </FormControl>
        <div className='ml-[20%]'>
            <Button 
                startEnhancer={<Search/>}
                size={SIZE.large}
                isLoading={load}
                shape={SHAPE.square}
                // onClick={()=>{navigate('/receptionist/findpatient/patient')}}
                overrides={{
                    BaseButton: {
                    style: ({ $theme }) => ({
                        backgroundColor: $theme.colors.positive400,
                        width: "12em",
                    })
                    }
                    }}
                >
                Get Patient Data
            </Button>
          </div>
      </form>
      </div>
    </>
  )
}
