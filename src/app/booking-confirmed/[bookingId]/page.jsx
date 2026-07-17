'use client'
import dynamic from 'next/dynamic'
const BookingSuccess = dynamic(() => import('../../../screens/queue/bookingSuccess').then((m) => m.BookingSuccess), { ssr: false })
export default function Page() {
    return <BookingSuccess />
}
