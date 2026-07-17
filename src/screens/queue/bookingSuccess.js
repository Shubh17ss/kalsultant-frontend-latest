import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { ClipLoader } from 'react-spinners'
import success_logo from '../../assets/images/success_icon.png'
import { getBooking } from '../../utils/queueApi'
import '../schedule-session/schedule.css'

export const BookingSuccess = () => {
    const { bookingId } = useParams()
    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true)

    const changeLayout = (value) => {
        if (!value) return ''
        const [start, end] = value.split('-')
        const hr = Number(start.split(':')[0])
        const min = start.split(':')[1]
        if (hr > 12) return `${hr - 12}:${min}-${hr - 11}:${end.split(':')[1]} (pm)`
        if (hr === 12) return `${value} (pm)`
        return `${value} (am)`
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const load = async () => {
            const { ok, data } = await getBooking(bookingId)
            if (ok) setBooking(data.booking)
            setLoading(false)
        }
        load()
    }, [bookingId])

    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className="schedule_screen_main">
                <div className="information_card">
                    {loading ? (
                        <ClipLoader color="#f0b85c" size={34} />
                    ) : !booking ? (
                        <>
                            <h3>Booking not found</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)' }}>We couldn't find this booking.</p>
                        </>
                    ) : (
                        <>
                            <img src={success_logo.src} style={{ width: '42px', height: '42px' }} alt="success" />
                            <h3>Session Confirmed</h3>
                            <div className="row">
                                <h4>Confirmation to</h4>
                                <h4>{booking.email}</h4>
                            </div>
                            <div className="row">
                                <h4>Date</h4>
                                <h4>{booking.session_date}</h4>
                            </div>
                            <div className="row">
                                <h4>Slot</h4>
                                <h4>{changeLayout(booking.slot)}</h4>
                            </div>
                            <div className="row">
                                <h4>Payment</h4>
                                <h4>{booking.paymentStatus === 'paid' ? 'Paid' : booking.paymentStatus}</h4>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', padding: '0 1rem' }}>
                                A calendar invite with your Google Meet link will follow by email.
                            </p>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
