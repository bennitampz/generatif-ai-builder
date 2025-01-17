import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import global_api from '/service_api/global_api.js';
import dummy from '@/data/dummy';

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState({});
  useEffect(() => {
    GetResumeInfo(dummy);
  }, [])

  const GetResumeInfo=()=>{
    global_api.GetResumeById(resumeId).then(resp =>{
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section */}
      <FormSection/>
      {/* Preview Section */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
