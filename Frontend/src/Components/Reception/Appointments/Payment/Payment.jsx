import React from 'react'
import Crums from '../../../../UI/Crums';
import classed from '../../../../UI/Crums.module.css';
import AllPays from './AllPays';
import { PlusCircle } from 'react-feather';
import { Button,SHAPE,SIZE } from 'baseui/button';
import { ArrowRight } from 'baseui/icon';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment() {

  const navigate = useNavigate()

    let crum = ['Home','Appointments', 'Payment-1'];
    const [pays, setPays] = React.useState([]);
    const [lid, setLid] = React.useState(1);
    const [dis, setDis] = React.useState(true)

    const {state}=useLocation()

    console.log(state)

    const OnAddEntries = async({id, name, cost}) =>{
      let data = pays
      data[id] = {id, name, cost}
      await setPays(data) 
      await setDis(false)
    }


    console.log(pays)
    const FieldCreator = () =>{
      if(pays[lid-1] !== null && pays[lid-1] !== undefined){
        setLid(lid + 1)
      }
    }

  return (
    <>
        <div className={`${classed.crum} mt-3 pt-1`} >
          <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Payments</h1>
        {lid>0  && <ul>{Array.from(Array(Number(lid)), (e,i) => {
          return <li key={i}><AllPays key={i} id={i} OnAddEntries={OnAddEntries}/></li>
        })} </ul> }
        <div className='mx-[47%]'>
          <Button size={SIZE.default} shape={SHAPE.square} onClick={FieldCreator} overrides={{ BaseButton: { style: ({ $theme }) => ({ backgroundColor: $theme.colors.positive400, width: "4rem", }) } }} > <PlusCircle/> </Button>
        </div>
        <div className='ml-[80%] mt-4 mb-5 pb-5'>
          <Button size={SIZE.default} disabled={dis} shape={SHAPE.square} onClick={e=>navigate('/receptionist/appointments/payment/2', {state:{data:pays,data1:state.data}})} overrides={{ BaseButton: { style: ({ $theme }) => ({  width: "8rem", }) } }} > <ArrowRight size={40}/> </Button>
        </div>
    </>
  )
}
