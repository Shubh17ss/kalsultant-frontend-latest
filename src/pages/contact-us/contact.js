import React, { useEffect, useState } from 'react'
import './contact.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { MdArrowRightAlt, MdOutlineEmail, MdOutlineCall } from 'react-icons/md'

export const Contact = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        // warm up the backend so the form submit is fast
        const invokeFirebaseFunction = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_ENV_URL + '/', {
                    method: 'get',
                })
                await response.json()
            } catch (error) {
                // warm-up is best-effort only
            }
        }
        invokeFirebaseFunction()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email.length === 0) {
            toast.error('Please enter an email')
            return
        }
        if (message.length === 0) {
            toast.error('Please enter a message')
            return
        }
        setLoading(true)
        let body = {
            email: email,
            message: message,
        }
        const response = await fetch(process.env.REACT_APP_ENV_URL + '/api/user/userContactUsForm', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            setEmail('')
            setMessage('')
            setLoading(false)
            toast.success('Response recorded')
        } else {
            setLoading(false)
            toast.error('Something went wrong')
        }
    }

    const copyToClipboard = (text, label) => {
        navigator.clipboard
            .writeText(text)
            .then(() => toast.success(`${label} copied to clipboard`))
            .catch(() => toast.error(`${label} could not be copied`))
    }

    return (
        <div className="contactPage">
            <Navbar />

            <section className="contactHero">
                <Reveal>
                    <div className="cosmicEyebrow">✦ Contact</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h1 className="cosmicH2 contactTitle">
                        The sky listens. <em className="goldShimmer">So do we.</em>
                    </h1>
                </Reveal>
                <Reveal delay={0.22}>
                    <p className="cosmicSerif contactSub">
                        A question, a comment, or feedback — write to us and a human
                        replies.
                    </p>
                </Reveal>
            </section>

            <section className="contactSection">
                <Reveal delay={0.1} className="contactPanelWrap">
                    <div className="contactPanel">
                        <div className="contactFormSide">
                            <h2 className="contactFormTitle">Send a message</h2>
                            <p className="contactFormLead">
                                We are here to help, whether you have a question, comment or
                                feedback for us.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <textarea
                                    placeholder="Your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <button type="submit" className="ctaPrimary contactSubmit">
                                    {loading ? (
                                        <ClipLoader color="#1d1305" size={18} />
                                    ) : (
                                        <>
                                            Send message <MdArrowRightAlt size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="contactImageSide">
                            <div className="contactImageVeil">
                                <span className="contactImageTag">
                                    Ever felt lost in life's journey?
                                </span>
                                <span className="contactImageTitle">
                                    Let the stars guide you
                                </span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.22}>
                    <div className="contactChips">
                        <button
                            className="contactChip"
                            onClick={() => copyToClipboard('contact@kalsultant.com', 'Email')}
                        >
                            <MdOutlineEmail size={16} /> contact@kalsultant.com
                        </button>
                        <button
                            className="contactChip"
                            onClick={() => copyToClipboard('+91-9997301225', 'Contact number')}
                        >
                            <MdOutlineCall size={16} /> +91-9997301225
                        </button>
                    </div>
                </Reveal>
            </section>

            <Footer />
        </div>
    )
}
