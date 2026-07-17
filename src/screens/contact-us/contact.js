import React, { useEffect, useState } from 'react'
import './contact.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { MdArrowRightAlt, MdOutlineEmail, MdOutlineCall } from 'react-icons/md'

/* A winding path of stars climbing to a bright guiding star. Draws itself
   in when the panel's Reveal wrapper gains .revealed — every stroked shape
   uses pathLength="1" so one dashoffset rule animates all of them, and the
   star-nodes ignite afterwards via staggered --d delays. */
const GuideGlyph = () => (
    <svg viewBox="0 0 200 220" className="cosmicGlyphSvg" aria-hidden="true">
        {/* winding journey path */}
        <polyline className="line" pathLength="1" points="26,200 56,172 48,142 84,128 74,98 112,86 130,58" style={{ '--d': '0s' }} />
        {/* halo around the guiding star */}
        <circle className="line" pathLength="1" cx="130" cy="46" r="15" style={{ '--d': '0.9s' }} />
        {/* guiding-star rays */}
        <line className="line spark" pathLength="1" x1="130" y1="22" x2="130" y2="70" style={{ '--d': '1.2s' }} />
        <line className="line spark" pathLength="1" x1="106" y1="46" x2="154" y2="46" style={{ '--d': '1.2s' }} />
        <line className="line spark" pathLength="1" x1="114" y1="30" x2="146" y2="62" style={{ '--d': '1.35s' }} />
        <line className="line spark" pathLength="1" x1="146" y1="30" x2="114" y2="62" style={{ '--d': '1.35s' }} />
        {/* guiding-star core */}
        <circle className="node node--bright" r="5" cx="130" cy="46" style={{ '--d': '1.6s' }} />
        {/* path waypoint stars */}
        <circle className="node" r="3" cx="26" cy="200" style={{ '--d': '1.5s' }} />
        <circle className="node" r="3" cx="56" cy="172" style={{ '--d': '1.6s' }} />
        <circle className="node" r="3" cx="48" cy="142" style={{ '--d': '1.7s' }} />
        <circle className="node" r="3" cx="84" cy="128" style={{ '--d': '1.8s' }} />
        <circle className="node" r="3" cx="74" cy="98" style={{ '--d': '1.9s' }} />
        <circle className="node" r="3" cx="112" cy="86" style={{ '--d': '2s' }} />
        {/* scattered accent stars */}
        <circle className="node" r="2.2" cx="40" cy="70" style={{ '--d': '2.1s' }} />
        <circle className="node" r="2.2" cx="170" cy="120" style={{ '--d': '2.2s' }} />
        <circle className="node" r="2.2" cx="150" cy="182" style={{ '--d': '2.3s' }} />
    </svg>
)

export const Contact = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
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
        const response = await fetch('/api/user/userContactUsForm', {
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
                            <div className="cosmicGlyph"><GuideGlyph /></div>
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
