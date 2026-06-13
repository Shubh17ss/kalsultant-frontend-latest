import React, { useEffect, useRef, useState } from 'react'
import './newsletter.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { MdArrowRightAlt } from 'react-icons/md'
import { Reveal } from '../cosmic/Reveal'
import { CosmicSelect } from '../cosmic/CosmicSelect'

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

export const Newsletter = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const sectionRef = useRef(null)
    const [email, setEmail] = useState('')
    const [zodiac, setZodiac] = useState('')
    const [loading, setLoading] = useState(false)

    // Pre-fill the sign when the user returns from the "find your sign" page.
    useEffect(() => {
        const picked = location.state?.zodiac
        if (picked && ZODIAC_SIGNS.includes(picked)) {
            setZodiac(picked)
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // clear the routing state so a refresh doesn't re-trigger
            navigate(location.pathname, { replace: true, state: {} })
        }
    }, [location, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email')
            return
        }
        if (zodiac.length === 0) {
            toast.error('Please select your zodiac sign')
            return
        }
        setLoading(true)
        try {
            const response = await fetch(import.meta.env.REACT_APP_ENV_URL + '/api/user/newsletterSignup', {
                method: 'POST',
                body: JSON.stringify({ email, zodiac }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.status === 200) {
                setEmail('')
                setZodiac('')
                toast.success('You are on the list — watch the skies')
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="newsletterSection" ref={sectionRef}>
            <div className="newsletterGlow" aria-hidden="true"></div>

            <Reveal className="newsletterReveal">
                <div className="newsletterPanel">
                    <div className="cosmicEyebrow">✦ Cosmic dispatch</div>

                    <h2 className="cosmicH2 newsletterTitle">
                        Let the <em className="goldShimmer">stars</em> reach your inbox.
                    </h2>

                    <p className="cosmicSerif newsletterSub">
                        Monthly readings, moon-cycle guidance and horoscopes tuned to your
                        sign — delivered when the timing is right.
                    </p>

                    <form className="newsletterForm" onSubmit={handleSubmit}>
                        <div className="newsletterFields">
                            <input
                                type="email"
                                className="newsletterInput"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="newsletterSelectWrap">
                                <CosmicSelect
                                    value={zodiac}
                                    onChange={setZodiac}
                                    placeholder="Zodiac sign"
                                    ariaLabel="Zodiac sign"
                                    shape="pill"
                                    height={54}
                                    options={ZODIAC_SIGNS.map((sign) => ({ value: sign, label: sign }))}
                                />
                            </div>
                        </div>

                        <button type="submit" className="ctaPrimary newsletterSubmit">
                            {loading ? (
                                <ClipLoader color="#1d1305" size={18} />
                            ) : (
                                <>
                                    Subscribe <MdArrowRightAlt size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="newsletterFindLink"
                        onClick={() => navigate('/find-your-sign')}
                    >
                        Not sure of your sign? Find it here
                        <MdArrowRightAlt size={18} />
                    </button>
                </div>
            </Reveal>
        </section>
    )
}
