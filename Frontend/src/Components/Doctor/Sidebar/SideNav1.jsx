import React from "react";


import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './Sidenav.css'
import { Icon } from '@iconify/react';
import { Folder } from "react-feather";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from "react-router-dom";


function SideNav1(){
    const navigate=useNavigate()

return(
    <SideNav style={{overflowX:"hidden"}}
    onSelect={(selected) => {
    }}
>
    <SideNav.Toggle  />
    <SideNav.Nav >
        <NavItem  eventKey="Dashboard"  onClick={(event)=>navigate(`/doctor`)}> 
        {/*  */}
            <NavIcon className='bg-dark'>
            <Folder className="mt-4 ml-4"/>
            
            </NavIcon>
            <NavText>
            Dashboard
            </NavText>   
        </NavItem>
        <NavItem eventKey="Appointments"  onClick={(event)=>navigate(`/doctor/appointments`)} >
        {/* */}
            <NavIcon>
            <Icon icon="teenyicons:appointments-solid" className="mt-3.5 ml-4" width="22"/>
            </NavIcon>
            <NavText>
                Appointments
            </NavText>   
        </NavItem>

        <NavItem eventKey="Checkup History"  onClick={(event)=>navigate('/doctor/checkuphistory')}>
        {/*  */}
            <NavIcon>
            <Icon icon="openmoji:patient-file" width="40" className="mt-1 ml-2"/>
            </NavIcon>
            <NavText>
            Checkup History
            </NavText>   
        </NavItem>
         </SideNav.Nav>
         </SideNav>

);
}

export default SideNav1

