import React, { useEffect } from 'react'
import './howWeWork.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { useRouter } from 'next/navigation'
import { MdArrowRightAlt } from 'react-icons/md'

// importing swiper library
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const STEPS = [
    {
        num: '01',
        tag: 'You begin',
        title: 'Join the queue',
        body: 'Sign up with your email to join the queue. We take a limited number of consultations each week, so when your turn arrives we invite you to choose a slot for the coming week and confirm it with payment.',
        points: [
            'Just your email to start',
            'Invited in queue order',
            'Pay only when you confirm a slot',
        ],
    },
    {
        num: '02',
        tag: 'The moment is mapped',
        title: 'We cast your Kundli',
        body: 'Your birth details fix the sky at your first breath. From them we cast your Kundli — the exact sign and degree every planet occupied, arranged across the twelve houses of your life.',
        points: [
            'Ascendant (Lagna) & moon sign',
            'Planetary positions in all 12 houses',
            'Divisional charts where needed',
        ],
    },
    {
        num: '03',
        tag: 'The deep study',
        title: 'We read the chart',
        body: "Before we ever speak, the chart is studied house by house — career, wealth, relationships, health — weighing each planet's strength, the combinations they form, and the periods they rule.",
        points: [
            'House-by-house analysis',
            'Planetary strengths & afflictions',
            'Yogas and doshas flagged',
        ],
    },
    {
        num: '04',
        tag: 'Findings become a map',
        title: 'We curate your timeline',
        body: 'Raw positions become a curated reading: your running dasha periods and current transits are laid over the chart to mark the windows that favour you — and the stretches that ask for patience.',
        points: [
            'Current mahadasha & antardasha',
            'Transits (gochar) over your chart',
            'Favourable & caution windows marked',
        ],
    },
    {
        num: '05',
        tag: 'One full hour, live',
        title: 'The session',
        body: "You meet your consultant one-on-one, online from anywhere in the world. The curated reading is walked through in plain language, and your questions steer the hour — we don't hard-stop a conversation that matters.",
        points: [
            '1-hour live consultation',
            'Up to 4 birth charts covered',
            'Your questions set the agenda',
        ],
    },
    {
        num: '06',
        tag: 'You leave with next steps',
        title: 'Remedies & payment',
        body: 'You walk away with practical, personalised remedies and clear timing guidance for the road ahead. Only then do you pay — after the session ends, never before.',
        points: [
            'Personalised remedies',
            'Clear do-next guidance',
            'Pay only after the session',
        ],
    },
]

export const HowWeWork = () => {
    const router = useRouter()
    const isMobileScreen = window.innerWidth <= 1000

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="hwwPage">
            <Navbar />
            <section className="hwwHero">
                <Reveal>
                    <div className="cosmicEyebrow">✦ How we work</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h1 className="cosmicH2 hwwTitle">
                        You schedule. <em className="goldShimmer">We decode the sky.</em>
                    </h1>
                </Reveal>
                <Reveal delay={0.22}>
                    <p className="cosmicSerif hwwSub">
                        Here is everything that happens between sharing your birth details
                        and walking away with answers — step by step.
                    </p>
                </Reveal>
            </section>

            <section className="hwwSliderSection">
                <Reveal delay={0.1}>
                    <Swiper
                        className="hwwSwiper"
                        modules={[Pagination, Navigation, Keyboard]}
                        centeredSlides
                        grabCursor
                        keyboard={{ enabled: true }}
                        spaceBetween={isMobileScreen ? 14 : 30}
                        slidesPerView={isMobileScreen ? 1.08 : 1.7}
                        pagination={{ clickable: true }}
                        navigation={!isMobileScreen}
                    >
                        {STEPS.map((step) => (
                            <SwiperSlide key={step.num}>
                                <article className="hwwSlide">
                                    <span className="hwwSlideNumber">{step.num}</span>
                                    <span className="hwwSlideTag">{step.tag}</span>
                                    <h2 className="hwwSlideTitle">{step.title}</h2>
                                    <p className="hwwSlideBody">{step.body}</p>
                                    <ul className="hwwSlidePoints">
                                        {step.points.map((point) => (
                                            <li key={point}>✦ {point}</li>
                                        ))}
                                    </ul>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Reveal>
                {isMobileScreen && <p className="hwwSwipeHint">Swipe to walk through the process</p>}
            </section>

            <section className="hwwOutro">
                <Reveal>
                    <h2 className="cosmicH2 hwwOutroTitle">
                        Ready when <em className="goldShimmer">you are.</em>
                    </h2>
                </Reveal>
                <Reveal delay={0.12}>
                    <p className="cosmicSerif hwwOutroNote">
                        Thank you for your patience as we have limited slots available. We
                        are continually seeking skilled and like-minded astrologers to join
                        our team.
                    </p>
                </Reveal>
                <Reveal delay={0.24}>
                    <button className="ctaPrimary" onClick={() => router.push('/join-queue')}>
                        Join the queue <MdArrowRightAlt size={20} />
                    </button>
                </Reveal>
            </section>
            <Footer />
        </div>
    )
}
