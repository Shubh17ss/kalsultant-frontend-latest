import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { FaUser } from 'react-icons/fa'
import { FaCakeCandles, FaClock } from 'react-icons/fa6'
import { MdRateReview, MdArrowRightAlt, MdErrorOutline } from 'react-icons/md'

import { PersonalDetails } from '../schedule-session/components/personalDetails'
import { BirthDetails } from '../schedule-session/components/birthDetails'
import { Review } from '../schedule-session/components/review'
import { CosmicSelect } from '../../components/cosmic/CosmicSelect'
import { useFormContext } from '../../context/formContext'
import { getInvite, selectSlot, confirmPayment } from '../../utils/queueApi'

import '../schedule-session/schedule.css'
import '../schedule-session/components/components.css'
import './joinQueue.css'

// Slot picker fed by the admin-defined availability returned with the invite.
const InviteSlotSelection = ({ slots }) => {
    const { date, setDate, slot, setSlot, setSlotChoice } = useFormContext()
    const isMobileScreen = window.innerWidth <= 1000

    const dates = Array.from(new Set(slots.map((s) => s.date)))
    const slotsForDate = slots.filter((s) => s.date === date)

    const changeLayout = (value) => {
        const [start, end] = value.split('-')
        const hr = Number(start.split(':')[0])
        const min = start.split(':')[1]
        if (hr > 12) return `${hr - 12}:${min}-${hr - 11}:${end.split(':')[1]} (pm)`
        if (hr === 12) return `${value} (pm)`
        return `${value} (am)`
    }

    return (
        <div className="form_container_2">
            <CosmicSelect
                className="date_selector"
                value={date}
                onChange={(d) => { setDate(d); setSlot(''); setSlotChoice('') }}
                placeholder="Choose date"
                ariaLabel="Session date"
                height={48}
                options={dates.map((d) => ({ value: d, label: d }))}
            />
            {date === '' ? null : slotsForDate.length === 0 ? (
                <h4 style={{ color: '#f08c8c' }}>No slots left for this day — try another date.</h4>
            ) : (
                <CosmicSelect
                    className="date_selector"
                    value={slot}
                    onChange={setSlot}
                    placeholder="Choose slot"
                    ariaLabel="Session slot"
                    height={48}
                    options={slotsForDate.map((s) => ({ value: s.slot, label: changeLayout(s.slot) }))}
                />
            )}
            <h4 style={{ fontSize: '12px', color: '#f0b85c', margin: 0 }}>*Date and time are in IST*</h4>
        </div>
    )
}

