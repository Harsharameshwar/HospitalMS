import React from 'react'
import classes from './Message_CardDash.module.css'
import { Card, StyledBody, StyledAction } from "baseui/card"
import { User, Users, UserX,UserPlus,UserCheck, DollarSign, Clock, FolderPlus, Inbox, FilePlus, Paperclip, PlusCircle, } from "react-feather"
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function MessageCard(props) {
  const navigate=useNavigate()

    function HandleClick(){

        if(props.mod === 'User Setup'){
          navigate('/admin/usersetup')
        }
        else if(props.mod === 'History'){
          navigate('/admin/history')
        }
        else if(props.mod === 'User Setup History'){
          navigate('/admin/history/usersetuphistory')
        }
        else if(props.mod === 'Payment History'){
          navigate('/admin/history/paymenthistory')
        }
        else if(props.mod === 'Create User'){
          navigate('/admin/usersetup/createuser')
        }
        else if(props.mod === 'Edit User'){
          navigate('/admin/usersetup/edituser')
        }
        else if(props.mod === 'Delete User'){
          navigate('/admin/usersetup/deleteuser')
        }
        else if(props.mod === 'Appointments'){
          navigate('/doctor/appointments')
        }
        else if(props.mod === 'Checkup History'){
          navigate('/doctor/checkuphistory')
        }
        else if(props.mod === 'Todays Appointments'){
          navigate('/doctor/appointments/todaysappointments')
        }
        else if(props.mod === 'Future Appointments'){
          navigate('/doctor/appointments/futureappointments')
        }
        else if(props.mod === 'Appointment'){
          navigate('/patient/appointment')
        }
        else if(props.mod === 'My Details'){
          navigate('/patient/mydetails')
        }
        else if(props.mod === 'Book Appointment'){
          navigate('/patient/appointment/bookappointment')
        }
        else if(props.mod === 'Appointment Status'){
          navigate('/patient/appointment/appointmentstatus')
        }
        else if(props.mod === 'My History'){
          navigate('/patient/myhistory')
        }
        else if(props.mod === 'Medical History'){
          navigate('/patient/myhistory/medicalhistory')
        }
        else if(props.mod === 'Payments History'){
          navigate('/patient/myhistory/paymentshistory')
        }
        else if(props.mod === 'Reception Appointments'){
          navigate('/receptionist/appointments')
        }
        else if(props.mod === 'Patient'){
          navigate('/receptionist/findpatient')
        }
        else if(props.mod === 'Billings'){
          navigate('/receptionist/billings')
        }
        else if(props.mod === 'Pay History'){
          navigate('/pharma/payhistory')
        }
        else if(props.mod === 'Medication'){
          navigate('/pharma/medication')
        }
      }
        return (
          <Card style={{cursor:"pointer"}} id={props.mod} onClick={HandleClick} className={`${classes.card} mx-auto p-2`} >
            <div className='flex'>
            <StyledBody className='mx-auto'>
              {props.mod === 'User Setup' && <User size={30}/> }
              {props.mod === 'History' && <Clock size={30}/>}
              {props.mod === 'My History' && <Clock size={30}/>}
              {props.mod === 'User Setup History' && <Users size={30}/>}
              {props.mod === 'Create User' && <UserPlus size={30}/>}
              {props.mod === 'Edit User' && <UserCheck size={30}/>}
              {props.mod === 'Delete User' && <UserX size={30}/>}
              {props.mod === 'Payment History' && <DollarSign size={30}/>}
              {props.mod === 'Todays Patient Count' && <div className='flex'><Icon icon="mdi:human-queue" width="30" /> <p className='text-xl my-auto ml-1 font-semibold'> - {props.count}</p></div>}
              {props.mod === 'Appointments' && <Icon icon="openmoji:patient-clipboard" width="50" />}
              {props.mod === 'Checkup History' && <Icon icon="openmoji:patient-file" width="50" />}
              {props.mod === 'Todays Appointments' && <Icon icon="icon-park:appointment" width="30" />}
              {props.mod === 'Future Appointments' && <Icon icon="fluent:arrow-forward-down-person-20-filled" width="40" />}
              {props.mod === 'Appointment' && <FolderPlus size={30} />}
              {props.mod === 'My Details' && <Inbox size={30}/>}
              {props.mod === 'Book Appointment' && <FilePlus size={30} />}
              {props.mod === 'Appointment Status' && <Paperclip size={30} />}
              {props.mod === 'Medical History' && <PlusCircle size={30}/>}
              {props.mod === 'Payments History' && <DollarSign size={30}/>}
              {props.mod === 'Reception Appointments' && <Icon icon="teenyicons:appointments-solid" width="45" />}
              {props.mod === 'Patient' && <Icon icon="medical-icon:i-inpatient" width="45" />}
              {props.mod === 'Billings' && <Icon icon="uil:bill" width="45" />} 
              {props.mod === 'Medication' && <Icon icon="healthicons:medicines" width="50" />}
              {props.mod === 'Pay History' && <Clock size={40}/>}
            </StyledBody>
            </div>
            <StyledAction>
            {props.mod === 'User Setup' && <p className={classes.text}>User Setup</p>}
              {props.mod === 'History' && <p className={classes.text} >History</p>}
              {props.mod === 'My History' && <p className={classes.text} >History</p>}
              {props.mod === 'User Setup History' && <p className={classes.text} >User Setup History</p>}
              {props.mod === 'Create User' && <p className={classes.text} >Create User</p>}
              {props.mod === 'Edit User' && <p className={classes.text} >Edit User</p>}
              {props.mod === 'Delete User' && <p className={classes.text} >Delete User</p>}  
              {props.mod === 'Payment History' && <p className={classes.text} >Payment History</p>} 
              {props.mod === 'Todays Patient Count' && <p className={classes.text} >Todays Patient Count</p>}
              {props.mod === 'Appointments' && <p className={classes.text} >Appointments</p>}
              {props.mod === 'Checkup History' && <p className={classes.text}>Checkup History</p>}           
              {props.mod === 'Todays Appointments' && <p className={classes.text} >Todays Consultations</p>}
              {props.mod === 'Future Appointments' && <p className={`${classes.text}`} >Future Consultations</p>}
              {props.mod === 'Appointment' && <p className={`${classes.text}`} >Appointment</p>}
              {props.mod === 'My Details' && <p className={`${classes.text}`} >My Details</p>}
              {props.mod === 'Book Appointment' && <p className={`${classes.text}`} >Book Appointment</p> }
              {props.mod === 'Appointment Status' && <p className={`${classes.text}`} >Appointment Status</p> }
              {props.mod === 'Medical History' && <p className={`${classes.text}`} >Medical History</p> }
              {props.mod === 'Payments History' && <p className={`${classes.text}`} >Payment History</p> }
              {props.mod === 'Reception Appointments' && <p className={classes.text} >Appointments</p>}
              {props.mod === 'Patient' && <p className={classes.text} >Offline Patient</p>}
              {props.mod === 'Billings' && <p className={classes.text} >Billings</p>}
              {props.mod === 'Medication' && <p className={classes.text} >Medication</p>}
              {props.mod === 'Pay History' && <p className={classes.text} >Payment History</p>}
            </StyledAction>
          </Card>
        )
      }
      