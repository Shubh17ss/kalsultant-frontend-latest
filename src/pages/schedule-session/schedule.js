import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners';
import './schedule.css'

//importing vector icons
import { FaUser } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";
import { PersonalDetails } from './components/personalDetails';
import { BirthDetails } from './components/birthDetails';
import { Slotselection } from './components/slotselection';
import { Review } from './components/review';
import { useFormContext } from '../../context/formContext';

export const Schedule = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const { firstName, lastName, email, contactNumber, dob, tob, pob, date, slot, slotChoice, gender } = useFormContext();
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    const navigate = useNavigate();

    const handleNext = async () => {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (index === 0) {
            if (firstName.length === 0) {
                toast.error('Please mention first name');
                return;
            }
            else if (lastName.length === 0) {
                toast.error('Please mention last name');
                return;
            }
            else if (emailRegex.test(email) === false) {
                toast.error('Email not correct');
                return;
            }
            else if (contactNumber.length < 13) {
                toast.error('Contact number not valid');
                return;
            }
        }
        else if (index === 1) {
            if (dob.length < 10) {
                toast.error('Date of birth incorrect');
                return;
            }
            else if (tob.length < 10) {
                toast.error('Time of birth incorrect');
                return;
            }
            else if (pob.length === 0) {
                toast.error('Please mention place of birth');
                return;
            }
            else if (gender.length === 0) {
                toast.error('Please select a gender');
                return;
            }
        }
        else if (index === 2) {
            //check for session date and slot selection
            if (date.length === 0) {
                toast.error('Please select date for session');
                return;
            }
            if (slot.length === 0 && slotChoice.length === 0) {
                toast.error('Please select a slot or propose a time');
                return;
            }
        }
        else if (index === 3) {
            setLoading(true);
            let body = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contactNumber: contactNumber,
                gender: gender,
                dob: dob,
                tob: tob,
                pob: pob,
                date: date,
                slot: slot,
                proposed_slot: slotChoice
            }
            if (slot.length === 0) {
                let response = await fetch(process.env.REACT_APP_ENV_URL + '/api/session/storeProposedSession', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },

                });
                if (response.status === 200) {
                    setLoading(false);
                    let res = await response.json();
                    toast.success('Thank you for showing interest, we will surely get back.');
                    setTimeout(() => {
                        navigate(`/`);
                    }, 200)
                    return;
                }
                else {
                    setLoading(false);
                    let res = await response.json();
                    if (res.code === '23505') {
                        toast.error('Oops something went wrong');
                    }
                    else {
                        toast.error('Oops something went wrong');
                    }
                    return;
                }
            }
            else if (slot.length != 0) {
                let response = await fetch(process.env.REACT_APP_ENV_URL + '/api/session/createSession', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },

                });
                if (response.status === 200) {
                    setLoading(false);
                    let res = await response.json();
                    toast.success('Your session has been scheduled...!');
                    setTimeout(() => {
                        navigate(`/schedule-session/session/${res.sessionId}`)
                    }, 200)
                    return;
                }
                else {
                    setLoading(false);
                    let res = await response.json();
                    if (res.code === '23505') {
                        toast.error('Someone just booked this slot, please try a different one.');
                    }
                    else {
                        toast.error('Oops something went wrong');
                    }
                    return;
                }
            }
        }
        let newIndex = index + 1;
        setIndex(newIndex);
    }
    const setIndexToZero = () => {
        if (index > 0) {
            setIndex(0);
        }
    }
    const setIndexToOne = () => {
        if (index > 1) { setIndex(1); }
    }
    const setIndexToTwo = () => {
        if (index > 2) {
            setIndex(2);
        }
    }
    const setIndexToThree = () => {
        if (index > 3) {
            setIndex(3);
        }
    }

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', height: 'fitContent', textAlign: 'center' }}>
            <Navbar />
            <div className='schedule_screen_main'>
                <div className='stepper_header'>
                    <FaUser size={isMobileScreen ? 30 : 22} color={index === 0 ? '#f9f6ee' : 'rgba(255,255,255,0.3)'} style={{ cursor: 'pointer' }} onClick={setIndexToZero} />
                    <span className={index >= 1 ? 'line white' : 'line'}></span>
                    <FaCakeCandles size={isMobileScreen ? 30 : 22} color={index === 1 ? '#f9f6ee' : 'rgba(255,255,255,0.3)'} style={{ cursor: 'pointer' }} onClick={setIndexToOne} />
                    <span className={index >= 2 ? 'line white' : 'line'}></span>
                    <FaClock size={isMobileScreen ? 30 : 22} color={index === 2 ? '#f9f6ee' : 'rgba(255,255,255,0.3)'} style={{ cursor: 'pointer' }} onClick={setIndexToTwo} />
                    <span className={index >= 3 ? 'line white' : 'line'}></span>
                    <MdRateReview size={isMobileScreen ? 32 : 24} color={index === 3 ? '#f9f6ee' : 'rgba(255,255,255,0.3)'} style={{ cursor: 'pointer' }} onClick={setIndexToThree} />
                </div>
                <div className='form_area'>
                    {index === 0 ? <PersonalDetails /> : index === 1 ? <BirthDetails /> : index === 2 ? <Slotselection /> : <Review />}
                </div>
                <div className='button_area'>
                    <button onClick={handleNext} disabled={loading}>
                        {loading ? <ClipLoader color='#fff' size={20} speedMultiplier={0.8} /> : <h3>{index === 0 ? 'Birth details' : index === 1 ? 'Choose Slot' : index === 2 ? 'Review' : 'Register'} </h3>}
                        {index === 3 ? '' : <MdArrowRightAlt style={{ marginTop: isMobileScreen ? '0' : '0.4rem', marginLeft: '1rem', fontSize: '1.2rem' }} />}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