export const InviteLanding = () => {
    const { token } = useParams()
    const router = useRouter()
    const {
        firstName, lastName, email, setEmail, setFirstName, setLastName,
        contactNumber, dob, tob, pob, date, slot, gender,
    } = useFormContext()

    const [pageState, setPageState] = useState('loading') // loading | valid | invalid | expired | booked
    const [invite, setInvite] = useState(null)
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)

    const isMobileScreen = window.innerWidth <= 1000

    useEffect(() => {
        window.scrollTo(0, 0)
        const load = async () => {
            const { ok, status, data } = await getInvite(token)
            if (ok && data.valid) {
                setInvite(data)
                // Prefill from the queue entry.
                if (data.entry?.email) setEmail(data.entry.email)
                if (data.entry?.name) {
                    const parts = data.entry.name.trim().split(' ')
                    setFirstName(parts[0] || '')
                    setLastName(parts.slice(1).join(' ') || '')
                }
                setPageState('valid')
            } else if (status === 410) {
                setPageState('expired')
            } else if (status === 409) {
                setPageState('booked')
            } else {
                setPageState('invalid')
            }
        }
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const finalizeBooking = async () => {
        setLoading(true)
        try {
            const payload = {
                firstName, lastName, email, contactNumber, gender,
                dob, tob, pob, date, slot,
            }
            const sel = await selectSlot(token, payload)
            if (!sel.ok) {
                setLoading(false)
                if (sel.status === 410) { setPageState('expired'); return }
                if (sel.status === 409) { toast.error(sel.data.message || 'That slot was just taken.'); setIndex(2); return }
                toast.error(sel.data.message || 'Could not hold your slot.')
                return
            }
            const { bookingId, payment } = sel.data
            const pay = await confirmPayment(bookingId, payment.paymentIntentId)
            setLoading(false)
            if (pay.ok) {
                toast.success('Your session is confirmed!')
                setTimeout(() => router.push(`/booking-confirmed/${bookingId}`), 200)
            } else if (pay.status === 409) {
                toast.error('That slot was just taken. Please pick another.')
                setIndex(2)
            } else {
                toast.error(pay.data.message || 'Payment could not be completed.')
            }
        } catch (err) {
            setLoading(false)
            toast.error('Something went wrong. Please try again.')
        }
    }

    const handleNext = async () => {
        if (index === 0) {
            if (firstName.length === 0) return toast.error('Please mention first name')
            if (lastName.length === 0) return toast.error('Please mention last name')
            if (emailRegex.test(email) === false) return toast.error('Email not correct')
            if (contactNumber.length < 13) return toast.error('Contact number not valid')
        } else if (index === 1) {
            if (dob.length < 10) return toast.error('Date of birth incorrect')
            if (tob.length < 10) return toast.error('Time of birth incorrect')
            if (pob.length === 0) return toast.error('Please mention place of birth')
            if (gender.length === 0) return toast.error('Please select a gender')
        } else if (index === 2) {
            if (date.length === 0) return toast.error('Please select a date')
            if (slot.length === 0) return toast.error('Please select a slot')
        } else if (index === 3) {
            await finalizeBooking()
            return
        }
        setIndex(index + 1)
    }

    const goTo = (target) => { if (target < index) setIndex(target) }

    const steps = [
        { Icon: FaUser, label: 'You' },
        { Icon: FaCakeCandles, label: 'Birth' },
        { Icon: FaClock, label: 'Slot' },
        { Icon: MdRateReview, label: 'Confirm' },
    ]

    // ---- Non-wizard states ----
    if (pageState !== 'valid') {
        const copy = {
            loading: { title: '', body: '' },
            invalid: { title: 'Invitation not valid', body: 'This invitation link is not valid. If you believe this is a mistake, please reach out to us.' },
            expired: { title: 'Invitation expired', body: 'This invitation has expired, but you still hold your place in the queue. We\'ll invite you again in the next round.' },
            booked: { title: 'Already booked', body: 'This invitation has already been used to book a session.' },
        }[pageState]
        return (
            <div className="joinQueuePage">
                <Navbar />
                <section className="joinQueueHero">
                    <div className="joinQueueGlow" aria-hidden="true"></div>
                    <Reveal className="joinQueueReveal">
                        <div className="joinQueuePanel">
                            {pageState === 'loading' ? (
                                <>
                                    <ClipLoader color="#f0b85c" size={34} />
                                    <p className="cosmicSerif joinQueueSub" style={{ marginTop: '1.4rem' }}>Checking your invitation…</p>
                                </>
                            ) : (
                                <>
                                    <MdErrorOutline size={46} style={{ color: '#f08c8c', marginBottom: '0.6rem' }} />
                                    <h1 className="cosmicH2 joinQueueTitle">{copy.title}</h1>
                                    <p className="cosmicSerif joinQueueSub">{copy.body}</p>
                                    <button className="ctaPrimary joinQueueSubmit" onClick={() => router.push('/')}>Back to home</button>
                                </>
                            )}
                        </div>
                    </Reveal>
                </section>
                <Footer />
            </div>
        )
    }

    // ---- Wizard (valid invite) ----
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', height: 'fitContent', textAlign: 'center' }}>
            <Navbar />
            <div className="schedule_screen_main">
                <div className="stepper_header">
                    {steps.map(({ Icon, label }, i) => (
                        <React.Fragment key={label}>
                            <div className={`step ${i === index ? 'active' : i < index ? 'done' : 'upcoming'}`} onClick={() => goTo(i)}>
                                <span className="stepCircle"><Icon size={isMobileScreen ? 22 : 18} /></span>
                                <span className="stepLabel">{label}</span>
                            </div>
                            {i < steps.length - 1 && <span className={`stepLine ${index > i ? 'filled' : ''}`}></span>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="form_area">
                    {index === 0 ? <PersonalDetails />
                        : index === 1 ? <BirthDetails />
                        : index === 2 ? <InviteSlotSelection slots={invite.slots} />
                        : <Review />}
                </div>
                {index === 3 && (
                    <p className="cosmicSerif" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 460, margin: '0 auto 1.4rem', fontSize: '0.9rem' }}>
                        Confirming will take payment for your session and lock in this slot.
                    </p>
                )}
                <div className="button_area">
                    <button onClick={handleNext} disabled={loading}>
                        {loading ? <ClipLoader color="#1d1305" size={20} speedMultiplier={0.8} />
                            : <h3>{index === 0 ? 'Birth details' : index === 1 ? 'Choose Slot' : index === 2 ? 'Review' : 'Pay & confirm'}</h3>}
                        {index === 3 ? '' : <MdArrowRightAlt style={{ marginTop: isMobileScreen ? '0' : '0.4rem', marginLeft: '1rem', fontSize: '1.2rem' }} />}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
