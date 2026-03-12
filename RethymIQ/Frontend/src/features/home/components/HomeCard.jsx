import React from 'react'
import {RiEmotion2Line} from '@remixicon/react'

const HomeCard = () => {
  return (
    <div className='home-card'>
       <div className="content">
          <h1>Analyze Your <span>Rhythm</span></h1>

          <p>Let our AI scan your facial expression and match it with the perfect playlist.</p>

          <button className="primary-btn detectExp-Btn">
            <span><RiEmotion2Line  size={20}/></span>
            Scan Expression
            
            </button>
       </div>
    </div>
  )
}

export default HomeCard
