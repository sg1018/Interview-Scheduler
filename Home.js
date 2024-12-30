import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom';
function Home() {
    
    const navigate=useNavigate();

  return (
    <div className='homeContainer'>
        <div className="homeButtons">
            <button className="homeButton" onClick={()=> navigate('/interview')}>
                Schedule an Interview
            </button>
            <button className="homeButton" onClick={() => navigate('/meeting')}>
                Schedule a Meeting
            </button>
        </div>
    </div>
  )
}

export default Home