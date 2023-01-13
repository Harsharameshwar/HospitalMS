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
                <NavItem  eventKey="Dashboard"  onClick={(event)=>navigate(`/receptionist`)}> 
                    {/*  */}
                    <NavIcon className='bg-dark'>
                        <Folder className="mt-4 ml-4"/>
                                    
                    </NavIcon>
                    <NavText>
                        Dashboard
                    </NavText>   
                </NavItem>
                <NavItem eventKey="Appointments"  onClick={(event)=>navigate(`/receptionist/appointments`)} >
                    {/* */}
                    <NavIcon>
                        <Icon icon="teenyicons:appointments-solid" className="mt-3.5 ml-4" width="22"/>
                    </NavIcon>
                    <NavText>
                        Appointments
                    </NavText>   
                </NavItem>
                <NavItem eventKey="Checkup History"  onClick={(event)=>navigate('/receptionist/findpatient')}>
                {/*  */}
                    <NavIcon>
                        <Icon icon="medical-icon:i-inpatient" width="35" className="mt-2 ml-2"/>
                    </NavIcon>
                    <NavText>
                        Create Appointment
                    </NavText>   
                </NavItem>
                <NavItem eventKey="Checkup History"  onClick={(event)=>navigate('/receptionist/billings')}>
                    {/*  */}
                    <NavIcon>
                        <Icon icon="uil:bill" width="33" className="mt-2 ml-3.5"/>
                    </NavIcon>
                    <NavText>
                        Billings
                </NavText>   
                </NavItem>
        </SideNav.Nav>
    </SideNav>

);
}

export default SideNav1

