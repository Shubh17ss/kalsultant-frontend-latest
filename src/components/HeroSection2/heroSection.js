import React from 'react'
import './heroSection2.css'

export const HeroSection2 = () => {
  return (
    <div className='heroSectionContainer2'>
      <span>Everything is time bound</span>
      <h3>Astrology can provide insights into the best times for starting something new.</h3>
      <div className='imagesContainer'>
        <div className='card one'>
          <div>
            <span>#Relationship</span>
          </div>
        </div>
        <div className='card two'>
          <div>
            <span>#Goal</span>
          </div>
        </div>
        <div className='card three'>
          <div>
            <span>#Effort</span>
          </div>
        </div>
      </div>
    </div>
  )
}
