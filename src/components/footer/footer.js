import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import './footer.css'

export const Footer = () => {
  const [year] = useState(new Date().getFullYear())
  const router = useRouter();
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
    }).catch(() => {
      toast.error('Contact number could not be copied');
    })
  }

  return (
    <div className='footerContainer'>
      <div className='infoSection'>
        <div className='leftSection'>
          <h3>KalSultant</h3>
        </div>
        <div className='rightSection'>
          <div className='footerColumn'>
            <h4>Consultation</h4>
            <span onClick={() => { router.push('/about-us') }}>About</span>
            <span onClick={() => { router.push('/join-queue') }}>Join queue</span>
            <span onClick={() => { router.push('/vaastu') }}>Vaastu</span>
          </div>
          <div className='footerColumn'>
            <h4>Support</h4>
            <span onClick={() => { router.push('/contact-us') }}>Contact</span>
            <span onClick={() => { copyToClipBoardContact("+91-9997301225") }}>+91-9997301225</span>
            <span onClick={() => { copyToClipBoardEmail("contact@kalsultant.com") }}>contact@kalsultant.com</span>
          </div>
          <div className='footerColumn'>
            <h4>Company</h4>
            <span onClick={() => { router.push('/terms-and-conditions') }}>Terms and Conditions</span>
            <span onClick={() => { router.push('/privacy-policy') }}>Privacy Policy</span>
            <span onClick={() => { router.push('/refund-policy') }}>Refund Policy</span>
          </div>
        </div>
      </div>
      <div className='footerBottom'>
        <span>KalSultant &#169; {year} All rights reserved</span>
      </div>
    </div>
  )
}
