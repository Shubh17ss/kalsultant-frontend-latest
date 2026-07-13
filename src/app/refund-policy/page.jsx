'use client'
import dynamic from 'next/dynamic'
const RefundPolicy = dynamic(() => import('../../screens/policies/refundPolicy').then((m) => m.RefundPolicy), { ssr: false })
export default function Page() {
    return <RefundPolicy />
}
