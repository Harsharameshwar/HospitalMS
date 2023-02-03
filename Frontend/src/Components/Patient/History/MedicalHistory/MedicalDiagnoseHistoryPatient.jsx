import React from 'react'
import { FormControl } from "baseui/form-control";
import DataTable from 'react-data-table-component';

export default function MedicalDiagnoseHistoryPatient({initial}) {

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
  ]

if(initial!==undefined && initial !=null){

  var consdate = initial?.consultationDate?.split('T');

}


  return (
    <>
      <h1 className='text-2xl font-medium text-center mb-3'>Medical History of {initial.name}</h1>
      <h1 className='text-xl text-center font-medium mb-3 mt-3'>Appointment Cause: {initial.cause}</h1>
        <ul className="list-disc mb-5">
        <div className='flex flex-wrap justify-around'>
          <div>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Consultation Cause:</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.cause}</p>
                </div>
            </li>
          
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>General Checkup Info</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.genCheckInfo}</p>
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Observation</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.observation}</p>
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Tests / Scans</h1>
                <div className='w-[18rem]'>
                    <FormControl label={() => "Test Name:"}>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.scans.testName}</p>
                    </FormControl>
                    <FormControl label={() => "Report Description:"}>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.scans.reportDesc}</p>
                    </FormControl>
                </div>
            </li>
            
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Findings</h1>
                <div className='w-[18rem]'>
                <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.finding}</p>
                </div>
            </li>
          
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Final Diagnosis</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.finaldiagnose}</p>
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Diet plan</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.typeoffood}</p>
                </div>
            </li>
            </div>
            <div>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Prescription</h1>
                    <div className = 'w-[20.5rem] ml-[-2.1rem]'>
                        <DataTable
                        title='Medications Suggested'
                        columns={columns}
                        data={initial.MedList}
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
                <div className = 'w-[20.5rem] ml-[-2.1rem]'>
                    <DataTable
                    title='Emergency Medications'
                    columns={emercolumns}
                    data={initial.emergencyMedList}
                    pagination
                    striped={true}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                    />
                </div>
            </li>
           
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Treated By</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{initial.doctorName}</p>
                </div>
            </li>
            <li>
                <h1 className='text-xl font-medium mb-3 mt-3'>Consultation Date</h1>
                <div className='w-[18rem]'>
                    <p className='text-lg font-small ml-[5%] mb-3 mt-3'>{consdate[0]}</p>
                </div>
            </li>
            
          </div>

          </div>
        </ul>
    </>
  )
}
