import React, { useEffect } from 'react'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { FaCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './pricing.css'

export const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const navigate = useNavigate();
  return (
    <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
      <Navbar />
      <div className='pricingContainer'>
        <span>One plan fits every zodiac sign</span>
        <h3>Universal Insights, One Simple Plan – Discover Your Destiny Today!</h3>
        <div className='infoContainer'>
          <div className='priceTextContainer'>
            <h3>₹1100</h3>
            <h2>/session</h2>
          </div>
          <h3 className='buttonText' onClick={() => { navigate('/schedule-session') }}>
            Schedule now
          </h3>
          <div className='line'></div>
          <div className='featuresContainer'>
            <h3><FaCircle size={8} style={{ marginRight: '0.5rem', marginBottom: '0.1rem' }} />One-hour session</h3>
            <h3><FaCircle size={8} style={{ marginRight: '0.5rem', marginBottom: '0.1rem' }} />Upto 4 birth charts analysis</h3>
            <h3><FaCircle size={8} style={{ marginRight: '0.5rem', marginBottom: '0.1rem' }} />Pay post session </h3>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
