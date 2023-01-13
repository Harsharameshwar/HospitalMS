import React, { useState } from 'react'
import classes from '../../../../UI/Crums.module.css';
import Crums from '../../../../UI/Crums';
import { Textarea } from "baseui/textarea";
import { Input, SIZE } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { FileUploader } from "baseui/file-uploader";
import { Button, SHAPE } from "baseui/button";
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Icon, } from '@iconify/react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE
} from "baseui/modal";
import axios from 'axios';
import { useEffect } from 'react';


function useInterval(callback, delay) {
    const savedCallback = React.useRef(() => {});

    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function useFakeProgress() {
    const [fakeProgress, setFakeProgress] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    function stopFakeProgress() {
      setIsActive(false);
      setFakeProgress(0);
    }
    function startFakeProgress() {
      setIsActive(true);
    }
    useInterval(
      () => {
        if (fakeProgress >= 100) {
          stopFakeProgress();
        } else {
          setFakeProgress(fakeProgress + 10);
        }
      },
      isActive ? 500 : null,
    );
    return [fakeProgress, startFakeProgress, stopFakeProgress];
  }

export default function DiagnoseCure() {
  // const [data,setData]=useState({});

    let crum = ['Home','Appointments','Todays Appointments', 'Diagnose & Cure'];

  //   var initial = {
  //       cause: 'Just for fun. time waste sitting at home. hope others also do the same.',
  //   }

    // console.log(data.generalCheckupInfo)
    const [checkupInfo, setCheckupInfo] = React.useState( "Blood Pressure/BP: 80/120,\nTemperature/Temp: 98°F,\nWeight: 80kg,\nOxygen/SPO2: 99%,\nPulse Rate/PR: 72/min");
    const [testName, setTestName] = React.useState("");
    const [testDesc, setTestDesc] = React.useState("");
    const [observation, setObservation] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [file, setFile] = React.useState()
    const [finaldiagnose, setFinaldiagnose] = React.useState("")
    const [finding, setFinding] = React.useState("")
    const [medicine, setMedicine] = React.useState("");
    const [morning, setmorning] = React.useState('');
    const [noon, setnoon] = React.useState('');
    const [night, setnight] = React.useState('');
    const [days, setdays] = React.useState("");
    const [MedList, setMedList] = useState([])
    const [emergencyMedicine, setEmergencyMedicine] = React.useState("");
    const [emergencyMedList, setEmergencyMedList] = useState([])
    const [food,setFood]=useState("")
    const [qty, setQty] = React.useState('');
    const [
        progressAmount,
        startFakeProgress,
        stopFakeProgress,
      ] = useFakeProgress();

      const [modal,setModal]=React.useState("");
      const navigate=useNavigate()
      const [load,setLoad]= React.useState(false);
      const [load1,setLoad1]= React.useState(false);
      
      const [isOpen, setIsOpen] =React.useState(false);
      const [isOpen1, setIsOpen1] =React.useState(false);
      const path=process.env.REACT_APP_PATH;
     

      const {state}=useLocation();

      // console.log(state)


   

      const SendScan = async() =>{
        // setLoad1(true)
        try{
          const obj={generalCheckupInfo:checkupInfo, TestsName:testName,  observation:observation}
          console.log(obj)
          const res=await axios.put(`${path}doctor/sendforscan/${state?.id}`,{generalCheckupInfo:checkupInfo, TestsName:testName,  observation:observation})
          console.log(res.data)
          if(res.status===200){
                  navigate(-1)
          }
        }
        catch(err){
          setLoad1(false)
          setModal(err.response.data.message)
          setIsOpen(true)
        }
        
      }


      const SendData = async() =>{
        setLoad(true)
        try{
          const res=await axios.put(`${path}doctor/exitpatient/${state?.id}`,{generalCheckupInfo:checkupInfo, TestsName:testName, typeoffood:food,ReportDescription:testDesc,  observation:observation, ReportContent:file, finalFindings:finaldiagnose, findings:finding,  medications:MedList, emergencyMedications:emergencyMedList}) 
          // console.log(res.data)
          if(res.status===200){
                  navigate(-1)
          }
        }
        catch(err){
          setLoad(false)
          setModal(err.response.data.message)
          setIsOpen(true)
        }
      }


      useEffect(()=>{
        async function fetch(){
          try{
            const res=await axios.get(`${path}doctor/getappointmentdetails/${state?.id}`)
            // console.log(res.data)
            if(("TestsName" in res.data)&& ("generalCheckupInfo" in res.data)&&("observation" in res.data)){
              res.data && setTestName(res?.data?.TestsName)
              res.data && setCheckupInfo(res?.data?.generalCheckupInfo)
              res.data && setObservation(res?.data?.observation)
            }
          }
          catch(err){
            console.log(err)
          }
        }
        fetch()
      },[path,state.id])

      
      const columns = [
          {
              name: 'Medicine',
              wrap:"true",
              selector: row => row.med,
            },
            {
                name: 'Morning',
                wrap:"true",
                selector: row => row.morn,
              },
            {
              name: 'Afternoon',
              wrap:"true",
              selector: row => row.anoon,
            },
            {
              name: 'Night',
              wrap:"true",
              selector: row => row.nyt,
            },
          {
            name: 'No of Days',
            wrap:"true",
            selector: row => row.nod,
          },   
          {
            name: 'Delete',
            wrap:"true",
            selector: row => row.del,
          },     
    ];
    const emercolumns = [
      {
          name: 'Medicine',
          wrap:"true",
          selector: row => row.med,
        },
        {
            name: 'Quantity',
            wrap:"true",
            selector: row => row.qty,
          },
          {
            name: 'Delete',
            wrap:"true",
            selector: row => row.del,
          }, 
    ]

    const emerrem = async(ele) =>{
      setEmergencyMedList(p=>p.filter(i=>!(i.med === ele.med && i.qty === ele.qty)))
    }
      const EmerHandleAdd = async() =>{
        if(emergencyMedicine!=='' && qty!==''){
          let del = <Button size={SIZE.mini} onClick={(e)=>emerrem({med: emergencyMedicine,qty})} shape={SHAPE.pill} overrides={{BaseButton: {style: ({ $theme }) => ({ backgroundColor: $theme.colors.negative400})}}}>Delete</Button>
          let x = {med: emergencyMedicine, qty, del}
          await setEmergencyMedList([...emergencyMedList,x])
          await setEmergencyMedicine('')
          await setQty('')  
        }      
      }

      const rem = async(ele) =>{
        setMedList(p=>p.filter(i=>!(i.med === ele.med && i.morn === ele.morn && i.anoon === ele.anoon && i.noon === ele.noon && i.days === ele.days)))
      }
      const HandleAdd = async() =>{
        if(medicine!=='' && days!==''){ 
          let del = <Button size={SIZE.mini} onClick={(e)=>rem({med: medicine, morn: morning, anoon: noon, nyt: night, nod: days})} shape={SHAPE.pill} overrides={{BaseButton: {style: ({ $theme }) => ({ backgroundColor: $theme.colors.negative400})}}}>Delete</Button>
          let x = {med: medicine, morn: morning, anoon: noon, nyt: night, nod: days, del}
          await setMedList([...MedList,x])
          await setMedicine('')
          await setmorning('')
          await setnoon('')
          await setnight('')
          await setdays('')
        }
      }

    const fileHandler = (e) =>{
        let f = e[0]
        // console.log(f)
        if(f.type === 'application/pdf'){
            let readFile = new FileReader()
            readFile.readAsDataURL(f)
            readFile.onload=e=>{
                var fd = {...f,"file": e.target.result}
                setFile(fd)
                sessionStorage.setItem('file', fd.file)
                // fread = fd;
                // console.log(fd)
            }
        }
        else{
            setErrorMessage('Please upload .pdf format only')
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
<>

<Modal
      onClose={() => setIsOpen1(false)}
      closeable
      isOpen={isOpen1}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Diet Plans</ModalHeader>
      <ModalBody>
      <>
      <strong>
        Clear liquid diet
      </strong>
      <p>
       •Includes minimum residue fluids that can be seen through. <br/>
        • Examples are juices without pulp, broth, and Jell-O.<br/> 
        • Is often used as the first step to restarting oral feeding after surgery or an abdominal procedure. <br/>
        • Can also be used for fluid and electrolyte replacement in people with severe diarrhea. <br/>
        • Should not be used for an extended period as it does not provide enough calories and nutrients.  <br/>
      </p>
      <strong>
        Full liquid diet
      </strong>
      <p>
        • Includes fluids that are creamy. <br/>
        • Some examples of food allowed are ice cream, pudding, thinned hot cereal, custard, strained cream soups, and juices with pulp. <br/>
        • Used as the second step to restarting oral feeding once clear liquids are tolerated. <br/>
        • Used for people who cannot tolerate a mechanical soft diet. <br/>
        • Should not be used for extended periods. <br/>
      </p>
      <strong>
      No Concentrated Sweets (NCS) diet
      </strong>
      <p>
      • Is considered a liberalized diet for diabetics when their weight and blood sugar levels are under control. <br/>
      • It includes regular foods without the addition of sugar. <br/>
      • Calories are not counted as in ADA calorie controlled diets.<br/>
      </p>
      <strong>
      Low fat/low cholesterol diet 
      </strong>
      <p>
      • Is used to reduce fat levels and/or treat medical conditions that interfere with how the body uses fat such as diseases of the liver, gallbladder, or pancreas.<br/>
      • Limits fat to 50 grams or no more than 30% calories derived from fat.<br/>
      • Is low in total fat and saturated fats and contains approximately 250-300 mg cholesterol. <br/>
      </p>
      </>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => setIsOpen1(false)} >Okay</ModalButton>
      </ModalFooter>
    </Modal>
</>


        <div className={`${classes.crum} mt-3 pt-1`} >
            <Crums crum={crum}/>
        </div>
        <h1 className='text-2xl font-medium text-center mb-3 mt-3'>Patent Details</h1>
        <ul className="list-disc mb-5">
          
            <li className='flex flex-col items-center'>
                <h1 className='text-xl font-medium mb-3 mt-3'>Consultation Cause:</h1>
                <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{state?.purpose}</p>
            </li>
          <div className='flex flex-wrap justify-around'>
          <div>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>General Checkup Info</h1>
                <div className='w-[18rem]'>
                    <Textarea
                    value={checkupInfo}
                    onChange={e => setCheckupInfo(e.target.value)}
                    placeholder={`Blood Pressure/BP: 80/120,\nTemperature/Temp: 98°F,\nWeight: 80kg,\nOxygen/SPO2: 99%,\nPulse Rate/PR: 72/min`}
                    clearOnEscape
                    />
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Observation</h1>
                <div className='w-[18rem]'>
                    <Textarea
                    value={observation}
                    onChange={e => setObservation(e.target.value)}
                    placeholder={`Bleeding: None,\nLeft Arm Pain,\n...`}
                    clearOnEscape
                    />
                </div>
            </li>
            <h1 className='text-xl font-medium mb-3 mt-3'>Tests / Scans</h1>
            <li>
                <div className='w-[18rem]'>
                    <FormControl label={() => "Tests Name:"}>
                        <Textarea
                        value={testName}
                        onChange={e => setTestName(e.target.value)}
                        placeholder="Eg. ECG"
                        clearOnEscape
                        />
                    </FormControl>
                      <div className='w-[18rem] ml-[6%] mb-[6%]'>
                          <Button
                            isLoading={load1}
                            onClick={SendScan}
                          >
                        Send for Test
                          </Button>
                      </div>
                    {file && <p className='text-xl font-medium'>File Name - {file.path}</p>}
                    <FileUploader
                        accept=".pdf"
                        onCancel={stopFakeProgress}
                        errorMessage={errorMessage}
                        value = {file}
                        onDropAccepted= {fileHandler}
                        onDropRejected={e=> setErrorMessage('Please upload .pdf format only')}
                        onRetry={e=>setErrorMessage('')}
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            // handle file upload...
                            startFakeProgress();
                        }}
                        progressAmount={progressAmount}
                        progressMessage={
                        progressAmount
                            ? `Uploading... ${progressAmount}% of 100%`
                            : ''
                        }
                    />
                </div>
            </li>
            <FormControl label={() => "Report Description:"}>
                        <Textarea
                        value={testDesc}
                        onChange={e => setTestDesc(e.target.value)}
                        placeholder={`Supraventricular tachycardia of 200 beats per minute caused by an AV nodal re-entry.`}
                        clearOnEscape
                        />
                    </FormControl>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Findings</h1>
                <div className='w-[18rem]'>
                    <Textarea
                    value={finding}
                    onChange={e => setFinding(e.target.value)}
                    placeholder={`Shortness of breath with activity or when lying down`}
                    clearOnEscape
                    />
                </div>
            </li>
          </div>
            <div>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Final Diagnosis</h1>
                <div className='w-[18rem]'>
                    <Textarea
                    value={finaldiagnose}
                    onChange={e => setFinaldiagnose(e.target.value)}
                    placeholder={`This is atrial flutter. The atria contract at 300 beats per minute causing a ‘seesaw’ baseline. Beats are transmitted with a 2:1, 3:1 or 4:1 block, leading to ventricular rates of 150, 100 and 75 BPM respectively.`}
                    clearOnEscape
                    />
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Prescription</h1>
                <div className='w-[18rem]'>
                    <FormControl label={() => "Medication:"}>
                        <Input
                            value={medicine}
                            onChange={e => setMedicine(e.target.value)}
                            size={SIZE.compact}
                            placeholder="Eg. Aspirin"
                            clearable
                            clearOnEscape
                            overrides={{
                                Root: {
                                style: ({ $theme }) => ({
                                    borderRadius: "10px",
                                    width: '18rem'
                                })
                                }
                            }}
                        />
                    </FormControl>
                  
                    <div className='flex w-[18rem] justify-between'>
                        <div className='m-[-0.19rem]'>
                        <FormControl className='flex-col' label={() => "Morning:"}>
                            <input type="number" min={0} pattern="^\d+$" className='w-[4rem] h-7 rounded-lg' value={morning} onChange={(e)=> setmorning(e.target.value)} />
                        </FormControl>
                        </div>
                        <div className='m-[-0.19rem]'>
                        <FormControl className='flex-col' label={() => "Afternoon:"}>
                            <input type="number" min={0} pattern="^\d+$" className='w-[4rem] h-7 rounded-lg' value={noon} onChange={(e)=> setnoon(e.target.value)} />
                        </FormControl>
                        </div>
                        <div className='m-[-0.19rem]'>
                        <FormControl className='flex-col' label={() => "Night:"}>
                            <input type="number" min={0} pattern="^\d+$" className='w-[4rem] h-7 rounded-lg' value={night} onChange={(e)=> setnight(e.target.value)} />
                        </FormControl>
                        </div>
                        <div className='m-[-0.19rem]'>
                        <FormControl className='flex-col' label={() => "No of Days:"}>
                            <input type="number" min={0} pattern="^\d+$" className='w-[4rem] h-7 rounded-lg' value={days} onChange={(e)=> setdays(e.target.value)} />
                        </FormControl>
                        </div>
                    </div>
                    <div className='ml-[5.5rem] mb-3'>
                        <Button onClick={HandleAdd} size={SIZE.compact}>Add</Button>
                    </div>
                </div>
                <div className = 'w-[20.5rem] ml-[-2.1rem]'>
                <DataTable
                  title='Medications Suggested'
                  columns={columns}
                  data={MedList}
                  pagination
                  striped={true}
                  highlightOnHover={true}
                  pointerOnHover={true}
                  paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                />
                </div>
            </li>
            <li>
              <h1 className='text-xl font-medium mb-3 mt-3'>Emergency Medication Given</h1>
              <div className='w-[18rem]'>
                <FormControl label={() => "Emergency Medication:"}>
                  <Input
                      value={emergencyMedicine}
                      onChange={e => setEmergencyMedicine(e.target.value)}
                      size={SIZE.compact}
                      placeholder="Eg. Evolocumab"
                      clearable
                      clearOnEscape
                      overrides={{
                          Root: {
                          style: ({ $theme }) => ({
                              borderRadius: "10px",
                              width: '18rem'
                          })
                          }
                      }}
                  />
                </FormControl>
                <div className='flex w-[18rem] justify-around'>
                  <div className='m-[-0.18rem]'>
                    <FormControl className='flex-col' label={() => "Quantity:"}>
                      <input type="number" min={0} pattern="^\d+$" className='w-[4rem] h-7 rounded-lg' value={qty} onChange={(e)=> setQty(e.target.value)} />
                    </FormControl>
                  </div>
                  <div className='my-auto mb-3'>
                    <Button onClick={EmerHandleAdd} size={SIZE.compact}>Add</Button>
                  </div>
                </div>
              </div>
              <div className = 'w-[20.5rem] ml-[-2.1rem]'>
                <DataTable
                  title='Emergency Medications'
                  columns={emercolumns}
                  data={emergencyMedList}
                  pagination
                  striped={true}
                  highlightOnHover={true}
                  pointerOnHover={true}
                  paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                />
              </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Type of Food</h1>
                <div className='w-[18rem]'>
                    <Textarea
                    value={food}
                    onChange={e => setFood(e.target.value)}
                    placeholder={`Clear liquid diet, Full liquid diet , Low fat/low cholesterol diet  `}
                    clearOnEscape
                    />
                </div>
                <div className='ml-[30%] mt-[5%]'>
                <Button shape={SHAPE.pill} onClick={(e)=>{setIsOpen1(true)}}>
            Diet Plans
          </Button>
                </div>
            </li>
          </div>
          </div>
        </ul>
        <div className='mb-[10%] pb-[10%] flex justify-center'>
          <Button
            // endEnhancer={<Icon icon="icon-park:logout"/>}
            shape={SHAPE.pill}
            isLoading={load}
            onClick={SendData}
            >
            Patient Exit
          </Button>
        </div>
    </>
  )
}

// console.log({generalCheckupInfo:checkupInfo, TestsName:testName, ReportDescription:testDesc,  observation:observation, ReportContent:file, finalFindings:finaldiagnose, findings:finding,  medications:MedList, emergencyMedications:emergencyMedList})