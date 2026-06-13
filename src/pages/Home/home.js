import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/navbar'
import { HeroSection } from '../../components/HeroSection/heroSection'
import { HeroSection2 } from '../../components/HeroSection2/heroSection'
import { CosmicJourney } from '../../components/CosmicJourney/cosmicJourney'
import { Section3 } from '../../components/section3/section3'
import { Newsletter } from '../../components/newsletter/newsletter'
import { Footer } from '../../components/footer/footer'
import { CosmicScene } from '../../components/cosmic/CosmicScene'
import { IntroOverlay } from '../../components/intro/IntroOverlay'

export const Home = () => {
    // Play the cinematic intro only on the first visit of the session.
    const [showIntro, setShowIntro] = useState(() => {
        try { return !sessionStorage.getItem('introSeen') } catch { return true }
    })

    const dismissIntro = () => {
        try { sessionStorage.setItem('introSeen', '1') } catch { /* ignore */ }
        setShowIntro(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <CosmicScene />
            <div className="App" style={{ overflowX: 'hidden', width: '100%', height: '100%', position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Navbar />
                <HeroSection />
                <HeroSection2 />
                <CosmicJourney />
                <Section3 />
                <Newsletter />
                <Footer />
            </div>
            {showIntro && <IntroOverlay onDone={dismissIntro} />}
        </>
    )
}
