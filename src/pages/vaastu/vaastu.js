import './vaastu.css'
import { Navbar } from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'
import { House3D } from '../../components/3dComponents/house'
import { useEffect } from 'react'

export const Vaastu = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', minHeight: '100vh', textAlign: 'center' }}>
            <Navbar />
            <div className='vaastu_container'>
                <div className='vaastu_hero_section'>
                    <div className='v_left_section'>
                        <strong><span>SHAPING</span> SPACES<br /><span>FOR</span> PROSPERITY</strong>
                    </div>
                    <div className='v_right_section'>
                        <House3D />
                    </div>
                </div>
                <div className='vaastu_sec_1'>
                    <div>
                        <img src='https://res.cloudinary.com/dqoqbd7mx/image/upload/v1753157793/v_home_xfg0vf.webp' alt='/' />
                        <h1>HOME SPACE</h1>
                        <h4>A harmonious home attracts Love, Health & Abundance.</h4>
                    </div>
                    <div>
                        <img src='https://res.cloudinary.com/dqoqbd7mx/image/upload/v1753157793/v_office_ebhcax.webp' alt='/' />
                        <h1>OFFICE SPACE</h1>
                        <h4>A Vaastu compliant workspace increases productivity, attracts clients & financial growth.</h4>
                    </div>
                    <div>
                        <img src='https://res.cloudinary.com/dqoqbd7mx/image/upload/v1753157795/v_land_dltdd6.webp' alt='/' />
                        <h1>LAND SELECTION</h1>
                        <h4>Choosing the right plot is the foundation of a prosperous future.</h4>
                    </div>
                    <div>
                        <img src='https://res.cloudinary.com/dqoqbd7mx/image/upload/v1753157793/v_remedy_qtqkiq.webp' alt='/' />
                        <h1>AMENDMENTS</h1>
                        <h4>A small correction can cast a huge impact.</h4>
                    </div>
                </div>
                <div className='vaastu_sec_2'>
                    <div>
                        <strong>True alignment isn't achieved in a single sitting</strong>
                        <h4>It's a journey of mindful adjustments and continuous insights</h4>
                        <button className='v_signup_btn'>
                            <h3>Subscribe</h3>
                        </button>
                        <h5><span style={{ marginRight: '1rem' }}>Check Pricing?</span> <span>How it works</span></h5>
                    </div>
                    <div className='cycle_image_container'>
                        <img src='https://res.cloudinary.com/dqoqbd7mx/image/upload/v1753511637/v_cycle_fi1cca.png' alt='/' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
