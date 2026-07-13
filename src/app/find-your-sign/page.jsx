'use client'
import dynamic from 'next/dynamic'
const FindYourSign = dynamic(() => import('../../screens/find-your-sign/findYourSign').then((m) => m.FindYourSign), { ssr: false })
export default function Page() {
    return <FindYourSign />
}
