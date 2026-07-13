'use client'
import dynamic from 'next/dynamic'
const PrivacyPolicy = dynamic(() => import('../../screens/policies/privacyPolicy').then((m) => m.PrivacyPolicy), { ssr: false })
export default function Page() {
    return <PrivacyPolicy />
}
