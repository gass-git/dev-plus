import React from 'react'
import './topNavBar.css'
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TopNavBar() {

  return (
    <section className='top-nav-bar'>
      <div className="border-img">
        <div className="inner-container">
          <div className='wrapper'>

            {/* Left side container for left arrow */}
            <div style={{ width: '10%', textAlign: 'center', marginTop: '-6px' }}>
              <FontAwesomeIcon icon={faCaretLeft} style={{ fontSize: '35px' }} />
            </div>

            {/* Center flex parent container for links */}
            <div style={{ display: 'flex', width: '80%' }}>
              <div style={{ width: '25%', textAlign: 'center' }}>
                ABOUT
              </div>

              <div style={{ width: '25%', textAlign: 'center' }}>
                SKILLS
              </div>

              <div style={{ width: '25%', textAlign: 'center' }}>
                PROJECTS
              </div>

              <div style={{ width: '25%', textAlign: 'center' }}>
                ACTIVITY
              </div>

            </div>

            {/* Right side container for right arrow */}
            <div style={{ width: '10%', textAlign: 'center' }}>
              <FontAwesomeIcon icon={faCaretRight} style={{ fontSize: '35px', marginTop: '-6px' }} />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
