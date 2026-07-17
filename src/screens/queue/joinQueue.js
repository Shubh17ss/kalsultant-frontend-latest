import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { MdArrowRightAlt, MdCheckCircle } from 'react-icons/md'
import { joinQueue, verifyOtp, resendOtp } from '../../utils/queueApi'
import './joinQueue.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESEND_COOLDOWN = 30 // seconds

export const JoinQueue = () => {
    const router = useRouter()
    const [step, setStep] = useState('form') // form | otp | done
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = useState(null)
    const [cooldown, setCooldown] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        return () => clearInterval(timerRef.current)
    }, [])

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

    const handleJoin = async (e) => {
        e.preventDefault()
        if (!EMAIL_REGEX.test(email)) {
            toast.error('Please enter a valid email')
            return
        }
        setLoading(true)
        try {
            const { ok, data } = await joinQueue(email.trim(), name.trim())
            if (ok) {
                if (data.alreadyInQueue) {
                    toast.success("You're already in the queue.")
                    setStep('done')
                } else {
                    setStep('otp')
                    startCooldown()
                }
            } else {
                toast.error(data.message || 'Something went wrong')
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.')
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
            const { ok, data } = await verifyOtp(email.trim(), otp.trim())
            if (ok) {
                setPosition(data.position ?? null)
                setStep('done')
            } else {
                toast.error(data.message || 'Incorrect code')
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (cooldown > 0) return
        try {
            const { ok, data } = await resendOtp(email.trim())
            if (ok) {
                toast.success(data.message || 'A new code is on its way.')
                setOtp('')
                startCooldown()
            } else {
                toast.error(data.message || 'Could not resend the code')
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="joinQueuePage">
            <Navbar />
            <section className="joinQueueHero">
                <div className="joinQueueGlow" aria-hidden="true"></div>

                {step === 'form' && (
                    <Reveal className="joinQueueReveal">
                        <div className="joinQueuePanel">
                            <div className="cosmicEyebrow">✦ Join the queue</div>
                            <h1 className="cosmicH2 joinQueueTitle">
                                The stars keep their own <em className="goldShimmer">timing.</em>
                            </h1>
                            <p className="cosmicSerif joinQueueSub">
                                We take a limited number of consultations each week. Join the queue with
                                your email — when your turn arrives, we'll invite you to pick a slot for
                                the coming week and confirm it with payment.
                            </p>

                            <form className="joinQueueForm" onSubmit={handleJoin}>
                                <input
                                    type="text"
                                    className="joinQueueInput"
                                    placeholder="Your name (optional)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    className="joinQueueInput"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit" className="ctaPrimary joinQueueSubmit" disabled={loading}>
                                    {loading ? <ClipLoader color="#1d1305" size={18} /> : (<>Join the queue <MdArrowRightAlt size={20} /></>)}
                                </button>
                            </form>

                            <p className="joinQueueFinePrint">
                                We'll only email you about your place in the queue and your session.
                                No spam, ever.
                            </p>
                        </div>
                    </Reveal>
                )}

                {step === 'otp' && (
                    <Reveal className="joinQueueReveal">
                        <div className="joinQueuePanel">
                            <div className="cosmicEyebrow">✦ Verify your email</div>
                            <h1 className="cosmicH2 joinQueueTitle">Enter your code</h1>
                            <p className="cosmicSerif joinQueueSub">
                                We sent a 6-digit code to <em className="goldShimmer">{email}</em>.
                                Enter it below to secure your place in the queue.
                            </p>

                            <form className="joinQueueForm" onSubmit={handleVerify}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                    className="joinQueueInput otpInput"
                                    placeholder="______"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    autoFocus
                                />
                                <button type="submit" className="ctaPrimary joinQueueSubmit" disabled={loading}>
                                    {loading ? <ClipLoader color="#1d1305" size={18} /> : (<>Confirm email <MdArrowRightAlt size={20} /></>)}
                                </button>
                            </form>

                            <p className="joinQueueFinePrint">
                                Didn't get it? Check spam, or&nbsp;
                                <button className="jqLinkBtn" onClick={handleResend} disabled={cooldown > 0}>
                                    {cooldown > 0 ? `resend in ${cooldown}s` : 'resend the code'}
                                </button>
                                <br />
                                <button className="jqLinkBtn" onClick={() => setStep('form')}>use a different email</button>
                            </p>
                        </div>
                    </Reveal>
                )}

                {step === 'done' && (
                    <Reveal className="joinQueueReveal">
                        <div className="joinQueuePanel joinQueueSuccess">
                            <MdCheckCircle size={46} className="jqSuccessIcon" />
                            <h1 className="cosmicH2 joinQueueTitle">You're in the queue</h1>
                            <p className="cosmicSerif joinQueueSub">
                                Your email is confirmed{position ? (<>, and you're currently <em className="goldShimmer">#{position}</em> in line</>) : ''}.
                                Sit tight — we'll email you an invitation to choose a slot when your turn comes.
                            </p>
                            <button className="ctaPrimary joinQueueSubmit" onClick={() => router.push('/')}>
                                Back to home
                            </button>
                        </div>
                    </Reveal>
                )}
            </section>
            <Footer />
        </div>
    )
}
