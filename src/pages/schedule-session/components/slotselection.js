import React, { useState, useEffect } from 'react'
import './components.css'
import { useFormContext } from '../../../context/formContext'
import { toast } from 'react-hot-toast'


const formatDateValue = (date) => {
    return date.toLocaleDateString("en-GB").split("/").join("/"); // Formats as dd/mm/yyyy
};
const formatDateDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }); // Formats as Month Day, Year
};

export const Slotselection = () => {

    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const { date, setDate, slot, setSlot, slotChoice, setSlotChoice } = useFormContext();
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    useEffect(() => {
        const tempDates = [];
        const today = new Date();
        for (let i = 2; i <= 8; i++) {
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + i);
            tempDates.push({
                value: formatDateValue(futureDate),
                label: formatDateDisplay(futureDate)
            });
            setDates(tempDates);
        }
        const setSlotsFunction = async () => {
            setSlot('');
            let body = {
                date: date
            };
            const response = await fetch(process.env.REACT_APP_ENV_URL + '/api/slots/getslots', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body),
            });
            let res = await response.json();
            setSlots(res.results);
        }
        setSlotsFunction();
    }, []);

    const changeSessionDate = async (date_temp) => {
        setDate(date_temp);
        setSlot('');
        setSlotChoice('');
        setSlots([]);
        let body = {
            date: date_temp
        };
        const response = await fetch(process.env.REACT_APP_ENV_URL + '/api/slots/getslots', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
        });
        let res = await response.json();
        if (res.results.length === 0) {
            toast.error('No slots available for this day');
        }
        else {
            setSlots(res.results);
        }
    }

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
            displaySlot = hr + ":" + min + "-" + "01" + ":" + min + " (pm)";
            return displaySlot;
        }
    }

    return (
        <div className='form_container_2'>
            <select className='date_selector' value={date} onChange={(e) => { changeSessionDate(e.target.value) }}>
                <option>Choose date</option>
                {dates.map((date) => (
                    <option value={date.value} key={date.value}>{date.label}</option>
                ))}
            </select>
            {
                slots.length === 0 ?
                    <input
                        style={{ width: isMobileScreen ? "96%" : "98%" }}
                        type="text" placeholder='Propose a time HH:MM' value={slotChoice} onChange={(e) => { setSlotChoice(e.target.value) }}></input>
                    :
                    <select className='date_selector' value={slot} onChange={(e) => { setSlot(e.target.value) }}>
                        <option>Choose slot</option>
                        {slots.map((slot, index) => (
                            <option value={slot.slot} key={index}>{changeLayout(slot.slot)}</option>
                        ))}
                    </select>
            }
            <h4 style={{ fontSize: '12px', color: 'crimson', margin: 0 }}>*Date and time are in IST*</h4>
        </div>
    )
}
