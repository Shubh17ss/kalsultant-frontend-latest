import React from 'react'
import './section3.css'

export const Section3 = () => {
    const isMobileScreen = window.innerWidth <= 1000 ? true : false;
    return (
        <div className='section3Container'>
            <span className='reflected_text' data-text={isMobileScreen ? 'Stars Reflect Fate' : 'Charts that reflect reality'}>{isMobileScreen ? 'Stars Reflect Fate' : 'Charts that reflect reality'}</span>
            <h3 style={{ marginTop: '4rem' }}>Whether you'd like to simply look up new career options, or analyze tricky relationships — we got you covered</h3>
            <div className='imageContainer'>

            </div>
        </div>
    )
}
