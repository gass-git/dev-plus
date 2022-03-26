import React, { useEffect, useState } from 'react'
import './topNavBar.css'
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function TopNavBar() {
  const { width } = useWindowDimensions()
  const [isRightActive, setRightActive] = useState(false)
  const [distanceX, setDistanceX] = useState(0)
  const [translate, setTranslate] = useState(false)
  const [current, setCurrent] = useState('about')

  useEffect(() => {
    if (width < 600 && width > 500) {
      setRightActive(true)
      setDistanceX(135)
    }
    else if (width <= 500 && width > 400) {
      setRightActive(true)
      setDistanceX(320)
    }
    else if (width <= 400 && width > 370) {
      setRightActive(true)
      setDistanceX(295)
    }
    else if (width <= 370 && width > 340) {
      setRightActive(true)
      setDistanceX(255)
    }
    else if (width <= 340 && width > 300) {
      setRightActive(true)
      setDistanceX(223)
    }
    else if (width <= 300) {
      setRightActive(true)
      setDistanceX(193)
    }
    else {
      setDistanceX(0)
      setRightActive(false)
    }
  }, [width])

  const LeftArrow = () => {
    if (translate) {
      return (
        <div className='enabled-arrow' onClick={() => setTranslate(false)}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </div>
      )
    }
    else {
      return (
        <div className='disabled-arrow'>
          <FontAwesomeIcon icon={faCaretLeft} />
        </div>
      )
    }
  }

  const RightArrow = () => {
    if (isRightActive && translate === false) {
      return (
        <div className='enabled-arrow' onClick={() => setTranslate(true)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
      )
    }
    else {
      return (
        <div className='disabled-arrow'>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
      )
    }
  }

  const Options = () => {
    return (
      <>
        <div
          className='option'
          onClick={() => setCurrent('about')}
        >
          {
            current === 'about' ?
              <span className='selected'>ABOUT</span>
              :
              <span>ABOUT</span>
          }
        </div>

        <div
          className='option'
          onClick={() => setCurrent('skills')}
        >
          {
            current === 'skills' ?
              <span className='selected'>SKILLS</span>
              :
              <span>SKILLS</span>
          }
        </div>

        <div
          className='option'
          onClick={() => setCurrent('projects')}
        >
          {
            current === 'projects' ?
              <span className='selected'>PROJECTS</span>
              :
              <span>PROJECTS</span>
          }
        </div>

        <div
          className='option'
          onClick={() => setCurrent('activity')}
        >
          {
            current === 'activity' ?
              <span className='selected'>ACTIVITY</span>
              :
              <span>ACTIVITY</span>
          }
        </div>
      </>
    )
  }

  return (
    <section className='top-nav-bar'>
      <div className="border-img">
        <div className="inner-container">
          <div className='wrapper'>

            <div className='arrow-box'>
              <LeftArrow />
            </div>

            <div className='flex-overflow'>
              {
                translate ?
                  <div className='options-container' style={{ transform: `translateX(-${distanceX}px)` }}>
                    <Options />
                  </div>
                  :
                  <div className='options-container'>
                    <Options />
                  </div>
              }
            </div>

            <div className='arrow-box'>
              <RightArrow />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
