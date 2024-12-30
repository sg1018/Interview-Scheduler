import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar, DateField, DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { InputLabel, MenuItem, Select } from '@mui/material';
import './interview.css'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
function Interview() {

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [duration,setDuration]=useState(0);
  const [interviewType,setInterviewType]=useState("");
  const [date,setDate]=useState();
  const [loading,setLoading]=useState(false);
  const [uploadProgress,setUploadProgress]=useState(0);
  const [email,setEmail]=useState("");
  const [allEmails,setAllEmails]=useState([]);
  const [error,setError]=useState('');

  const map = new Map();

  map.set('hr', ["hr@gmail.com","ceo@gmail.com"]);
  map.set('tech', ["tech@gmail.com","tech@rediffmail.com"]);
  map.set('personality', ["hr@gmail.com","hr@rediffmail.com"]);
  map.set('intro', ["tech@gmail.com","hr@rediffmail.com"]);


  const addEmail = ()=>{
    setAllEmails([...allEmails,email])
    setEmail("")
  }

  const removeEmail = (index)=>{
    let tempEmails=allEmails;
    tempEmails=tempEmails.slice(0,index).concat(tempEmails.slice(index+1));
    setAllEmails(tempEmails);
  }
  const submitInterviewForm=async (e)=>{
    e.preventDefault();
    if(email.length!=0 && allEmails.length==0){
      alert("Press the add button to add the email to the senders list");
      return;
    }
    if(date==null || allEmails.length==0 || pdfFile==null || duration==0){
      alert("Missing Details")
      return;
    }
    setLoading(true)
    await handleUpload();
    const message = `Hi there, \n Your ${duration} minute meeting with Swaayat Robots on ${date.$d} is Scheduled.\n \n Resume available at ${pdfUrl}`
    for(let i=0;i<allEmails.length;i++)
      makeAPICallToSendEmail(`${duration} min Interview with Swaayat Robots on ${date.$d}`,allEmails[i],message)

      e.target.reset();
      setDuration(0);
      setPdfFile(null)
      setPdfUrl("")
      setInterviewType("")
      setDate()
      setLoading(false);
      setAllEmails([]);
      if(error.length==0) alert("Email sent successfully")
      else 
      alert("Error while sending one or more email/s");
      setError("");
  }

  const makeAPICallToSendEmail=(agenda,email,message)=>{
    const data = {
      service_id: 'service_8vvio0f',
      template_id: 'template_g3vxdvg',
      user_id: 'K4VO328L-_zC0WOAr',
      template_params:{
        "agenda":agenda,
        "email":email,
        "message":message}
    };

    axios.post("https://api.emailjs.com/api/v1.0/email/send",data,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((result)=> {
      console.log(result);
      if(result.status!=200) setError("An Error occurred while sending some or all mails");
    })
    .catch((e)=> setError([...error,email]));

  }


  const handleInterviewTypeChange = (e)=>{
    const typeEmails=map.get(e.target.value);
    setInterviewType(e.target.value);
    setAllEmails(typeEmails);
  }

  const handleDateChange = (newValue)=>{
    setDate(newValue);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleUpload =async () => {
    if (pdfFile) {
      try{
      const pdfRef = storage.ref().child(pdfFile.name);
      const uploadTask=pdfRef.put(pdfFile);
      uploadTask.on('state_changed',(snapshot)=>{
        const progress =Math.round( (snapshot.bytesTransferred / snapshot.totalBytes)*100)
        setUploadProgress(progress);
      })
      await uploadTask;
      const pdfurl=await pdfRef.getDownloadURL();
      console.log(pdfurl)
      setPdfUrl(pdfurl);        
      }
      catch(e){
        alert(e.message);
      }
    }
    else {
      alert("No pdf file present");
    }
  };

  return (
    <div>
    <form onSubmit={submitInterviewForm} className='meetingForm interviewForm' >
      {loading && <div className="loader"></div>}
      <h1 className="formHeading">Schedule an Interview</h1>  
      <InputLabel id="demo-simple-select-label" className='selectLabel'>Duration </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={duration}
        label="Duration"
        className="selectInput"
        required
        onChange={(e)=> setDuration(e.target.value)}
      >
        <MenuItem value={15}>15 mins</MenuItem>
        <MenuItem value={30}>30 mins</MenuItem>
        <MenuItem value={45}>45 mins</MenuItem>
        <MenuItem value={60}>60 mins</MenuItem>
      </Select>
      <InputLabel id="demo-simple-select-label" className='selectLabel'>Type of Interview</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={interviewType}
        label="Duration"
        className="selectInput"
        required
        onChange={handleInterviewTypeChange}
      >
        <MenuItem value={"intro"}>Introductry</MenuItem>
        <MenuItem value={"hr"}>HR</MenuItem>
        <MenuItem value={"tech"}>Technical</MenuItem>
        <MenuItem value={"personality"}>Personality</MenuItem>
      </Select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InputLabel id="demo-simple-select-label" className='selectLabel pickerLabel'>Date and Time of Interview</InputLabel>
        <DemoContainer components={['DatePicker']}>
          <DateTimePicker
            className='picker'
            value={date}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
      <div className="meetingJoiners">
        <div>
        <InputLabel id="demo-simple-select-label" className='selectLabel'>Enter the emails</InputLabel>
        <input
          type="email" 
          name="email" 
          className='selectInput' 
          placeholder='' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
        />
        </div>
        <button type="button" className="addButton" onClick={addEmail}>ADD</button>
      </div>
      <div className="addedEmails">
          {
            allEmails.map((email,index)=>{
              return <span key={index} className='addedEmail'>
                    {email} 
                    <div className="cross" onClick={()=>removeEmail(index)}>X</div> 
                    </span> 
            })
          }
        </div>
    <label className='pdfLabel' for="pdfLabel">
      {
        pdfFile ? pdfFile.name : "Click to Upload Resume"
      }
    </label>
    <input type="file" id='pdfLabel' accept=".pdf" onChange={handleFileChange} />
      <button type="submit" className="submitButton">
      {
        loading ?
        <div className="loader"></div> :
        <><img src='/email.png'/>
        Send</>
      }
      </button>
    </form>
    </div>
  )
}

export default Interview