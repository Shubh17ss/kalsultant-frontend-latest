import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../../../components/navbar/navbar';
import { Footer } from '../../../components/footer/footer';
import success_logo from '../../../assets/images/success_icon.png'


export const SuccessPage = () => {
    const { sessionId } = useParams();
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');
    const [email, setEmail] = useState('');

    const changeLayout = (slot) => {
        console.log(slot);
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

    useEffect(() => {
        const getSessionDetails = async () => {
            let body = {
                sessionId: sessionId
            }
            const response = await fetch(process.env.REACT_APP_ENV_URL+'/api/session/getSession', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                let res = await response.json();
                console.log(res.data);
                setDate(res.data[0].session_date);
                setSlot(changeLayout(res.data[0].session_slot));
                setEmail(res.data[0].email);
            }
            else {
                console.log(response);
            }

        }
        getSessionDetails();
    })
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='schedule_screen_main'>
                <div className='information_card'>
                    <img src={success_logo} style={{ width: '42px', height: '42px' }} />
                    <h3>Session Scheduled</h3>
                    <div className='row'>
                        <h4>id</h4>
                        <h4>{sessionId}</h4>
                    </div>
                    <div className='row'>
                        <h4>Link sent to</h4>
                        <h4>{email}</h4>
                    </div>
                    <div className='row'>
                        <h4>Date</h4>
                        <h4>{date}</h4>
                    </div>
                    <div className='row'>
                        <h4>Slot</h4>
                        <h4>{slot}</h4>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
