import React from 'react'
import './section3.css'
import { MdArrowRightAlt } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { Reveal } from '../cosmic/Reveal'

export const Section3 = () => {
    const router = useRouter()
    return (
        <section className="finalCtaSection">
            <div className="zodiacWheel" aria-hidden="true"></div>
            <div className="eclipseGlow" aria-hidden="true"></div>

            <Reveal>
                <p className="cosmicQuote">
                    “The same moon that moves entire oceans
                    <br />
                    is moving you.”
                </p>
            </Reveal>

            <Reveal delay={0.16}>
                <h2 className="cosmicH2">
                    The next chapter of your life
                    <br />
                    is <em className="goldShimmer">already written.</em>
                </h2>
            </Reveal>

            <Reveal delay={0.3}>
                <p className="cosmicSerif">Read it before you live it.</p>
            </Reveal>

            <Reveal delay={0.44}>
                <div className="finalCtaBlock">
                    <button className="ctaPrimary finalCtaButton" onClick={() => router.push('/join-queue')}>
                        Join the queue <MdArrowRightAlt size={22} />
                    </button>
                    <p className="finalCtaNote">Join with your email — we invite you to pick a slot when your turn comes.</p>
                </div>
            </Reveal>
        </section>
    )
}
