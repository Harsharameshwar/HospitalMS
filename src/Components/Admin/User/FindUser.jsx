import React,{useState} from 'react'
import {Input,SIZE} from 'baseui/input';
import { Button,SHAPE } from 'baseui/button';
import { FormControl } from "baseui/form-control";
import {Edit} from "react-feather"
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE
} from "baseui/modal";
import axios from 'axios';

export default function FindUser() {

    const [load,setLoad]=useState(false);
    const [email,setEmail]=useState("");

    let crum = ['Home', 'User Setup', 'Edit User'];
    const navigate=useNavigate();
    const [modal,setModal]=React.useState("");
const [isOpen, setIsOpen] =React.useState(false);
const path=process.env.REACT_APP_PATH;


    async function handleSubmit(e){
      // navigate('/admin/usersetup/edituser/user',{state:{data:"sdhj"}})

        e.preventDefault()
        setLoad(true)
        try{
          var res;
          setLoad(true)
          res = await axios.get(`${path}users/${email}`)
          // console.log(res.data)
          if(res.status===200){
             navigate('/admin/usersetup/edituser/user',{state:{data:res.data}})
            setLoad(false)
          }
      }
      catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
      }       
      setEmail("")
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
      <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
      </div>
      <p className="text-2xl font-medium text-center mb-3 mt-3" >Update User Details</p>
      <div className='flex'>
      <form className='mx-auto mb-5' onSubmit={handleSubmit}>
      <FormControl label={() => "Email:"}>
          <Input
              required
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder='Eg:john@gmail.com'
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
                startEnhancer={<Edit/>}
                size={SIZE.large}
                isLoading={load}
                shape={SHAPE.square}
                // onClick={()=>{navigate('/admin/usersetup/edituser/user')}}
                overrides={{
                    BaseButton: {
                    style: ({ $theme }) => ({
                        backgroundColor: $theme.colors.positive400,
                        width: "10em",
                    })
                    }
                    }}
                >
                Edit User
            </Button>
          </div>
      </form>
      </div>
    </>
  )
}
