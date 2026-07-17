'use client'
import dynamic from 'next/dynamic'
const Vaastu = dynamic(() => import('../../screens/vaastu/vaastu').then((m) => m.Vaastu), { ssr: false })
export default function Page() {
    return <Vaastu />
}
