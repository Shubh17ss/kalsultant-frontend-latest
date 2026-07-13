'use client'
import dynamic from 'next/dynamic'
const TermsAndConditions = dynamic(() => import('../../screens/policies/termsAndConditions').then((m) => m.TermsAndConditions), { ssr: false })
export default function Page() {
    return <TermsAndConditions />
}
