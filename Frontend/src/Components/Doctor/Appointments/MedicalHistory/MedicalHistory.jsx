import React, { useEffect, useState } from 'react'
import classes from '../../../../UI/Crums.module.css';
import Crums from '../../../../UI/Crums';     
//worker  
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
//default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//full screen plugin
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import MedicalDiagnoseHistory from './MedicalDiagnoseHistory';
import { ButtonGroup } from "baseui/button-group";
import { Button } from "baseui/button";
import { SkipBack, SkipForward } from 'react-feather';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function MedicalHistory() {

  const {state}=useLocation();

  const {id} = state
  // console.log(state)



  let crum = ['Home','Appointments', `${state.pg}` ,'Medical History'];
  const [file, setfile] = useState({path:'',file:''})
  const [series, setSeries] = useState(0)
  var initial1 ={
    name: '...',
    cause: '...',
    genCheckInfo: 'Blood Pressure/BP: 80/120,\nTemperature/Temp: 98°F,\nWeigth: 80kg,\nOxygen/SPO2: 99%,\nPulse Rate/PR: 72/min',
    observation: 'Bleeding: None,\nLeft Arm Pain',
    scans: { testName:'ECG', reportDesc: 'Supraventricular tachycardia of 200 beats per minute caused by an AV nodal re-entry.'},
    finding: 'Shortness of breath with activity or when lying down.',
    finaldiagnose: "This is atrial flutter. The atria contract at 300 beats per minute causing a ‘seesaw’ baseline. Beats are transmitted with a 2:1, 3:1 or 4:1 block, leading to ventricular rates of 150, 100 and 75 BPM respectively.",
    MedList: [ { "med": "Nitroglycerin", "morn": "1", "anoon": "1", "nyt": "1", "nod": "1", }, { "med": "Statins", "morn": "1", "anoon": "1", "nyt": "1", "nod": "1", } ],
    emergencyMedList: [ { "med": "Aspirin", "qty": "4", }, { "med": "Morphine", "qty": "45", } ],
    consultationDate: '2022-12-01T00:00:00.00+00:00',
    appointmentDate: '2022-12-01T00:00:00.00+00:00',
    doctorName: 'Raju',
    maxLen: 3
}

  const[initial,setInitial]=useState(initial1)
  const path=process.env.REACT_APP_PATH;
  const [err,setErr]=useState(false)


  useEffect( ()=>{
  async function get(){
    var res
    try{
       res=await axios.get(`${path}history/patient/particularmedicalhistory/${id}/${series}`)
      // console.log(res.data)
      if(res.data!==undefined || res.data !=null){
        var obj= {
          name: res.data.docs.Patient.name,
          cause: res.data.docs.purposeOfVisit,
          genCheckInfo: res.data.docs.generalCheckupInfo,
          observation: res.data.docs.observation,
          scans: { testName:res.data.docs.TestsName, reportDesc: res.data.docs.ReportDescription},
          finding: res.data.docs.findings,
          finaldiagnose: res.data.docs.finalFindings,
          MedList: res.data.docs.medications,
          emergencyMedList: res.data.docs.emergencyMedications,
          consultationDate: res.data.docs.appointmentDate,
          appointmentDate: res.data.docs.appointmentDate,
          doctorName: res.data.docs.Doctor.name,
          typeoffood:res.data.docs.typeoffood,
          maxLen: res.data.length-1
        }
      }
      await res.data.docs?.ReportContent?.file && getdat(res.data.docs.ReportContent.file)
      obj && setInitial(obj)
    }
    catch(err){
      if(err.response.status===401){
        setErr(true)
      }
    }
  }
  get()

  },[path,series,id])

      async function getdat(fileUrl){
      var x = fileUrl
      setfile({path: 'Hello', file: x})
    }


  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const getFilePluginInstance = getFilePlugin('Hello.jsx');

  return (
    <>
    <div className={`${classes.crum} mt-3 pt-1 mb-4`} >
      <Crums crum={crum}/>
    </div>{
    (err)?(<div className='flex text-center'><p className='mx-auto my-[10%]'><b>No History</b></p></div>):(<>
    <ButtonGroup overrides={{ Root: { style: ({ $theme }) => ({ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto',}) } }}>
      <Button startEnhancer={<SkipBack/>} onClick={()=> series > 0 && setSeries(p=>p-1)}>Previous</Button>
      <p className='text-center text-xl underline mt-3'>{series+1} / {initial.maxLen+1}</p>
      {initial && <Button endEnhancer={<SkipForward/>} onClick={()=>series < initial.maxLen && setSeries(p=>p+1)}>Next</Button>}
    </ButtonGroup>
    {initial && <MedicalDiagnoseHistory initial={initial} />}
    {file.file !=='' && file.file !==null ?
    <div className='mt-5 w-[90%] h-[190%]'>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
        <Viewer 
          plugins={[defaultLayoutPluginInstance, fullScreenPluginInstance, getFilePluginInstance]}
          fileUrl={file.file}
        />
      </Worker>
    </div>: <p className='text-center underline mb-5 pb-5'>No file to display</p>}
    </>)}
    </>
  )
}
