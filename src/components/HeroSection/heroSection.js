import React from 'react'
import './heroSection.css'
import { MdArrowRightAlt } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { Reveal } from '../cosmic/Reveal'

export const HeroSection = () => {
    const router = useRouter()
    return (
        <section className="cosmicHero">
            <div className="heroShootingStars" aria-hidden="true">
                <i className="shootingStar s1"></i>
                <i className="shootingStar s2"></i>
                <i className="shootingStar s3"></i>
            </div>

            <Reveal delay={0.05}>
                <div className="cosmicEyebrow">✦ Vedic astrology · Birth charts · Vaastu ✦</div>
            </Reveal>

            <Reveal delay={0.18}>
                <h1 className="heroTitle">
                    Your destiny has
                    <br />
                    <em className="goldShimmer">coordinates.</em>
                </h1>
            </Reveal>

            <Reveal delay={0.34}>
                <p className="cosmicSerif heroSerif">
                    The sky recorded the exact moment you were born. We read that record —
                    your strengths, your timing, your turning points — and hand it back to
                    you as a map.
                </p>
            </Reveal>

            <Reveal delay={0.5}>
                <div className="heroCtaRow">
                    <button className="ctaGhost" onClick={() => router.push('/free-tier')}>
                        Decode my chart
                    </button>
                    <button className="ctaPrimary" onClick={() => router.push('/join-queue')}>
                        Join the queue <MdArrowRightAlt size={22} />
                    </button>
                </div>
            </Reveal>

            <Reveal delay={0.66}>
                <div className="heroTrustRow">
                    <span>1-hour private session</span>
                    <i></i>
                    <span>Limited weekly slots</span>
                    <i></i>
                    <span>Invited in queue order</span>
                </div>
            </Reveal>

            <div className="scrollCue" aria-hidden="true">
                <div className="scrollCueLine"></div>
                <span>scroll</span>
            </div>
        </section>
    )
}
