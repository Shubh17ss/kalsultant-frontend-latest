import React, { useEffect, useRef, useState } from 'react'
import './newsletter.css'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { MdArrowRightAlt, MdCheckCircle } from 'react-icons/md'
import { Reveal } from '../cosmic/Reveal'
import { CosmicSelect } from '../cosmic/CosmicSelect'
import { subscribeNewsletter, verifyNewsletterOtp, resendNewsletterOtp } from '../../utils/queueApi'

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESEND_COOLDOWN = 30 // seconds

export const Newsletter = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sectionRef = useRef(null)
    const [step, setStep] = useState('form') // form | otp | done
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [zodiac, setZodiac] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [doneMessage, setDoneMessage] = useState('')
    const [cooldown, setCooldown] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => () => clearInterval(timerRef.current), [])

    // Pre-fill the sign when the user returns from the "find your sign" page
    // (passed via ?zodiac= query param).
    useEffect(() => {
        const picked = searchParams.get('zodiac')
        if (picked && ZODIAC_SIGNS.includes(picked)) {
            setZodiac(picked)
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // clear the query param so a refresh doesn't re-trigger
            router.replace(pathname)
        }
    }, [searchParams, pathname, router])

    const startCooldown = () => {
        setCooldown(RESEND_COOLDOWN)
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCooldown((c) => {
                if (c <= 1) { clearInterval(timerRef.current); return 0 }
                return c - 1
            })
        }, 1000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name.trim().length === 0) {
            toast.error('Please enter your name')
            return
        }
        if (!EMAIL_REGEX.test(email)) {
            toast.error('Please enter a valid email')
            return
        }
        if (zodiac.length === 0) {
            toast.error('Please select your zodiac sign')
            return
        }
        setLoading(true)
        try {
            const { ok, data } = await subscribeNewsletter(name.trim(), email.trim(), zodiac)
            if (ok) {
                if (data?.alreadySubscribed) {
                    setDoneMessage(data?.message || "You're already signed up — watch the skies.")
                    setStep('done')
                } else {
                    // Nothing is stored until the code is confirmed, so keep the
                    // form values around for the verify + resend calls.
                    setOtp('')
                    setStep('otp')
                    startCooldown()
                }
            } else {
                toast.error(data?.message || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        if (!/^\d{6}$/.test(otp)) {
            toast.error('Enter the 6-digit code')
            return
        }
        setLoading(true)
        try {
            const { ok, data } = await verifyNewsletterOtp(email.trim(), otp.trim())
            if (ok) {
                setDoneMessage(data?.message || 'You are on the list — watch the skies.')
                setName('')
                setZodiac('')
                setOtp('')
                setStep('done')
            } else {
                toast.error(data?.message || 'Incorrect code')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (cooldown > 0) return
        try {
            const { ok, data } = await resendNewsletterOtp(email.trim())
            if (ok) {
                if (data?.alreadySubscribed) {
                    setDoneMessage(data?.message || "You're already signed up — watch the skies.")
                    setStep('done')
                    return
                }
                toast.success(data?.message || 'A new code is on its way.')
                setOtp('')
                startCooldown()
            } else {
                toast.error(data?.message || 'Could not resend the code')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const backToForm = () => {
        clearInterval(timerRef.current)
        setCooldown(0)
        setOtp('')
        setStep('form')
    }

    return (
        <section className="newsletterSection" ref={sectionRef}>
            <div className="newsletterGlow" aria-hidden="true"></div>

            <Reveal className="newsletterReveal">
                <div className="newsletterPanel">
                    {step === 'form' && (
                        <>
                            <div className="cosmicEyebrow">✦ Cosmic dispatch</div>

                            <h2 className="cosmicH2 newsletterTitle">
                                Let the <em className="goldShimmer">stars</em> reach your inbox.
                            </h2>

                            <p className="cosmicSerif newsletterSub">
                                Monthly readings, moon-cycle guidance and horoscopes tuned to your
                                sign — delivered when the timing is right.
                            </p>

                            <form className="newsletterForm" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="newsletterInput newsletterInputFull"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />
                                <div className="newsletterFields">
                                    <input
                                        type="email"
                                        className="newsletterInput"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
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

                                <button type="submit" className="ctaPrimary newsletterSubmit" disabled={loading}>
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
                                onClick={() => router.push('/find-your-sign')}
                            >
                                Not sure of your sign? Find it here
                                <MdArrowRightAlt size={18} />
                            </button>
                        </>
                    )}

                    {step === 'otp' && (
                        <>
                            <div className="cosmicEyebrow">✦ Verify your email</div>

                            <h2 className="cosmicH2 newsletterTitle">Enter your code</h2>

                            <p className="cosmicSerif newsletterSub">
                                We sent a 6-digit code to <em className="goldShimmer">{email}</em>.
                                Enter it below to confirm your subscription.
                            </p>

                            <form className="newsletterForm" onSubmit={handleVerify}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                    className="newsletterInput newsletterInputFull newsletterOtpInput"
                                    placeholder="______"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    autoFocus
                                />
                                <button type="submit" className="ctaPrimary newsletterSubmit" disabled={loading}>
                                    {loading ? (
                                        <ClipLoader color="#1d1305" size={18} />
                                    ) : (
                                        <>
                                            Confirm email <MdArrowRightAlt size={20} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="newsletterFinePrint">
                                Didn't get it? Check spam, or&nbsp;
                                <button type="button" className="nlLinkBtn" onClick={handleResend} disabled={cooldown > 0}>
                                    {cooldown > 0 ? `resend in ${cooldown}s` : 'resend the code'}
                                </button>
                                <br />
                                <button type="button" className="nlLinkBtn" onClick={backToForm}>
                                    use a different email
                                </button>
                            </p>
                        </>
                    )}

                    {step === 'done' && (
                        <>
                            <MdCheckCircle size={46} className="nlSuccessIcon" />

                            <h2 className="cosmicH2 newsletterTitle">You're on the list</h2>

                            <p className="cosmicSerif newsletterSub">{doneMessage}</p>
                        </>
                    )}
                </div>
            </Reveal>
        </section>
    )
}
