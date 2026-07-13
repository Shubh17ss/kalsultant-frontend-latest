'use client'
import dynamic from 'next/dynamic'
const Pricing = dynamic(() => import('../../screens/Pricing/pricing').then((m) => m.Pricing), { ssr: false })
export default function Page() {
    return <Pricing />
}
