import React from 'react'
import DataTable from 'react-data-table-component';
import { Input } from "baseui/input";
import Crums from "../../../UI/Crums";
import classes from '../../../UI/Crums.module.css';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';

export default function UserHistory() {

    let crum = ['Home', 'History','User Setup History'];
    const path=process.env.REACT_APP_PATH;
    const data2=[]
    const [data,setData]=useState([])

    useEffect(()=>{
      const fetchData=async ()=>{
        const res=await axios.get(`${path}history/users`)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          slno:j,
          creator:i.creator+"",
          name:i.name+"",
          email:i.email+"",
          gender:i.gender+"",
          specialization:i.specialization ? i.specialization+"" : "Not applicable",
          qualification:i.qualification+"",
          phone:i.phone+"",
          actionType:i.actionType+"",
          created:new Date(i.createdAt).toString().split("GMT")[0],
          updated:new Date(i.updatedAt).toString().split("GMT")[0],
          action:i.action+"",
          role:i.role+""
        })
        data2.reverse()
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
              name: 'Creator',
              wrap:"true",
              selector: row => row.creator,
            },

          {
              name: 'Name',
              wrap:"true",
              selector: row => row.name,
            },
            {
              name: 'Gender',
              wrap:"true",
              selector: row => row.gender,
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
              name: 'Action',
              wrap:"true",
              selector: row => row.action,
            },
            {
              name: 'Action Type',
              wrap:"true",
              selector: row => row.actionType,
            },
            {
            name: 'Role',
            wrap:"true",
            selector: row => row.role,
          },
          {
          name: 'Qualification',
            wrap:"true",
            selector: row => row.qualification,
          },
          {
          name: 'Specialization',
            wrap:"true",
            selector: row => row.specialization,
          },
          {
              name: 'Created At',
              wrap:"true",
              selector: row => row.created,
            },
          {
            name: 'Updated At',
            selector: row => row.updated,
            wrap:"true",
          },          
    ];

    // var data= [
    //     {
    //         slno: '1',
    //         name: 'YRS',
    //         phone: '9237682010',
    //         email: 's@g.co',
    //         role: 'Dctr, Admin',
    //         designation: 'Dctr',
    //         created: '2022-05-12',
    //         updated: '2022-05-12',
    //     }
    // ]

    const [finder, setFinder] = React.useState('');
    var rows = [];

    if(finder !== undefined){
        data.forEach((i) => { 
          if(i.name.toLocaleLowerCase().includes(finder.toLocaleLowerCase())||
          i.creator.toLocaleLowerCase().includes(finder.toLocaleLowerCase())||
          i.specialization.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) ||
          i.qualification.toLocaleLowerCase().includes(finder.toLocaleLowerCase())||
          i.gender.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || 
          i.actionType.toLocaleLowerCase().includes(finder.toLocaleLowerCase())|| 
          i.action.toLocaleLowerCase().includes(finder.toLocaleLowerCase())|| 
          i.phone.includes(finder) ||  
          i.email.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) ||
          i.role.toLocaleLowerCase().includes(finder.toLocaleLowerCase()) || 
          i.created.includes(finder)||
          i.updated.includes(finder)){
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
    className="d-flex flex-shrink-* flex-column"
      title='User Setup History'
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
