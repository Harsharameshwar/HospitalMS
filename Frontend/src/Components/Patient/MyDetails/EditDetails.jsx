import React from 'react'
import { Input, SIZE } from "baseui/input";
import {Button, SHAPE} from "baseui/button";
// import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { FormControl } from "baseui/form-control";
import {UserCheck} from "react-feather"
import { DatePicker } from "baseui/datepicker";
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE
  } from "baseui/modal";

export default function EditDetails() {

    const navigate = useNavigate()
    const {state}=useLocation()
    console.log(state?.data)
    
    const [dob, setDob] = React.useState([new Date(state?.data?.dob)]);
    // const [address, setAddress] = React.useState("");
    const [name, setName] = React.useState(state?.data?.name);
    const [gender, setGender] = React.useState([{id:state?.data?.gender}]);
    const [phone, setPhone] = React.useState(state?.data?.phone);
    const [email, setEmail] = React.useState(state?.data?.email);
    const [password,setPassword]=React.useState("");
    const [cpassword,setCPassword]=React.useState("");
    // const designation='patient'
    const [load, setLoad] = React.useState(false)
    const [err, setErr] = React.useState(false)

    let crum = ['Home', 'My Details', 'Edit Details'];

    var genderdrop=[
        { label: "Male", id: "Male" },
        { label: "Female", id: "Female" },
        { label: "Others", id: "Other" },
      ]
      const path=process.env.REACT_APP_PATH;
const [isOpen, setIsOpen] =React.useState(false);
const [modal,setModal]=React.useState("");

    

    const submitHandle = async(e) =>{
        e.preventDefault();
        if(dob){
            var date = dob[0].getFullYear() + '-' + (dob[0].getMonth()+1).toString().padStart(2, '0') + '-' + (dob[0].getDate()).toString().padStart(2, '0');
        }
        try{
            setLoad(true)
            if(password===''){
                const obj={name, email, phone, gender:gender[0].label, dob: date}
            const res=await axios.put(`${path}patients/${state?.data?._id}`,obj)
            if(res.status===200){
                    navigate(-1)
            }
            setLoad(false)
            }
            else{
                const obj={name, email, phone, password, gender:gender[0].label, dob: date}
                const res=await axios.put(`${path}patients/${state?.data?._id}`,obj)
                if(res.status===200){
                        navigate(-1)
                }
                setLoad(false)
            }
        }
        catch(err){
            setLoad(false)
            setModal(err.response.data.message)
            setIsOpen(true)
        }
           
    }

    const passHandle = () =>{
        if(!(cpassword === password)){
            setErr(true)
        }
        if(cpassword === password){
            setErr(false)
        }
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
    <p className='text-2xl font-medium text-center mb-3 mt-3'>Edit Account Details</p>
    <div className='flex mb-10 pb-10'>
    <form className='mx-auto' autoComplete='off' onSubmit={submitHandle}>
        <FormControl label={() => "Name:"}>
            <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    size={SIZE.compact}
                    placeholder="Eg. John Michle"
                    pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                    clearable
                    autoFocus
                    clearOnEscape
                    required
                    overrides={{
                        Root: {
                        style: ({ $theme }) => ({
                            borderRadius: "10px",
                            width: '18rem'
                        })
                        }
                    }}
                />
        </FormControl>
        <FormControl label={() => "Phone Number:"}>
            <Input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    size={SIZE.compact}
                    type='tel'
                    placeholder="Eg. 7482017974"
                    pattern="^[6-9]\d{9}$"
                    clearable
                    clearOnEscape
                    required
                    overrides={{
                        Root: {
                        style: ({ $theme }) => ({
                            borderRadius: "10px",
                            width: '18rem'
                        })
                        }
                    }}
                />
        </FormControl>
        <FormControl label={() => "Email ID:"}>
            <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                size={SIZE.compact}
                placeholder="Eg. name@gamil.com"
                type="email"
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                clearable
                clearOnEscape
                required
                overrides={{
                    Root: {
                    style: ({ $theme }) => ({
                        borderRadius: "10px",
                        width: '18rem'
                    })
                    }
                }}
            />
        </FormControl>

        {/* <FormControl label={() => "Address:"}>
            <Textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={`F-17, Jangpura Extn, Delhi 110014, India`}
                clearOnEscape
                required
            />
        </FormControl> */}

        <FormControl label={() => "Gender"}>
            <Select
                options={genderdrop}
                required 
                value={gender}
                placeholder="Select Gender"
                onChange={params => setGender(params.value)}
                overrides={{
                    ControlContainer: {
                        style: ({ $theme }) => ({
                            borderRadius: '10px',
                            width: '18rem'
                        })
                    }
                }}
            />
        </FormControl>
        <FormControl label={() => "Date of birth"}>
            <DatePicker
                value={dob}
                onChange={({ date }) =>
                    setDob(Array.isArray(date) ? date : [date])
                }
                maxDate={new Date()}
            />
        </FormControl>
        <FormControl label={() => "Password:"}>
            <Input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type='password'
                id='password'
                error={err}
                placeholder='*********'
                // startEnhancer={<Key/>}
                clearable
                size={SIZE.compact}
                overrides={{
                Root: {
                style: () => ({
                    borderRadius:'10px',
                    width: '18rem'
                })
                }
            }}
      />
        </FormControl>
        <FormControl label={() => "Confirm Password:"}>
        <Input
                value={cpassword}
                error={err}
                onChange={(e)=>{setCPassword(e.target.value);}}
                onKeyUp={passHandle}
                type='password'
                id='password'
                placeholder='*********'
                // startEnhancer={<Key/>} 
                clearable
                size={SIZE.compact}
                overrides={{
                Root: {
                style: () => ({
                    borderRadius:'10px',
                    width: '18rem',
                })
                }
            }}
        />
        </FormControl>
        {err && <p className='text-red-600'>Password does not match. Retry!</p>}
        
        
        <div className='ml-[30%]'>
            <Button
                startEnhancer={<UserCheck/>}
                shape={SHAPE.pill}
                isLoading={load}
                >
                Confirm
            </Button>
        </div>
    </form>
    </div>
    </>
  )
}
