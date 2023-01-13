import React, { useEffect } from 'react'
import { Table } from "baseui/table";
import { Button, SHAPE } from "baseui/button";
import { XOctagon } from 'react-feather';
import { Textarea } from "baseui/textarea";
import { FormControl } from 'baseui/form-control';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE,SIZE
  } from "baseui/modal";

export default function AppointmentStatus({init}) {

    // eslint-disable-next-line no-unused-vars
    // const [initial, setInitial] = React.useState(init);

    const [load, setLoad] = React.useState(false)
    const [dis, setDis] = React.useState(false)

    // console.log(init)

    // var [date, setDate] = React.useState(['-'])
    // var [time, setTime] = React.useState(['-'])
    const [cause, setCause] = React.useState('');
    const [openCause, setOpenCause] = React.useState(false);
    const [rsn ,setRsn] = React.useState('-')
    const navigate =useNavigate()
    const path=process.env.REACT_APP_PATH;  
    const [modal,setModal]=React.useState("");

    const [isOpen, setIsOpen] =React.useState(false);


    useEffect(()=>{
        function rerun(){
            if(init?.status=== 'Requested'){
                setRsn('Waiting For Approval')                
            }
            if(init?.status === 'Confirmed'){
                console.log(init.dateTime)
                // let d = init?.dateTime?.split('T')
                // let t = d[1]?.split('.')
                setRsn(`Doctor Name: ${init?.doctorName},\nDate & Time: ${init.dateTime}`)
            }
            if(init?.status==='Cancelled'){
                setDis(true)
                setRsn("-")
            }
            if(init?.status==='Completed' || init?.status==='Paid'){
                // let d = init?.dateTime?.split('T')
                // console.log(init?.dateTime)
                // let t = d[1]?.split('.')
                setDis(true)
                setRsn(`Doctor Name: ${init?.doctorName},\nDate & Time: ${init.dateTime}`)
            }
        }
        rerun()
    },[init])
 
    const HandleCancel = async () =>{
        setOpenCause(true)
        if(openCause === true && cause !==''){
            setLoad(true)
            try{
                const res=await axios.post(`${path}patients/cancelappointment/${init.id}`,{cancelReason:cause}) 
                if(res.data==='Success'){
                        navigate(-1)
                }
            }
            catch(err){
            setLoad(false)
            setModal(err.response.data.message)
            setIsOpen(true)
        }
            console.log()
            setLoad(false)
        }
    }
    
  return (
    <>
          <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Notice!</ModalHeader>
      <ModalBody>
      {modal}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setIsOpen(false)} >Okay</ModalButton>
      </ModalFooter>
    </Modal>
    <div className='mx-auto mt-4 w-[80%]'>
        <Table
            data={[
                [
                "Name",
                <p className='break-all font-bold'>{init.name}</p>
                ],
                [
                "Cause",
                <p className='break-all font-bold'>{init.cause}</p>
                ],
                [
                    "Department",
                    <p className='break-all font-bold'>{init.dept}</p>
                ],
                [
                    "Status",
                    <p className='break-all font-bold'>{init.status}</p>
                ],
                [
                    "Details",
                    <pre className='break-all font-bold'>{rsn}</pre>
                ]
            ]}
        />
    </div>
    {openCause && <div className='mt-4 flex flex-col w-[18rem] mx-auto'>
        <FormControl label={() => "Reason for Cancellation"}>
                    <Textarea
                    value={cause}
                    required
                    onChange={e => setCause(e.target.value)}
                    placeholder={`False alarm / Got Checked by other doctor`}
                    clearOnEscape
                    />
        </FormControl>
        
    </div>}
    {!dis && <div className='mt-4 flex justify-center'>
        <Button
            shape={SHAPE.pill}
            isLoading={load}
            onClick={HandleCancel}
            startEnhancer={<XOctagon/>}
            overrides={{ BaseButton: { style: ({ $theme }) => ({ backgroundColor: $theme.colors.negative400, width: "10em", }) } }}
            >
            Cancel Appointment
        </Button>
    </div>}
</>
  )
}
