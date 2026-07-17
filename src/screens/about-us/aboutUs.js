import React, { useEffect, useState } from 'react'
import './aboutUs.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { Reveal } from '../../components/cosmic/Reveal'
import { useRouter } from 'next/navigation'
import { MdArrowRightAlt } from 'react-icons/md'

// importing swiper library
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

// importing images
import techGuyImage from '../../assets/images/tech_work.webp'
import theConsultant from '../../assets/images/theConsultant.webp'
import theClientRelationGuy from '../../assets/images/client_relation.webp'
import { getReviews } from '../../utils/fetchData'

const FACTS = [
    { title: 'Since 2016', label: 'Vedic astrology practice' },
    { title: 'Personalized', label: 'Remedies tailored for you' },
    { title: 'Worldwide', label: 'Online consultations' },
    { title: 'No hard stop', label: 'Your questions matter' },
]

const TEAM = [
    { image: techGuyImage, name: 'Shubh', role: 'Tech Work' },
    { image: theConsultant, name: 'Avnish', role: 'The Consultant' },
    { image: theClientRelationGuy, name: 'Kartik', role: 'Client Relation' },
]

export const AboutUs = () => {
    const [reviews, setReviews] = useState([])
    const router = useRouter()
    const isMobileScreen = window.innerWidth <= 950

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await getReviews()
            setReviews(res)
        }
        fetchReviews()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="auPage">
            <Navbar />

            <section className="auHero">
                <Reveal>
                    <div className="cosmicEyebrow">✦ About us</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h1 className="cosmicH2 auTitle">
                        The people behind <em className="goldShimmer">the charts.</em>
                    </h1>
                </Reveal>
                <Reveal delay={0.22}>
                    <p className="cosmicSerif auSub">
                        KalSultant has been reading the sky for clients around the world
                        since 2016 — one honest conversation at a time.
                    </p>
                </Reveal>

                <div className="auFactsGrid">
                    {FACTS.map((fact, index) => (
                        <Reveal key={fact.title} delay={0.15 + index * 0.1} className="auFactWrap">
                            <div className="auFact">
                                <span className="auFactTitle">{fact.title}</span>
                                <span className="auFactLabel">{fact.label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="auQuote">
                <Reveal>
                    <p className="auQuoteText">
                        Clarity comes not from endless choices —
                        <br />
                        but from the right one.
                    </p>
                </Reveal>
            </section>

            <section className="auReviews">
                <Reveal>
                    <div className="cosmicEyebrow">✦ Why choose us</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h2 className="cosmicH2 auSectionTitle">
                        Hear it from <em className="goldShimmer">our clients.</em>
                    </h2>
                </Reveal>
                <div className="auReviewsSlider">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={isMobileScreen ? 1 : 3}
                        spaceBetween={30}
                        loop={true}
                        speed={2500}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                        }}
                        freeMode={true}
                        grabCursor={true}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="auReviewCard">{review.text}</div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {isMobileScreen && <p className="auSwipeHint">Swipe to read more</p>}
                </div>
            </section>

            <section className="auTeam">
                <Reveal>
                    <div className="cosmicEyebrow">✦ The team</div>
                </Reveal>
                <Reveal delay={0.12}>
                    <h2 className="cosmicH2 auSectionTitle">
                        Three people. <em className="goldShimmer">One sky.</em>
                    </h2>
                </Reveal>
                <div className="auTeamGrid">
                    {TEAM.map((member, index) => (
                        <Reveal key={member.name} delay={0.15 + index * 0.13} className="auTeamWrap">
                            <div className="auTeamCard">
                                <img src={member.image.src} alt={member.name} />
                                <span className="auTeamName">{member.name}</span>
                                <span className="auTeamRole">{member.role}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="auOutro">
                <Reveal>
                    <p className="cosmicSerif auOutroNote">
                        The sky already knows you. Come meet the people who can introduce you.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <button className="ctaPrimary" onClick={() => router.push('/join-queue')}>
                        Join the queue <MdArrowRightAlt size={20} />
                    </button>
                </Reveal>
            </section>

            <Footer />
        </div>
    )
}
