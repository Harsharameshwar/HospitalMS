import React from 'react'
import { Table } from "baseui/table";
import { useLocation } from 'react-router-dom';
import { Button, SHAPE, SIZE } from 'baseui/button'
import { Printer } from 'react-feather';

export default function PrinterFile() {

    const loc = useLocation()
    const initial = loc.state.data

    var meds = []
    var count = 0 
    initial.pays.forEach((element) => {
        meds[count]=[element.name,<p className='break-all font-bold' key={count}>{element.cost}</p>]
        count++
    });
    

  return (
    <>
    <div id='printsec'>
        <div className='flex flex-col mb-3 text-xl hdata' id='hdata'>
            <p className='redder'></p>
            <p className='text-6xl font-bold font-sans mt-[5%]' style={{marginLeft: '28%'}}>Alpha Hospital</p>
            <p className='text-4xl mb-[5%] mt-5' style={{marginLeft: '40%'}}>{`${new Date().getDate()}/${new Date().getMonth() +1}/${new Date().getFullYear()}`}</p>
        </div>
        
        <div className='mx-auto my-auto w-[80%]'>
            <Table
            data={meds}
            columns={["Medication", "Cost"]}
            />  
        </div>
        <div className='mx-auto mt-4 w-[80%]'>
        <Table
            data={[
                [
                    "Total",
                    <p className='break-all font-bold'>{initial.total}</p>
                ],
                [
                    "Payment Type",
                    <p className='break-all font-bold'>{initial.paymentType}</p>
                ],
                [
                    "From",
                    <p className='break-all font-bold'>{initial.from}</p>
                    ],
                    [
                    "To",
                    <p className='break-all font-bold'>{initial.to}</p>
                    ],
            ]}
            />
        </div>
    </div>
    <div className='mt-3 ml-[40%]'>
                <Button 
                    size={SIZE.large}
                    startEnhancer={<Printer/>}
                    shape={SHAPE.square}
                    onClick={()=>window.print()}
                    overrides={{
                        BaseButton: {
                        style: ({ $theme }) => ({
                            width: "8em",
                            marginLeft: '2rem'
                        })
                        }
                        }}
                    >
                    Print
                </Button>
    </div>
    </>
  )
}

