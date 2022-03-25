import React from 'react'
import './topNavBar.css'
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function TopNavBar() {
  const { width } = useWindowDimensions()

  const LeftArrow = () => {
    if (width >= 800) return (
      <div
        style={{
          width: '10%',
          textAlign: 'center',
          marginTop: '-7px',
          opacity: 0.2
        }}
      >
        <FontAwesomeIcon icon={faCaretLeft} style={{ fontSize: '35px' }} />
      </div>
    )

    if (width < 800) return (
      <div
        style={{
          width: '10%',
          textAlign: 'center',
          marginTop: '-7px',
          opacity: 0.9,
          cursor: 'pointer'
        }}
      >
        <FontAwesomeIcon icon={faCaretLeft} style={{ fontSize: '35px' }} />
      </div>
    )
  }

  const RightArrow = () => {
    if (width >= 800) return (
      <div style={{
        width: '10%',
        textAlign: 'center',
        marginTop: '-7px',
        opacity: 0.2
      }}>
        <FontAwesomeIcon icon={faCaretRight} style={{ fontSize: '35px' }} />
      </div>
    )

    if (width < 800) return (
      <div style={{
        width: '10%',
        textAlign: 'center',
        marginTop: '-7px',
        opacity: 0.9,
        cursor: 'pointer'
      }}>
        <FontAwesomeIcon icon={faCaretRight} style={{ fontSize: '35px' }} />
      </div>
    )
  }

  return (
    <section className='top-nav-bar'>
      <div className="border-img">
        <div className="inner-container">
          <div className='wrapper'>

            {/* Left side container for left arrow */}
            <LeftArrow />

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
            <RightArrow />

          </div>
        </div>
      </div>
    </section>
  )
}
