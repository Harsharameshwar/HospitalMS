import React, { useState } from 'react'
import classes from './Login.module.css'
import {Input,SIZE} from 'baseui/input';
import { FormControl } from "baseui/form-control";
import { Button, SHAPE } from "baseui/button";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';


export default function Login({OnLogin}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [passwd,setPasswd]=useState('');
    const [load, setLoad]=useState(false)
    const [err, setErr] = useState(false)
    const path=process.env.REACT_APP_PATH;

    const handleSubmit =async(e) => {
        setLoad(true)
        var res
        e.preventDefault()
        try{
            res=await axios.post(`${path}auth/login`,{"email":name,"password":passwd}) 
            // console.log(res.data)
            if("role" in res.data){
                OnLogin(res.data)
                localStorage.setItem("user",JSON.stringify(res.data))
                if(res?.data?.role==='Pharmaceutical'){
                    console.log("Login")
                    navigate('/pharma')
                }
                else{
                    const  a=res?.data?.role?.toLocaleLowerCase()
                     navigate(`/${a}`)
                }
            }
            else{
                res.data['role']="Patient"
                OnLogin(res.data)
                localStorage.setItem("user",JSON.stringify(res.data))
                const  a=res?.data?.role?.toLocaleLowerCase()
                 navigate(`/${a}`)
            }
        }
        catch(err){
        setErr(true)
        setLoad(false)
        }   
    }

  return (
    <>
    <div className={`${classes.bg} py-8 h-[100vh] `}>
            <form autoComplete='off' className='w-[25rem] md:w-[50rem] mx-auto my-[5%] rounded-lg h-[25rem]' onSubmit={handleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default pt-[5%]'>LOGIN</p>
                <div className='text-left mx-auto  w-[18rem] mt-3'>
                <FormControl label={() => "Email:"} >
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete='off'
                    size={SIZE.compact}
                    placeholder="Eg. john@gmail.com"
                    clearable
                    error={err}
                    clearOnEscape
                    required
                    overrides={{
                        Root: {
                            style: ({ $theme }) => ({
                                borderRadius: "10px",
                                width: '20rem',
                            })
                        }
                    }}
                />
            </FormControl>
                </div>
                <div className='text-left mx-auto w-[18rem] mt-2'>
                <FormControl label={() => "Password:"}>
                <Input
                    value={passwd}
                    required
                    onChange={e => setPasswd(e.target.value)}
                    size={SIZE.compact}
                    error={err}
                    type="password"
                    autoComplete='off'
                    placeholder='Eg: ********'
                    overrides={{
                        Root: {
                            style: ({ $theme }) => ({
                                outline: `${$theme.colors.primary700} `,
                                borderRadius: '10px',
                                width: '20rem',
                            })
                        }
                    }}
                />
            </FormControl>
            {err && <p className='font-extrabold text-red-600 text-lg text-center italic'>User Name and Password do not match.</p>}
                </div>
                <div className='ml-[45%]'>
                <Button
                isLoading={load}
                    shape={SHAPE.pill}
                    >Login
                </Button>
            </div>
            <div className='text-center mt-[1%]'>
            <p> 
            <Link
                className='bold text-lg'
                    to={`/signup`}
                    >Sign-Up
                </Link>
                </p>
            </div>
            
            <div className=''>
            
            </div>
            </form>
        </div>
    </>
  )
}
