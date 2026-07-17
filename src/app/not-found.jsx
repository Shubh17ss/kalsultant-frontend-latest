'use client'
import dynamic from 'next/dynamic'
const NotFound = dynamic(() => import('../screens/not-found/notFound').then((m) => m.NotFound), { ssr: false })
export default function NotFoundPage() {
    return <NotFound />
}
