import React from 'react'
import { Breadcrumbs } from "baseui/breadcrumbs";
import { StyledLink } from "baseui/link";
import { useNavigate } from 'react-router-dom';


export default function Crums(props) {
  const user  = JSON.parse(localStorage.getItem("user"))
  

    var role=user?.role?.toLocaleLowerCase()
    if(role==="pharmaceutical"){
      role="pharma"
    }

  const navigate=useNavigate();
  var crumpieces=[];
  var paths=[];

    for (let i = 0; i < props.crum.length-1; i++) {
      crumpieces[i] = props.crum[i]
      paths[i]=crumpieces[i].toLocaleLowerCase().replace(/ /g,'')
    }
  return (
    <Breadcrumbs>
    {crumpieces.map((i) => {
      if(i === 'Home'){
        return <StyledLink style={{cursor:"pointer"}} key={i} onClick={()=>{navigate(`/${role}`)}}>{i}</StyledLink>
      }

      else{
        const index=crumpieces.indexOf(i)
        return <StyledLink style={{cursor:"pointer"}} key={i} onClick={()=>{navigate(`/${role}/${paths[index]}`)}}>{i}</StyledLink>
      }})}
      <span>{props.crum[props.crum.length-1]}</span>
    </Breadcrumbs>
  )
}
