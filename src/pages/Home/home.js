import React, { useEffect } from 'react'
import {Navbar} from '../../components/navbar/navbar'
import { HeroSection } from '../../components/HeroSection/heroSection'
import { HeroSection2 } from '../../components/HeroSection2/heroSection'
import { Section3 } from '../../components/section3/section3'
import { Footer } from '../../components/footer/footer'

export const Home = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return (
        <div className="App" style={{ overflowX:'hidden',width: '100%', height: '100%', position: "relative", zIndex: 1, textAlign: "center", color: "white", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Navbar />
            <HeroSection />
            <HeroSection2 />
            <Section3 />
            <Footer />
        </div>
    )
}
