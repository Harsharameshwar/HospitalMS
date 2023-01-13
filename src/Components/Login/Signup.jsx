import React from 'react'
import { Input, SIZE } from "baseui/input";
import {Button, SHAPE} from "baseui/button";
// import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { FormControl } from "baseui/form-control";
import {UserPlus} from "react-feather"
import { DatePicker } from "baseui/datepicker";
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

export default function Signup() {

    const navigate = useNavigate()
    
    const [dob, setDob] = React.useState([]);
    // const [address, setAddress] = React.useState("");
    const [name, setName] = React.useState("");
    const [gender, setGender] = React.useState([]);
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password,setPassword]=React.useState('');
    const [cpassword,setCPassword]=React.useState('');
    // const designation='patient'
    const [load, setLoad] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const path=process.env.REACT_APP_PATH;
    const [modal,setModal]=React.useState("");

const [isOpen, setIsOpen] =React.useState(false);



   var genderdrop=[
        { label: "Male", id: "Male" },
        { label: "Female", id: "Female" },
        { label: "Others", id: "Other" },
      ]

    const submitHandle = async(e) =>{
        e.preventDefault();
        try{
        if(dob){
            var date = dob[0].getFullYear() + '-' + (dob[0].getMonth()+1).toString().padStart(2, '0') + '-' + (dob[0].getDate()).toString().padStart(2, '0');
            setLoad(true)
            const newobj={name, email, phone, password,gender:gender[0].label, dob: date}
            const res=await axios.post(`${path}patients`,newobj) 
            if(res.data==='Success'){
                navigate('/login')
            }
            }
        }
            catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
    }
    setLoad(false)
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
    <p className='text-2xl font-medium text-center mb-3 mt-3'>Account Creation</p>
    <div className=' mb-10 pb-10'>
    <form className='mx-auto' autoComplete='off' onSubmit={submitHandle}>
        <div className='flex flex-wrap justify-around w-[75%] mx-auto'>
        <div>
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
        </div>
        <div>
        <FormControl label={() => "Date of birth"}>
            <DatePicker
                value={dob}
                onChange={({ date }) =>
                    setDob(Array.isArray(date) ? date : [date])
                }
            />
        </FormControl>
        <FormControl label={() => "Password:"}>
            <Input
                required
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
                required
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
        </div>
        </div>
       
        
        
        <div className=' ml-[45%]'>
            <Button
                startEnhancer={<UserPlus/>}
                shape={SHAPE.pill}
                isLoading={load}
                >
                Create Account
            </Button>
        </div>
    </form>
    </div>
    </>
  )
}
