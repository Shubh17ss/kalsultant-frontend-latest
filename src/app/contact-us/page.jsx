'use client'
import dynamic from 'next/dynamic'
const Contact = dynamic(() => import('../../screens/contact-us/contact').then((m) => m.Contact), { ssr: false })
export default function Page() {
    return <Contact />
}
