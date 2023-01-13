import React from "react";


import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './Sidenav.css'
import { Clock, Folder, FolderPlus, Inbox } from "react-feather";
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
        <NavItem  eventKey="Dashboard"  onClick={(event)=>navigate(`/patient`)}> 
        {/*  */}
            <NavIcon className='bg-dark'>
            <Folder className="mt-4 ml-4"/>
            
            </NavIcon>
            <NavText>
            Dashboard
            </NavText>   
        </NavItem>
        
        <NavItem eventKey="Appointments"  onClick={(event)=>navigate(`/patient/mydetails`)} >
            <NavIcon>
            <Inbox className="mt-3.5 ml-4" />
            </NavIcon>
            <NavText>
                My Details
            </NavText>   
        </NavItem>

        <NavItem eventKey="Appointments"  onClick={(event)=>navigate(`/patient/appointment`)} >
            <NavIcon>
            <FolderPlus className="mt-3.5 ml-4" width="22"/>
            </NavIcon>
            <NavText>
                Appointment
            </NavText>   
        </NavItem>

        <NavItem eventKey="Checkup History"  onClick={(event)=>navigate('/patient/myhistory')}>
        {/*  */}
            <NavIcon>
            <Clock className="mt-3.5 ml-4"/>
            </NavIcon>
            <NavText>
            History
            </NavText>   
        </NavItem>
         </SideNav.Nav>
         </SideNav>

);
}

export default SideNav1

