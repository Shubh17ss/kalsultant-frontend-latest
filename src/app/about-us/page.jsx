'use client'
import dynamic from 'next/dynamic'
const AboutUs = dynamic(() => import('../../screens/about-us/aboutUs').then((m) => m.AboutUs), { ssr: false })
export default function Page() {
    return <AboutUs />
}
