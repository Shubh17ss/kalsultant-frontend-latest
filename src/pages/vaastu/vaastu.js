import './vaastu.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { VaastuScene } from './vaastuScene'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowRightAlt } from 'react-icons/md'

const ELEMENTS = [
    { name: 'Earth', sanskrit: 'Prithvi' },
    { name: 'Water', sanskrit: 'Jal' },
    { name: 'Fire', sanskrit: 'Agni' },
    { name: 'Air', sanskrit: 'Vayu' },
    { name: 'Space', sanskrit: 'Akash' },
]

const BENEFITS = [
    {
        title: 'Home space',
        line: 'A harmonious home attracts love, health & abundance.',
    },
    {
        title: 'Office space',
        line: 'A Vaastu-compliant workspace increases productivity, attracts clients & financial growth.',
    },
    {
        title: 'Land selection',
        line: 'Choosing the right plot is the foundation of a prosperous future.',
    },
    {
        title: 'Amendments',
        line: 'A small correction can cast a huge impact.',
    },
]

export const Vaastu = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <VaastuScene />
            <div className="vaastuPage">
                <Navbar />

                <section className="vSection vHero">
                    <Reveal>
                        <div className="cosmicEyebrow">✦ Vaastu Shastra</div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <h1 className="cosmicH2 vTitle">
                            Shaping spaces <em className="goldShimmer">for prosperity.</em>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.22}>
                        <p className="cosmicSerif vLead">
                            Vaastu is the ancient Indian science of building in harmony with
                            nature's forces. Keep scrolling — and watch a home come into
                            alignment.
                        </p>
                    </Reveal>
                    <div className="vScrollCue" aria-hidden="true">
                        <div className="vScrollCueLine"></div>
                        <span>scroll to build</span>
                    </div>
                </section>

                <section className="vSection vNotion">
                    <Reveal>
                        <div className="cosmicEyebrow">✦ The notion</div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <h2 className="cosmicH2 vHeading">
                            An ancient science <em className="goldShimmer">of space.</em>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.22}>
                        <p className="cosmicSerif vBody">
                            Long before blueprints, Vaastu Shastra mapped how buildings
                            breathe — how sunlight, magnetic fields and the five elements
                            move through a structure. When a space honours that flow, the
                            life inside it steadies.
                        </p>
                    </Reveal>
                    <div className="vElementsRow">
                        {ELEMENTS.map((element, index) => (
                            <Reveal key={element.name} delay={0.1 + index * 0.08} className="vElementWrap">
                                <div className="vElement">
                                    <span className="vElementName">{element.name}</span>
                                    <span className="vElementSanskrit">{element.sanskrit}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="vSection vDirections">
                    <Reveal>
                        <div className="cosmicEyebrow">✦ The method</div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <h2 className="cosmicH2 vHeading">
                            Every direction <em className="goldShimmer">carries a force.</em>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.22}>
                        <p className="cosmicSerif vBody">
                            North invites wealth. East welcomes the rising sun. The
                            south-east holds fire. Where your entrance, kitchen and bedroom
                            sit decides how energy enters your home, where it settles, and
                            how it leaves.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="vAside">
                            The compass forming beneath the house marks the eight directions
                            every Vaastu reading begins with.
                        </p>
                    </Reveal>
                </section>

                <section className="vSection vBenefits">
                    <Reveal>
                        <div className="cosmicEyebrow">✦ The benefits</div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <h2 className="cosmicH2 vHeading">
                            What alignment <em className="goldShimmer">returns.</em>
                        </h2>
                    </Reveal>
                    <div className="vBenefitsGrid">
                        {BENEFITS.map((benefit, index) => (
                            <Reveal key={benefit.title} delay={0.12 + index * 0.1} className="vBenefitWrap">
                                <div className="vBenefit">
                                    <span className="vBenefitTitle">{benefit.title}</span>
                                    <p className="vBenefitLine">{benefit.line}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="vSection vOutro">
                    <Reveal>
                        <h2 className="cosmicH2 vHeading">
                            True alignment isn't achieved
                            <br />
                            in <em className="goldShimmer">a single sitting.</em>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="cosmicSerif vBody">
                            It's a journey of mindful adjustments and continuous insights.
                        </p>
                    </Reveal>
                    <Reveal delay={0.28}>
                        <div className="vCtaRow">
                            <button className="ctaPrimary" onClick={() => navigate('/schedule-session')}>
                                Schedule a consultation <MdArrowRightAlt size={20} />
                            </button>
                            <button className="ctaGhost" onClick={() => navigate('/pricing')}>
                                Check pricing
                            </button>
                        </div>
                    </Reveal>
                </section>

                <Footer />
            </div>
        </>
    )
}
