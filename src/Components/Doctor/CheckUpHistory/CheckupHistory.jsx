import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Input } from "baseui/input";
import Crums from "../../../UI/Crums";
import classes from '../../../UI/Crums.module.css';
import axios from 'axios';

export default function CheckupHistory() {

    let crum = ['Home', 'Checkup History'];

    const path=process.env.REACT_APP_PATH;
    const data2=[]
    const [data,setData]=useState([])
    const user=JSON.parse(localStorage.getItem('user'))
    // console.log(user._id)

    useEffect(()=>{
      const fetchData=async ()=>{
        const res=await axios.get(`${path}history/doctor/appointment/${user?._id}`)
        // console.log(res.data)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          slno:j,
          age:i.Patient.age+"",
          name:i.Patient.name+"",
          phone:i.Patient.phone+"",
          email:i.Patient.email+"",
          rsn:i.purposeOfVisit+"",
          tym:i.appointmentDate.split('T')[0],
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
              name: 'Name',
              wrap:"true",
              selector: row => row.name,
            },
            {
                name: 'age',
                wrap:"true",
                selector: row => row.age,
              },
            {
              name: 'Email',
              wrap:"true",
              selector: row => row.email,
            },
            {
              name: 'Phone',
              wrap:"true",
              selector: row => row.phone,
            },
          {
            name: 'Consultation Reason',
            wrap:"true",
            selector: row => row.rsn,
          },
          {
              name: 'Consultation At',
              wrap:"true",
              selector: row => row.tym,
            },   
                 
    ];

    // var data= [
    //     {
    //         slno: '1',
    //         name: 'Gopal',
    //         phone: '9237682010',
    //         email: 'gopal@g.co',
    //         age: '65',
    //         rsn: 'Fever',
    //         tym: '2022-05-12',
    //     }
    // ]

    const [finder, setFinder] = React.useState('');
    var rows = [];

    if(finder !== undefined){
        data.forEach((i) => { 
          i.id = i.id + '';
          if(i.name.toLocaleLowerCase().includes(finder.toLocaleLowerCase())|| i.phone.includes(finder) ||  i.email.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) ||i.age.includes(finder) || i.rsn.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || i.tym.includes(finder)){
            rows.push(i);
          }
        })
      }

  return (
    <>
      <div className={`${classes.crum} mt-3 pt-1 mb-3`}>
        <Crums crum={crum} />
      </div>
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
      title='Checkup History'
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
