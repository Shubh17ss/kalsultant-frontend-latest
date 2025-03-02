import React, { useEffect } from 'react'
import './howWeWork.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import howWeWorkImage from '../../assets/images/how_it_works.png'

//importing icons
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

export const HowWeWork = () => {
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', height: 'fitContent', textAlign: 'center' }}>
            <Navbar />
            <div className='howWeWorkContainer'>
                <div className='hwwHeroSection'>
                    <div className='left'>
                        <strong style={{ color: 'rgba(255,255,255,0.3)' }}>YOU</strong>
                        <strong>SCHEDULE</strong>
                    </div>
                    <div className='middle'>
                        {isMobileScreen ?
                            <FaLongArrowAltDown size={50} color='#3a74d2' />
                            :
                            <FaLongArrowAltRight size={70} color='#3a74d2' />
                        }
                    </div>
                    <div className='right'>
                        <strong style={{ color: 'rgba(255,255,255,0.3)' }}>WE</strong>
                        <strong>CONSULT</strong>
                    </div>
                </div>
                {isMobileScreen?
                <span style={{fontSize:'1rem',fontFamily:'FuturaNowLight, sans-serif',color:'#3a74d2'}}>Please zoom in to see</span>
                :
                <></>}
                <img src={howWeWorkImage} alt='/' style={{ width: '90%' }} />
                <div className='lastSection'>
                    <strong>We hope this was helpful</strong>
                    <strong>"Thank you for your patience as we have limited slots available. We are continually seeking skilled and like-minded astrologers to join our team."</strong>
                </div>
            </div>
            <Footer />
        </div>
    )
}
