import React from 'react'
import './heroSection.css'
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate=useNavigate();
  const isMobileScreen=window.innerWidth<=1000?true:false;
  return (
    <div className='heroSectionContainer'>
      <span>The destiny written in stars, awaits your revelation.</span>
      <h3>"KalSultant charts your path through the Cosmos"</h3>
      <button className='mainButton' onClick={()=>{navigate('schedule-session')}}>
        <h3>Schedule a session</h3>
        <MdArrowRightAlt size={24} style={{marginTop:isMobileScreen?'0':'0.5rem', marginLeft:isMobileScreen?'0':'1rem'}}/>
      </button>
    </div>
  )
}
