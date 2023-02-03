import React from 'react'
import Crums from '../../../../UI/Crums';
import classed from '../../../../UI/Crums.module.css';
import { useLocation, useNavigate } from 'react-router-dom'
import {Input,SIZE} from 'baseui/input'
import {FormControl} from 'baseui/form-control'
import { useState, } from 'react'
import { Select } from 'baseui/select'
import { Button, SHAPE } from 'baseui/button'
import axios from 'axios';

export default function PaymentTowards() {

  const loc = useLocation()
  const pays = loc.state.data
  const id = loc.state.id

  console.log(id)

  const navigate = useNavigate()

  let crum = ['Home','Medication', 'Payment-2'];

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [paymentType, setpaymentType] = React.useState([]);
  const [load, setLoad] = useState('')

  var PayList =[
    {label: 'Cash', id: 'Cash'},
    {label: 'Online', id: 'Online'},
    {label: 'UPI', id: 'UPI'},
    {label: 'Card', id: 'Card'},
]
const path=process.env.REACT_APP_PATH;


  var total = 0
  pays.forEach(element => {
    let x = Number(element.cost)
    total = total + x
  });

  const HandleSubmit = async (e) =>{
    e.preventDefault()
    setLoad(true)
    try{
        const obj={billItems:pays, from, to, paymentMethod: paymentType[0].label, totalAmount:total}
        console.log(obj)
        const res=await axios.put(`${path}receptionist/pharmabill/${id}`,obj)
        if(res.status===200){
          navigate('/pharma/medication/payment/print',{state:{data: {pays, from, to, paymentType: paymentType[0].label, total}}})
        }
    }
    catch(err){
      console.log(err)
    }
    setLoad(false)
  }


  return (
    <>
        <div className={`${classed.crum} mt-3 pt-1 mb-2.5`} >
          <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Payment Details</h1>
    <form onSubmit={HandleSubmit} className='flex flex-col items-center'>
      <div>
        <FormControl label={() => "Total"}>
                  <Input
                  id="uid"
                  value={total}
                  disabled
                  size={SIZE.compact}
                  overrides={{
                      Root: {
                      style: () => ({ borderRadius: "10px", width:'18rem'}),
                      },
                  }}
                  />
        </FormControl>
      </div>
      
      <div>
            <FormControl label={() => "From"}>
                <Input
                required
                autoFocus
                id="uid"
                value={to}
                onChange={(e)=>setTo(e.target.value)}
                placeholder='Eg: John'
                clearable
                size={SIZE.compact}
                overrides={{
                    Root: {
                    style: () => ({ borderRadius: "10px", width:'18rem'}),
                    },
                }}
                />
            </FormControl>
      </div>

      <div className='w-[18rem]'>
                    <FormControl label={() => "Payment Type"}>
                            <Select
                                options={PayList}
                                value={paymentType}
                                required
                                placeholder="Select Payment Type"
                                onChange={params => setpaymentType(params.value)}
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
            <FormControl label={() => "To"}>
                <Input
                required
                id="uid"
                value={from}
                onChange={(e)=>setFrom(e.target.value)}
                placeholder='Eg: Rohan'
                clearable
                size={SIZE.compact}
                overrides={{
                    Root: {
                    style: () => ({ borderRadius: "10px", width:'18rem'}),
                    },
                }}
                />
            </FormControl>
      </div>
            <Button 
                    size={SIZE.large}
                    isLoading={load}
                    shape={SHAPE.square}
                    overrides={{
                        BaseButton: {
                        style: ({ $theme }) => ({
                            backgroundColor: $theme.colors.positive400,
                            width: "12em",
                            marginLeft: '2rem',
                            marginBottom: '5%',
                        })
                        }
                        }}
                    >
                    Confirm Payment
                </Button>
    </form>
  </>
  )
}
