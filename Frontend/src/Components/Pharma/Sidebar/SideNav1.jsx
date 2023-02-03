import React from "react";
import { Icon } from '@iconify/react';
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './Sidenav.css'
import { Clock, Folder, } from "react-feather";
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
        <NavItem  eventKey="Dashboard"  onClick={(event)=>navigate(`/pharma`)}> 
        {/*  */}
            <NavIcon className='bg-dark'>
                <Folder className="mt-4 ml-4"/>            
            </NavIcon>
            <NavText>
                Dashboard
            </NavText>   
        </NavItem>

        <NavItem eventKey="Appointments"  onClick={(event)=>navigate(`/pharma/medication`)} >
            <NavIcon>
                <Icon icon="game-icons:medicines" width="30" height="30" className="ml-3.5 mt-2" />
            </NavIcon>
            <NavText>
                Medications
            </NavText>   
        </NavItem>

        <NavItem eventKey="Checkup History"  onClick={(event)=>navigate('/pharma/payhistory')}>
        {/*  */}
            <NavIcon>
            <Clock className="mt-3.5 ml-4"/>
            </NavIcon>
            <NavText>
                Payment History
            </NavText>   
        </NavItem>
         </SideNav.Nav>
         </SideNav>

);
}

export default SideNav1

