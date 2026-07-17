import React from 'react'
import './notFound.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { useRouter, usePathname } from 'next/navigation'
import { MdArrowRightAlt } from 'react-icons/md'

/* FNV-1a. The point of hashing rather than randomising: one path always
   resolves to the same place in the sky, so the readout is a property of the
   URL the visitor actually typed, not decoration that reshuffles on reload. */
const hashPath = (path) => {
    let h = 2166136261
    for (let i = 0; i < path.length; i++) {
        h ^= path.charCodeAt(i)
        h = Math.imul(h, 16777619)
    }
    return h >>> 0
}

const pad = (n) => String(Math.abs(n)).padStart(2, '0')

// Right ascension (0–24h) and declination (−90°–+90°) — the two numbers any
// ephemeris uses to name a position on the celestial sphere.
const coordsFor = (path) => {
    const h = hashPath(path || '/')
    const decDeg = ((h >>> 3) % 180) - 90
    return {
        ra: `${pad(h % 24)}h ${pad((h >>> 5) % 60)}m ${pad((h >>> 11) % 60)}s`,
        dec: `${decDeg < 0 ? '−' : '+'}${pad(decDeg)}° ${pad((h >>> 9) % 60)}′ ${pad((h >>> 15) % 60)}″`,
    }
}

export const NotFound = () => {
    const router = useRouter()
    const pathname = usePathname()
    const path = pathname || '/'
    const { ra, dec } = coordsFor(path)

    const rows = [
        { label: 'Path', value: path, mono: true },
        { label: 'R.A.', value: ra, mono: true },
        { label: 'Dec.', value: dec, mono: true },
        { label: 'Status', value: '404 — no object found', mono: true, flag: true },
    ]

    return (
        <div className="nfPage">
            <Navbar />

            <section className="nfHero">
                <Reveal>
                    <div className="cosmicEyebrow">✦ Uncharted ✦</div>
                </Reveal>

                <Reveal delay={0.12}>
                    <h1 className="cosmicH2 nfTitle">
                        No star at these <em className="goldShimmer">coordinates.</em>
                    </h1>
                </Reveal>

                <Reveal delay={0.22}>
                    <p className="cosmicSerif nfSub">
                        This page isn't on any chart we read. Head back home, or take your
                        place in the queue for a reading.
                    </p>
                </Reveal>

                <Reveal delay={0.32} className="nfReadoutWrap">
                    <div className="nfReadout">
                        <div className="nfReadoutHead">Chart lookup</div>
                        <dl className="nfRows">
                            {rows.map((row) => (
                                <div className="nfRow" key={row.label}>
                                    <dt className="nfKey">{row.label}</dt>
                                    <dd className={`nfVal${row.flag ? ' nfValFlag' : ''}`}>{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Reveal>

                <Reveal delay={0.44} className="nfCtaWrap">
                    <div className="nfCtaRow">
                        <button className="ctaGhost nfCta" onClick={() => router.push('/')}>
                            Return home
                        </button>
                        <button className="ctaPrimary nfCta" onClick={() => router.push('/join-queue')}>
                            Join the queue <MdArrowRightAlt size={22} />
                        </button>
                    </div>
                </Reveal>
            </section>

            <Footer />
        </div>
    )
}
