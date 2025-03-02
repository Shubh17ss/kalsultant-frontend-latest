import React from 'react'
import './components.css'
import { useFormContext } from '../../../context/formContext';

export const BirthDetails = () => {
    const { dob, setDob, tob, setTob, pob, setPob, gender, setGender } = useFormContext();

    const handleDateChange = (e) => {
        let temp = e.target.value;
        //checking for deletion of characters
        if (temp.length < dob.length) {
            if (temp.length === 2) {
                temp = temp.substring(0, 1);
            }
            else if (temp.length === 5) {
                temp = temp.substring(0, 4);
            }
            setDob(temp);
            return;
        }
        // check for character input
        const regex = /^[0-9]+$/;
        if (regex.test(temp.charAt(temp.length - 1)) === false) {
            return;
        }
        if (temp.length === 2) {
            let val = Number(temp);
            if (val > 31) {
                temp = temp.substring(0, 1);
                setDob(temp);
                return;
            }
            //above check is if date entered exceeds 31
            temp = temp + '/';
        }
        if (temp.length === 5) {
            let dateNumber = Number(temp.substring(0, 2));
            let monthNumber = Number(temp.substring(3, 5));
            if ((dateNumber >= 30 && monthNumber === 2) || monthNumber > 12) {
                temp = temp.substring(0, 3);
                setDob(temp);
                return;
            }
            temp = temp + '/';
        }
        if (temp.length > 10) {
            return;
        }
        setDob(temp);
    }
    const handleTimeChange = (e) => {
        let temp = e.target.value;
        if (temp.length > 10) {
            return;
        }
        if (temp.length < tob.length) {
            if (temp.length === 7) {
                temp = temp.substring(0, 4);
            }
            else if (temp.length === 2) {
                temp = temp.substring(0, 1);
            }
            setTob(temp);
            return;
        }
        // check for character input
        const regex = /^[0-9]+$/;
        if (temp.length <= 8) {
            if (regex.test(temp.charAt(temp.length - 1)) === false) {
                return;
            }
        }
        if (temp.length > 8) {
            let regex2 = /^[a m p A M P]+$/
            if (regex2.test(temp.charAt(temp.length - 1)) === false) {
                return;
            }
        }
        if (temp.length === 2) {
            let timeNumber = Number(temp);
            if (timeNumber > 12) {
                return;
            }
            temp = temp + ':';
        }
        if (temp.length === 5) {
            let timeNumber = Number(temp.substring(3, 5));
            if (timeNumber > 59) {
                setTob(temp.substring(0, 3));
                return;
            }
            temp = temp + ' - ';
        }
        if (temp.length === 10) {
            let val = temp.substring(8, 10);
            if (val !== 'AM' && val !== 'PM' && val !== 'am' && val !== 'pm') {
                alert('Please mention AM or PM in birth time');
                return;
            }
            else {
                setTob(temp);
                return;
            }
        }
        setTob(temp);
    }

    return (
        <div className='form_container_2'>
            <input type="text" placeholder='Date of birth (DD/MM/YYYY)' value={dob} onChange={(e) => { handleDateChange(e) }}></input>
            <input type="text" placeholder='Time of birth (HH:MM AM/PM)' value={tob} onChange={(e) => { handleTimeChange(e) }}></input>
            <input type="text" placeholder='Place of birth' value={pob} onChange={(e) => { setPob(e.target.value) }}></input>
            <select className='gender_selector' value={gender} onChange={(e) => { setGender(e.target.value) }}>
                <option value=''>Select gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Prefer not to say'>Prefer not to say</option>
            </select>
        </div>
    )
}
