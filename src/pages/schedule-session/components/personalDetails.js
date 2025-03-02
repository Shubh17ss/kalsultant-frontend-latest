import React from 'react'
import './components.css'
// importing contact-number input component
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useFormContext } from '../../../context/formContext';

export const PersonalDetails = () => {
  const { firstName, setFirstName, lastName, setLastName, email, setEmail, contactNumber, setContactNumber } = useFormContext();
  const isMobileScreen = window.innerWidth <= 1000 ? true : false;
  return (
    <div className='form_container'>
      <input type="text" placeholder='First Name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
      <input type="text" placeholder='last Name' value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>
      <input type="email" placeholder='Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
      <PhoneInput
        defaultCountry="in"
        value={contactNumber}
        onChange={(phone) => setContactNumber(phone)}
        style={{
          width: isMobileScreen ? "100%" : "45%",
          height: "46px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          padding: "5px",
          marginTop:isMobileScreen?'0.5rem':0
        }}
        inputStyle={{
          height: "46px",
          width: "100%",
          fontSize: "16px",
          paddingLeft: "10px",
          border: "none",
          backgroundColor: "transparent",
          outline: "none",
          color: '#f9f6ee'
        }}
      />
    </div>
  )
}
