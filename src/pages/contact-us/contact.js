import React, { useEffect, useState } from 'react'
import './contact.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export const Contact = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.length === 0) {
            toast.error('Please enter an email');
            return;
        }
        if (message.length === 0) {
            toast.error('Please enter a message');
            return;
        }
        setLoading(true);
        let body = {
            email: email,
            message: message
        }
        const response = await fetch(process.env.REACT_APP_ENV_URL + '/api/user/userContactUsForm', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            setEmail('');
            setMessage('');
            setLoading(false);
            toast.success('Response recorded');
        }
        else {
            setLoading(false);
            toast.error('Something went wrong');
        }
    }

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='contactUsContainer'>
                <div className='box'>
                    <div className='left'>
                        <span>Would love to hear from you</span>
                        <h3>Let's Connect: We are here to help, whether you have a question, comment or feedback for us.</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="email" value={email} placeholder='Email address' onChange={(e) => { setEmail(e.target.value) }}></input>
                            <textarea placeholder='Your message...' style={{ height: '10rem', width: '95%' }} value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                            <button type='submit'>{loading ? <ClipLoader color='#fff' size={18} /> : <h2>Send</h2>}</button>
                        </form>
                    </div>
                    <div className='right'>
                        <div className='textBox'>
                            <span>Ever felt lost in life's journey?</span>
                            <h3>Let the stars guide you</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
