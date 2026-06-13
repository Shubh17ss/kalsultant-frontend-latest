import React, { useEffect } from 'react'
import './freetier.css'

import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { toast } from 'react-hot-toast';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const Freetier = () => {
    const registerUserFunctionUrl = import.meta.env.REACT_APP_SUPABASE_URL;
    const isMobile = window.innerWidth <= 768; // Simple check for mobile devices
    const [email, setEmail] = React.useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
        const invokeFirebaseFunction = async () => {
            let response = await fetch(import.meta.env.REACT_APP_ENV_URL + '/', {
                method: 'get'
            });
            let res = await response.json();
            console.log(res);
        }
        invokeFirebaseFunction();
    }, [])

    const registerEmail = async () => {
        try {
            if (!email || !email.includes('@') || !email.includes('.')) {
                toast.error('Please enter a valid email');
                return;
            }
            toast.loading('Registering email');
            let response = await fetch(registerUserFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase().trim() }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to register email');
            }
            let body = {
                email: email,
            }
            response = await fetch(import.meta.env.REACT_APP_ENV_URL + '/api/user/recordUserQueryEmail', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            if (response.status !== 200) {
                throw new Error('Failed to record email');
            }
            toast.dismiss();
            toast.success('Email registered successfully');
            setEmail('');
        }
        catch (error) {
            console.log(error);
            toast.dismiss();
            if (error.message.includes('duplicate key value')) {
                toast.error('This email is already registered');
                return;
            }
            else if (error.message.includes('Queue is full')) {
                toast('We are currently at full capacity. Will notify you once a slot is open!');
                return;
            }
            toast.error('Failed to register email. Please try again later.');
        }
    }

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='freetierContainer'>
                <div className='freetierHeroSection'>
                    <strong>Trial Period</strong>
                    <strong style={{ color: '#3a74d2', fontSize: '2rem' }}>First session for free!</strong>
                </div>
                <div className='freeTierUserInputSection'>
                    <input type="text" placeholder="Email Address" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <button>
                        <h3 onClick={registerEmail}>Submit</h3>
                    </button>
                </div>
                <h3 style={{ color: '#f9f6eebe', fontSize: isMobile ? '1rem' : '1.2rem', textAlign: 'center', width: isMobile ? '70%' : '100%' }}>Please join the queue as we can cater to only 5 sessions a day</h3>
            </div>
            <Footer />
        </div>
    )
}

