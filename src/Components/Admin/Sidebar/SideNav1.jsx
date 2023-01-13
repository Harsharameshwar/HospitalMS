import React from "react";


import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './Sidenav.css'

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Folder ,Database, User} from "react-feather";
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
        <NavItem  eventKey="Dashboard" onClick={(event)=>navigate('/admin')} >
            <NavIcon className='bg-dark'>
                <Folder className="mt-4 ml-4"/>
            </NavIcon>
            <NavText>
            Dashboard
            </NavText>   
        </NavItem>
        <NavItem eventKey="User Setup"  onClick={(event)=>navigate('/admin/usersetup')}>
            <NavIcon>
            <User className="mt-4 ml-4"/>
            </NavIcon>
            <NavText>
                User Setup
            </NavText>   
        </NavItem>

        <NavItem eventKey="History" onClick={(event)=>navigate('/admin/history')} >
            <NavIcon>
           <Database className="mt-4 ml-4"/>
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

