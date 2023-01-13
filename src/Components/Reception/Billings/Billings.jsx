import React from 'react'
import Crums from '../../../UI/Crums';
import classed from '../../../UI/Crums.module.css';
import DataTable from 'react-data-table-component';
import { Input } from "baseui/input";
import { useEffect } from 'react';
import axios from 'axios';

export default function Billings() {

    let crum = ['Home','Billings'];
    const path=process.env.REACT_APP_PATH;
    const data2=[]
    const [data,setData]=React.useState([])

  
    useEffect(()=>{
      const fetchData=async ()=>{
        const res=await axios.get(`${path}history/paymenthistory`)
        // console.log(res.data)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          slno:j,
          from:i.to+"",
          to:i.from+"",
          method:i.paymentMethod+"",
          amount:i.totalAmount+"",
          time:new Date(i.createdAt).toString().split("GMT")[0],
        })
        setData(data2)
      })
      }
      fetchData()
    })


    const columns = [
        {
          name: 'Serial No',
          wrap:"true",
          selector: row => row.slno,
        },
          {
            name: 'Payment Method',
            wrap:"true",
            grow:'1.2',
            selector: row => row.method,
          },
          {
              name: 'From',
              wrap:"true",
              selector: row => row.from,
            },
            {
              name: 'To',
              wrap:"true",
              selector: row => row.to,
            },
            {
              name: 'Amount',
              wrap:"true",
              selector: row => row.amount,
            },
          {
              name: 'Time',
              wrap:"true",
              selector: row => row.time,
            },       
    ];

    // var data= [
    //     {
    //         slno: '1',
    //         from: 'YRS',
    //         to: 'Dr. Shashank',
    //         method: 'UPI',
    //         amount : '₹5000',
    //         time: '2022-05-12 5:40pm',
    //     }
    // ]

    const [finder, setFinder] = React.useState('');
    var rows = [];

    if(finder !== undefined){
        data.forEach((i) => { 
          i.id = i.id + '';
          if(i.method.toLocaleLowerCase().includes(finder.toLocaleLowerCase())  || i.to.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) ||i.from.toLocaleLowerCase().includes(finder.toLocaleLowerCase())|| i.amount.includes(finder) || i.time.includes(finder)){
            rows.push(i);
          }
        })
      }

  return (
    <>
        <div className={`${classed.crum} mt-3 pt-1`} >
          <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl text-center mt-4 mb-4 font-semibold'>Billings</h1>
        <Input
      value={finder}
      onChange={e => setFinder(e.target.value)}
      placeholder="Search"
      clearOnEscape
      clearable
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.primary700} `,
            borderRadius: '20px',
            width: '49.445%',
            marginLeft: '5%',
            
          })
        }
      }}
    />
     <div style={{marginBottom:"10%",paddingBottom:"10%",}}>
    <div style={{border: '1px solid black', margin:'3% 5% 4% 2%',  padding: '2%'}}>
    <DataTable
    className="d-flex flex-shrink-* flex-column"
      title='Payment History'
      columns={columns}
      data={rows}
      pagination
      striped={true}
      highlightOnHover={true}
      pointerOnHover={true}
      paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
    />
    </div>
    </div>
    </>
  )
}
