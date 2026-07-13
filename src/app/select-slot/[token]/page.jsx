'use client'
import dynamic from 'next/dynamic'
const InviteLanding = dynamic(() => import('../../../screens/queue/inviteLanding').then((m) => m.InviteLanding), { ssr: false })
export default function Page() {
    return <InviteLanding />
}
