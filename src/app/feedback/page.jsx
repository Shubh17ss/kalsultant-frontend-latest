'use client'
import dynamic from 'next/dynamic'
const RecordReview = dynamic(() => import('../../screens/record-review/recordReview').then((m) => m.RecordReview), { ssr: false })
export default function Page() {
    return <RecordReview />
}
