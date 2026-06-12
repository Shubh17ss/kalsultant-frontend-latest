import React, { useRef } from 'react'
import './heroSection2.css'
import { Reveal } from '../cosmic/Reveal'

const TiltCard = ({ className, tag, title, line }) => {
    const ref = useRef(null)

    const handleMove = (event) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `perspective(900px) rotateY(${(px * 9).toFixed(2)}deg) rotateX(${(-py * 9).toFixed(2)}deg) translateY(-8px)`
    }

    const handleLeave = () => {
        if (ref.current) {
            ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
        }
    }

    return (
        <div
            ref={ref}
            className={`cosmicCard ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <div className="cosmicCardVeil">
                <span className="cosmicCardTag">{tag}</span>
                <span className="cosmicCardTitle">{title}</span>
                <p className="cosmicCardLine">{line}</p>
            </div>
        </div>
    )
}

export const HeroSection2 = () => {
    return (
        <section className="timeBoundSection">
            <Reveal>
                <div className="cosmicEyebrow">✦ Why the stars</div>
            </Reveal>
            <Reveal delay={0.12}>
                <h2 className="cosmicH2">
                    Everything in your life
                    <br />
                    is <em className="goldShimmer">time-bound.</em>
                </h2>
            </Reveal>
            <Reveal delay={0.24}>
                <p className="cosmicSerif">
                    The right move at the wrong time still fails. Astrology doesn't change
                    what happens — it changes when you act.
                </p>
            </Reveal>

            <div className="cosmicCardsRow">
                <Reveal delay={0.1} className="cosmicCardWrap">
                    <TiltCard
                        className="cardRelationship"
                        tag="Love & Bonds"
                        title="Relationship"
                        line="Who you love — and when love finds you."
                    />
                </Reveal>
                <Reveal delay={0.25} className="cosmicCardWrap">
                    <TiltCard
                        className="cardCareer"
                        tag="Purpose"
                        title="Career"
                        line="The work you were built for, and the doors about to open."
                    />
                </Reveal>
                <Reveal delay={0.4} className="cosmicCardWrap">
                    <TiltCard
                        className="cardTiming"
                        tag="Momentum"
                        title="Timing"
                        line="When to push. When to wait. When to leap."
                    />
                </Reveal>
            </div>
        </section>
    )
}
