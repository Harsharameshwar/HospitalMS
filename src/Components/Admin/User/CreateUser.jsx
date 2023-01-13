import React from 'react'
import { Input, SIZE } from "baseui/input";
import {Button, SHAPE} from "baseui/button";
import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { FormControl } from "baseui/form-control";
import {UserPlus} from "react-feather"
import classes from '../../../UI/Crums.module.css';
import Crums from '../../../UI/Crums';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE
} from "baseui/modal";

export default function CreateUser() {

    const [address, setAddress] = React.useState("");
    const [name, setName] = React.useState("");
    const [gender, setGender] = React.useState([]);
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password,setPassword]=React.useState('');
    const [cpassword,setCPassword]=React.useState('');
    const [role, setRole] = React.useState([]);//{label: state?.pass?.roomType, id: state?.pass?.roomType}
    // const [designation, setDesignation] = React.useState([]);
    const [qualification, setQualification] = React.useState('');
    const [specialization, setSpecialization] = React.useState([]);
    const [load, setLoad] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const path=process.env.REACT_APP_PATH;


    let crum = ['Home', 'User Setup', 'Create User'];
    const navigate=useNavigate();

    const [modal,setModal]=React.useState("");

const [isOpen, setIsOpen] =React.useState(false);
    var genderdrop=[
        { label: "Male", id: "Male" },
        { label: "Female", id: "Female" },
        { label: "Others", id: "Other" },
      ]

    var roletype =[
        {label: 'Doctor', id: 'Doctor'},
        {label: 'Receptionist', id: 'Receptionist'},
        // {label: 'Admin', id: 'Admin'},
        // {label: 'Pharmaceutical', id: 'Pharmaceutical'},
    ]
    var desig =[
        {label: 'Anesthesiology', id: 'Anesthesiology'},
        {label: 'Allergy and immunology', id: 'Allergy and immunology'},
        {label: 'Dermatology', id: 'Dermatology'},
        {label: 'Diagnostic radiology', id: 'Diagnostic radiology'},
        {label: 'Emergency medicine', id: 'Emergency medicine'},
        {label: 'Family medicine', id: 'Family medicine'},
        {label: 'Internal medicine', id: 'Internal medicine'},
        {label: 'Medical genetics', id: 'Medical genetics'},
        {label: 'Neurology', id: 'Neurology'},
        {label: 'Nuclear medicine', id: 'Nuclear medicine'},
        {label: 'Obstetrics and gynecology', id: 'Obstetrics and gynecology'},
        {label: 'Ophthalmology', id: 'Ophthalmology'},
        {label: 'Pathology', id: 'Pathology'},
        {label: 'Pediatrics', id: 'Pediatrics'},
        {label: 'Physical medicine and rehabilitation', id: 'Physical medicine and rehabilitation'},
        {label: 'Preventive medicine', id: 'Preventive medicine'},
        {label: 'Psychiatry', id: 'Psychiatry'},
        {label: 'Radiation oncology', id: 'Radiation oncology'},
        {label: 'Surgery', id: 'Surgery'},
        {label: 'Urology', id: 'Urology'},        
    ]
    const user=JSON.parse(localStorage.getItem("user"))

    const submitHandle = async(e) =>{
        e.preventDefault();
        var res;
        setLoad(true)
        async function Submit1(){
            try{
            const newobj={ creator:user?.name,name, email, qualification,phone, password, role:role[0].label, gender:gender[0].label, address }
            const res=await axios.post(`${path}users`,newobj) 
            if(res.data==='Success'){
                    navigate(-1)
            }
            }
            catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
    }
            
        }
        async function Submit2(){
            try{
            const newobj={creator:user?.name,name, email, qualification, specialization:specialization[0].label, phone, password, role:role[0].label, gender:gender[0].label, address}
             res=await axios.post(`${path}users`,newobj) 
            if(res.data==='Success'){
                    navigate(-1)
            }
        }
        catch(err){
        setLoad(false)
        setModal(err.response.data.message)
        setIsOpen(true)
    }

        }
        if(role[0].label==='Receptionist' || role[0].label==='Admin' || role[0].label==='Pharmaceutical'){
            Submit1()
        }
        if(role[0].label==='Doctor'){
            Submit2()
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
    <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
    </div>
    <p className='text-2xl font-medium text-center mb-3 mt-3'>Setup User</p>
    <div className='mb-10 pb-10'>
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
        <FormControl label={() => "Role:"}>
            <Select
                size={SIZE.compact}
                options={roletype}
                value={role}
                required
                placeholder="Select Role Type"
                onChange={params => setRole(params.value)}
                overrides={{
                    Root: {
                      style: ({ $theme }) => ({
                        width: '18rem',
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

        <FormControl label={() => "Address:"}>
            <Textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={`F-17, Jangpura Extn, Delhi 110014, India`}
                clearOnEscape
                required
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
        </div>
        <div>

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
        <FormControl label={() => "Qualification:"}>
            <Input
                    value={qualification}
                    onChange={e => setQualification(e.target.value)}
                    size={SIZE.compact}
                    placeholder="Eg. Cardiology ( MD )"
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
        {/* <FormControl label={() => "Specialization:"}>
            <Input
                    value={specialization}
                    disabled={designation[0]?.label==='Receptionist' ? true : false}
                    onChange={e => setSpecialization(e.target.value)}
                    size={SIZE.compact}
                    placeholder="Eg. Cardiologists"
                    clearable
                    clearOnEscape
                    overrides={{
                        Root: {
                        style: ({ $theme }) => ({
                            borderRadius: "10px",
                            width: '18rem'
                        })
                        }
                    }}
                />
        </FormControl> */}
        <FormControl label={() => "Specilization"}>
            <Select
                size={SIZE.compact}
                disabled={role[0]?.label==='Doctor' ? false : true}
                options={desig}
                value={specialization}
                required
                placeholder="Select Specialization"
                onChange={params => setSpecialization(params.value)}
                overrides={{
                    Root: {
                      style: ({ $theme }) => ({
                        width: '18rem',
                      })
                    }                    
                  }}
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
        <div className='ml-[45%]'>
            <Button
                startEnhancer={<UserPlus/>}
                shape={SHAPE.pill}
                isLoading={load}
                >
                Create User
            </Button>
        </div>
    </form>
    </div>
    </>
  )
}
