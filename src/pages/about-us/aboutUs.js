import React, { useEffect } from 'react'
import './aboutUs.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'

// importing images
import techGuyImage from '../../assets/images/tech_work.webp'
import theConsultant from '../../assets/images/theConsultant.webp'
import theClientRelationGuy from '../../assets/images/client_relation.webp'

export const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', height: 'fitContent', textAlign: 'center' }}>
            <Navbar />
            <div className='aboutUsContainer'>
                <div className='heroSectionAU'>
                    <div className='left'>
                        <strong style={{ color: 'rgba(255,255,255,0.3)' }}>
                            ABOUT
                        </strong>
                        <strong>KALSULTANT</strong>
                    </div>
                    <div className='right'>
                        <div className='box'>
                            <h3>Vedic Astrology</h3>
                            <h3>Since 2016</h3>
                        </div>
                        <div className='box'>
                            <h3>Personalized Remedies</h3>
                            <h3>Tailored for You</h3>
                        </div>
                        <div className='box'>
                            <h3>Online Consultation</h3>
                            <h3>Around the globe</h3>
                        </div>
                        <div className='box'>
                            <h3>Your Questions Matter</h3>
                            <h3>No hard stop in sessions</h3>
                        </div>
                    </div>
                </div>
                <div className='quoteSection'>
                    <strong>Clarity comes not from endless choices,</strong>
                    <strong> but from the right one.</strong>
                </div>
                {/* Commenting out hear it from our clients section till we have
                review records data set. */}
                {/* <div className='section3'>
                    <strong>Why Choose Us?</strong>
                    <strong>Hear it from our clients</strong>
                    <div class="slider">
                        <div class="slide-track">
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>
                            <div className='slide'>
                                <h3>Consultation was nice, sir explained everything nicely and was all ears.</h3>
                                <h3>Shubh</h3>
                            </div>

                        </div>
                    </div>
                </div> */}
                <div className='section4'>
                    <strong>More</strong>
                    <strong>About Us</strong>
                    <div className='infoHolder'>
                        <div className='charInfo'>
                            <img src={techGuyImage} alt='/' />
                            <h3>Shubh</h3>
                            <h3>(Tech Work)</h3>
                        </div>
                        <div className='charInfo'>
                            <img src={theConsultant} alt='/' />
                            <h3>Avnish</h3>
                            <h3>(The Consultant)</h3>
                        </div>
                        <div className='charInfo'>
                            <img src={theClientRelationGuy} alt='/' />
                            <h3>Kartik</h3>
                            <h3>(Client Relation)</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
