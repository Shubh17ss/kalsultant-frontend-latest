import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './footer.css'

export const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const isMobileScreen = window.innerWidth <= 1000 ? true : false;
  const navigate = useNavigate();
  const copyToClipBoardEmail = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Email copied to clipboard');
    }).catch(() => {
      toast.error('Email could not be copied');
    });
    return;
  }
  const copyToClipBoardContact = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Contact number copied to clipboard');
    }).catch((error) => {
      toast.error('Contact number could not be copied');
    })
  }

  return (
    <div className='footerContainer'>
      <div className='infoSection'>
        <div className='leftSection'>
          <h3>KalSultant</h3>
        </div>
        {isMobileScreen ?
          <div className='rightSection'>
            <div className='row links'>
              <h3 style={{ color: '#fff' }}>Consultation</h3>
              <h3 onClick={() => { navigate('/about-us') }}>About</h3>
              <h3 onClick={() => { navigate('/schedule-session') }}>Session</h3>
            </div>
            <div className='row links'>
              <h3 style={{ color: '#fff' }}>Support</h3>
              <h3 onClick={() => { navigate('/contact-us') }}>Contact</h3>
              <h3 onClick={() => { copyToClipBoardContact("+91-9997301225") }}>+91-9997301225</h3>
              <h3 onClick={() => { copyToClipBoardEmail("contact@kalsultant.com") }}>contact@kalsultant.com</h3>
            </div>
            <div className='row links'>
              <h3 style={{ color: '#fff' }}>Company</h3>
              <h3 onClick={() => { navigate('/terms&Conditions') }}>Terms and Conditions</h3>
              <h3 onClick={() => { navigate('/privacy-policy') }}>Privacy Policy</h3>
              <h3 onClick={() => { navigate('/refund-policy') }}>Refund Policy</h3>
            </div>
          </div>
          :
          <div className='rightSection'>
            <div className='row'>
              <h3 style={{ color: '#fff' }}>Consultation</h3>
              <h3 style={{ color: '#fff' }}>Support</h3>
              <h3 style={{ color: '#fff' }}>Company</h3>
            </div>
            <div className='row links'>
              <h3 onClick={() => { navigate('/about-us') }}>About</h3>
              <h3 onClick={() => { navigate('/contact-us') }}>Contact</h3>
              <h3 onClick={() => { navigate('/terms&Conditions') }}>Terms and Conditions</h3>
            </div>
            <div className='row links'>
              <h3 onClick={() => { navigate('/schedule-session') }}>Session</h3>
              <h3 onClick={() => { copyToClipBoardEmail("contact@kalsultant.com") }}>contact@kalsultant.com</h3>
              <h3 onClick={() => { navigate('/privacy-policy') }}>Privacy Policy</h3>
            </div>
            <div className='row links'>
              <h3></h3>
              <h3 onClick={() => { copyToClipBoardContact("+91-9997301225") }}>+91-9997301225</h3>
              <h3 onClick={() => { navigate('/refund-policy') }}>Refund Policy</h3>
            </div>

          </div>
        }
      </div>
      <div>
        <h3 style={{ fontSize: '1rem', color: '#f9f6ee' }}>KalSultant &#169; {year} All rights reserved </h3>
      </div>
    </div>
  )
}
