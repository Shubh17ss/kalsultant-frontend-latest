'use client'
// Alias kept so existing CTAs pointing at /schedule-session still land on the queue signup.
import dynamic from 'next/dynamic'
const JoinQueue = dynamic(() => import('../../screens/queue/joinQueue').then((m) => m.JoinQueue), { ssr: false })
export default function Page() {
    return <JoinQueue />
}
