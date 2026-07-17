'use client'
import dynamic from 'next/dynamic'
const HowWeWork = dynamic(() => import('../../screens/how-we-work/howWeWork').then((m) => m.HowWeWork), { ssr: false })
export default function Page() {
    return <HowWeWork />
}
