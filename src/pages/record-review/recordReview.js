import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './recordReview.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners';


export const RecordReview = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    const handleTextChange = (val) => {
        if (val.length > 200) return;
        setText(val);
        setLength(val.length);
    }
    const handleFeedbackSubmit = async () => {
        let nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (name.length === 0) {
            toast.error('Please enter your name');
            return;
        }
        if (nameRegex.test(name.trim()) === false || name.length > 25) {
            toast.error('Name length too long or format not accepted');
            return;
        }
        if (email.length === 0) {
            toast.error('Please enter your email');
            return;
        }
        if (emailRegex.test(email.trim()) === false) {
            toast.error('Email not correct');
            return;
        }
        if (text.length === 0) {
            toast.error('Please write a review');
            return;
        }
        // after all checks for inputs are cleared
        setLoading(true);
        try {
            let body = {
                name: name,
                email: email,
                text: text
            }
            let response = await fetch(process.env.REACT_APP_ENV_URL + '/api/user/storeReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (response.status === 200) {
                setLoading(false);
                toast.success('Thank you for the feedback');
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            }
            else {
                setLoading(false);
                throw new Error("Something went wrong..please try again later");
            }
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }
    }

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='feedbackContainer'>
                <h1 style={{ width: isMobileScreen ? '90%' : '30%', textAlign: 'left'}}>
                    Help Us Get Better
                </h1>
                <div className='feedbackFormContainer'>
                    <input type="text" placeholder='Your Name' value={name} onChange={(e) => { setName(e.target.value) }} style={{marginBottom:'0'}}/>
                    <h5 style={{color:'rgba(255,255,255,0.5)'}}>Identity will be hidden</h5>
                    <input type="email" placeholder='Your Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <textarea type="text" placeholder='Please share your feedback...' style={{ paddingTop: '1rem' }} value={text} onChange={(e) => { handleTextChange(e.target.value) }}></textarea>
                    <h5>({length}/200)</h5>
                    <button onClick={handleFeedbackSubmit}>
                        {loading ?
                            <ClipLoader color='#fff' size={20} speedMultiplier={0.8} />
                            :
                            <h3>Submit</h3>
                        }
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
