import React from 'react'
import styled from 'styled-components'
import { Smile, LogOut } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Content = styled.div`
position: relative;
width: 85%;

 
margin : 0% 5rem 3rem 6rem;

background: linear-gradient(90deg, rgba(255, 255, 255, 0.09) 0%, rgba(225, 207, 207, 0.1) 25%, 
rgba(228, 228, 228, 0.06) 50%, rgba(215, 215, 215, 0.045) 75%, rgba(222, 196, 196, 0.045) 100%);
mix-blend-mode: normal;
border: 1px solid rgba(32, 17, 3, 0.5);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
border-radius: 1.7rem;
 @media (max-width:550px){
  max-width : 23rem;
  margin-right: 5rem;
  margin-left: 24%;

 }

`


const Wrapper = styled.div`
 /* display: flex; */
 /* column-gap: 10%; */
 margin-top: 3.3%;
 margin-left: 2%;
 margin-right:2%;
 padding-left: 2%;
 @media (max-width:550px){
  max-width : 30rem;
  margin-left: 2.3rem;
  justify-content: space-around;
  
  

 }

 
`
const Hname =styled.div`
 
width: 16.5rem;
height: 3rem;
padding: 1.3%;
 text-align: center;
display: flex;
  font-size: large;
  font-weight: 600;
align-items: center ;
justify-content: space-around;
margin-right: 3%;
margin-bottom: 3%;
box-shadow: 2px 2px 5px 1px black;

background: #F2eFeF;
border-radius: 1rem;

@media (max-width:550px){

  margin-bottom: 1rem;
  width: 13rem

 }
`



function Header() {
 const user=JSON.parse(localStorage.getItem("user"))
  var name
  if(user!==null && user!==undefined){
   name=user?.name?.toLocaleLowerCase()
  }


  const navigate=useNavigate()
  return (
    <>
      <Content>

        <Wrapper className='flex md:flex-row flex-col justify-content-between '>
            <Hname  >Alpha Hospital</Hname>
            <Hname>
            <div className='flex justify-around min-w-[50%]'>
                <Smile/>  
                  {name}
            </div>   
            </Hname>
            <Hname onClick={()=>{localStorage.removeItem("user");navigate('/')}}>               
                    <div className='flex justify-around min-w-[50%]'>
                    Logout <LogOut/>
                    </div>
            </Hname>

        </Wrapper>
      </Content>
    </>
  )
}

export default Header