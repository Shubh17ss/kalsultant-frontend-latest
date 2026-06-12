import React from 'react'
import './cosmicJourney.css'
import { MdArrowRightAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Reveal, Parallax } from '../cosmic/Reveal'

const STEPS = [
    {
        number: '01',
        title: 'Share your moment',
        line: "Date, time, and place of birth. That's all the sky needs to find you.",
    },
    {
        number: '02',
        title: 'We cast your Kundli',
        line: 'A one-hour, one-on-one reading of your chart — planet by planet, house by house.',
    },
    {
        number: '03',
        title: 'Leave with a map',
        line: 'Clear windows of time, honest answers, and exactly what to do next.',
    },
]

export const CosmicJourney = () => {
    const navigate = useNavigate()
    return (
        <section className="journeySection">
            <Parallax speed={0.08} className="journeyNebula" aria-hidden="true">
                <div></div>
            </Parallax>

            <Reveal>
                <div className="cosmicEyebrow">✦ How it works</div>
            </Reveal>
            <Reveal delay={0.12}>
                <h2 className="cosmicH2">
                    From your birth moment
                    <br />
                    to a <em className="goldShimmer">battle plan.</em>
                </h2>
            </Reveal>

            <Reveal delay={0.2}>
                <div className="orbitVisual" aria-hidden="true">
                    <div className="orbitRing r1"></div>
                    <div className="orbitRing r2"></div>
                    <div className="orbitRing r3"></div>
                    <div className="orbitCore">✦</div>
                </div>
            </Reveal>

            <div className="journeySteps">
                {STEPS.map((step, index) => (
                    <Reveal key={step.number} delay={0.12 + index * 0.15} className="journeyStepWrap">
                        <div className="journeyStep">
                            <span className="journeyStepNumber">{step.number}</span>
                            <span className="journeyStepTitle">{step.title}</span>
                            <p className="journeyStepLine">{step.line}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.3}>
                <button className="journeyLink" onClick={() => navigate('/how-we-work')}>
                    See how we work <MdArrowRightAlt size={20} />
                </button>
            </Reveal>
        </section>
    )
}
