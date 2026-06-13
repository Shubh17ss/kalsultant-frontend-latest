import React, { useRef } from 'react'
import './heroSection2.css'
import { Reveal } from '../cosmic/Reveal'

/* ------------------------------------------------------------------
   Constellation glyphs — line art that "draws" itself when the parent
   .reveal becomes .revealed. Every stroked shape carries pathLength="1"
   so a single (dasharray:1 / dashoffset:1 -> 0) rule animates any path
   regardless of its real geometry. Star-nodes pop in after the lines.
   Per-node --d staggers the sequence.
------------------------------------------------------------------ */

// Two interlocking rings — a bond forming.
const RelationshipGlyph = () => (
    <svg viewBox="0 0 200 160" className="cosmicGlyphSvg" aria-hidden="true">
        <circle className="line" pathLength="1" cx="82" cy="84" r="38" style={{ '--d': '0s' }} />
        <circle className="line" pathLength="1" cx="118" cy="84" r="38" style={{ '--d': '0.35s' }} />
        <circle className="node" r="3.4" cx="82" cy="46" style={{ '--d': '1.5s' }} />
        <circle className="node" r="3.4" cx="118" cy="46" style={{ '--d': '1.65s' }} />
        <circle className="node node--bright" r="4.2" cx="100" cy="60" style={{ '--d': '1.8s' }} />
        <circle className="node node--bright" r="4.2" cx="100" cy="108" style={{ '--d': '1.95s' }} />
        <circle className="node" r="2.6" cx="46" cy="40" style={{ '--d': '2.1s' }} />
        <circle className="node" r="2.6" cx="156" cy="42" style={{ '--d': '2.2s' }} />
    </svg>
)

// A path of stars climbing to an apex — ascent / career.
const CareerGlyph = () => (
    <svg viewBox="0 0 200 160" className="cosmicGlyphSvg" aria-hidden="true">
        <polyline className="line" pathLength="1" points="26,130 64,98 98,110 134,58 174,30" style={{ '--d': '0s' }} />
        <circle className="node" r="3.2" cx="26" cy="130" style={{ '--d': '1.3s' }} />
        <circle className="node" r="3.2" cx="64" cy="98" style={{ '--d': '1.45s' }} />
        <circle className="node" r="3.2" cx="98" cy="110" style={{ '--d': '1.6s' }} />
        <circle className="node" r="3.2" cx="134" cy="58" style={{ '--d': '1.75s' }} />
        <circle className="node node--bright" r="5" cx="174" cy="30" style={{ '--d': '1.95s' }} />
        {/* apex sparkle */}
        <line className="line spark" pathLength="1" x1="174" y1="16" x2="174" y2="44" style={{ '--d': '2.05s' }} />
        <line className="line spark" pathLength="1" x1="160" y1="30" x2="188" y2="30" style={{ '--d': '2.05s' }} />
    </svg>
)

// A celestial dial with hands and tick-stars — timing.
const TimingGlyph = () => (
    <svg viewBox="0 0 200 160" className="cosmicGlyphSvg" aria-hidden="true">
        <circle className="line" pathLength="1" cx="100" cy="82" r="46" style={{ '--d': '0s' }} />
        <path className="line" pathLength="1" d="M100 36 A46 46 0 0 1 146 82" style={{ '--d': '0.45s' }} />
        <line className="line" pathLength="1" x1="100" y1="82" x2="100" y2="50" style={{ '--d': '0.9s' }} />
        <line className="line" pathLength="1" x1="100" y1="82" x2="130" y2="92" style={{ '--d': '1.1s' }} />
        <circle className="node node--bright" r="3.8" cx="100" cy="82" style={{ '--d': '1.5s' }} />
        <circle className="node" r="3" cx="100" cy="36" style={{ '--d': '1.65s' }} />
        <circle className="node" r="3" cx="146" cy="82" style={{ '--d': '1.78s' }} />
        <circle className="node" r="3" cx="100" cy="128" style={{ '--d': '1.9s' }} />
        <circle className="node" r="3" cx="54" cy="82" style={{ '--d': '2.02s' }} />
    </svg>
)

const TiltCard = ({ className, tag, title, line, glyph }) => {
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
            <div className="cosmicGlyph">{glyph}</div>
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
                        glyph={<RelationshipGlyph />}
                    />
                </Reveal>
                <Reveal delay={0.25} className="cosmicCardWrap">
                    <TiltCard
                        className="cardCareer"
                        tag="Purpose"
                        title="Career"
                        line="The work you were built for, and the doors about to open."
                        glyph={<CareerGlyph />}
                    />
                </Reveal>
                <Reveal delay={0.4} className="cosmicCardWrap">
                    <TiltCard
                        className="cardTiming"
                        tag="Momentum"
                        title="Timing"
                        line="When to push. When to wait. When to leap."
                        glyph={<TimingGlyph />}
                    />
                </Reveal>
            </div>
        </section>
    )
}
