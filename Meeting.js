import React, { useState } from 'react'
import './meeting.css'
import axios from 'axios';

function Meeting() {

    const [allEmails,setAllEmails]=useState([]);
    const [email,setEmail]=useState("");
    const [agenda,setAgenda]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();

    const removeEmail = (index)=>{
      let tempEmails=allEmails;
      tempEmails=tempEmails.slice(0,index).concat(tempEmails.slice(index+1));
      setAllEmails(tempEmails);
    }

    const addEmail = (e)=>{
      const temp=allEmails;
      temp.push(email);
      setAllEmails(temp);
      setEmail("");
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

    const submitMeetingForm =async (e) => {
      e.preventDefault();
      const message = " The Meeting is scheduled at the follwing google meet link https://meet.google.com/lskjdfl";
      if(allEmails.length!=0)
      for(let i=0;i<allEmails.length;i++)
        makeAPICallToSendEmail(agenda,allEmails[i],message);
      else alert("Please specify at least one email")
      
      if(error && error.length!=0)
      {
        alert(error);
        setError("");
      }
      e.target.reset();
      };

  return (
    <div className='meetingContainer'>
    <form onSubmit={submitMeetingForm} className='meetingForm' >
      <label>Meeting Agenda</label>
      <input 
        type="text" 
        name="agenda" 
        required
        className='formInput' 
        placeholder='Enter Meeting Agenda' 
        value={agenda} 
        onChange={(e)=>setAgenda(e.target.value)}  
      />
      <label>Meeting Joiners</label>
      <div className="meetingJoiners">
        <input
          type="email" 
          name="email" 
          className='formInput' 
          placeholder='Enter an Email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button className="addButton" onClick={addEmail}>ADD</button>
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
        
      </div>
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

export default Meeting