import React from 'react'
import './components.css';
import { useFormContext } from '../../../context/formContext';

import { SiGooglemeet } from "react-icons/si";

export const Review = () => {
  const { firstName, lastName, email, contactNumber, dob, tob, pob, date, slot, gender } = useFormContext();
  const isMobileScreen = window.innerWidth <= 1000 ? true : false;
  const changeLayout = (slot) => {
    let displaySlot = "";
    let slots = slot.split('-');
    let start = slots[0];
    let hr = start.split(':')[0];
    let min = start.split(':')[1];
    if (Number(hr) > 12) {
      let newStartHour = Number(hr) - 12;
      let newEndHour = newStartHour + 1;
      displaySlot = newStartHour + ':' + min + "-" + newEndHour + ":" + min + " (pm)";
      return displaySlot;
    }
    else if (Number(hr) < 12) {
      displaySlot = slot + " (am)";
      return displaySlot;
    }
    else if (Number(hr) == 12) {
      displaySlot = hr + ":" + min + "-" + "01" +":"+min+" (pm)";
      return displaySlot;
  }
  }

  return (
    <div className='form_container_2'>
      <div className='review_info_container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Name</h4>
          <h4>{firstName} {lastName}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Email</h4>
          <h4>{email}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Contact Number</h4>
          <h4>{contactNumber}</h4>
        </div>
      </div>
      <div className='review_info_container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Birth Date</h4>
          <h4>{dob}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Birth Time</h4>
          <h4>{tob}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Birth Place</h4>
          <h4>{pob}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Gender</h4>
          <h4>{gender}</h4>
        </div>
      </div>
      <div className='review_info_container'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Session Date</h4>
          <h4>{date}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4>Slot</h4>
          <h4>{changeLayout(slot)}</h4>
        </div>
      </div>
      <div className='review_info_container' style={{ backgroundColor: 'transparent' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.3)' }}>Note: This is an online consultation over Google meet</h4>
          {isMobileScreen ? <></> : <SiGooglemeet style={{ marginRight: '1rem', marginTop: '0.2rem' }} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: '0 0.3rem' }}>
          <h4 style={{ textAlign: 'left', color: 'rgba(255,255,255,0.3)' }}>By registering for a session you accept KalSultant's Privacy policy and Terms & Conditions</h4>
        </div>
      </div>
    </div>
  )
}
