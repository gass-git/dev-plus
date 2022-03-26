import React, { useEffect, useState } from 'react'
import './topNavBar.css'
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export default function TopNavBar() {
  const { width } = useWindowDimensions()
  const [isLeftActive, setLeftActive] = useState(false)
  const [isRightActive, setRightActive] = useState(false)
  const [distanceX, setDistanceX] = useState(0)
  const [translate, setTranslate] = useState(false)

  useEffect(() => {
    console.log(width)
    if (width < 830) {
      setRightActive(true)
      setDistanceX(830 - width)
    }
    else setRightActive(false)
  }, [width])

  const LeftArrow = () => {
    if (width >= 800) return (
      <div style={{ opacity: 0.2 }} >
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
    )

    if (width < 800) return (
      <div style={{ opacity: 0.9, cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
    )
  }

  const RightArrow = () => {


    return (
      <>
        {
          isRightActive ?
            <div style={{ opacity: 0.9, cursor: 'pointer' }} onClick={() => setTranslate(!translate)}>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
            :
            <div style={{ opacity: 0 }}>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
        }
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

            <div className='flex-hide-inner-overflow'>
              {
                translate ?
                  <div className='rigid-700-container'>

                    <div className='option'>
                      ABOUT
                    </div>

                    <div className='option'>
                      SKILLS
                    </div>

                    <div className='option'>
                      PROJECTS
                    </div>

                    <div className='option'>
                      ACTIVITY
                    </div>

                  </div>
                  :
                  <div className='rigid-700-container' style={{ transform: `translateX(-${distanceX}px)` }}>

                    <div className='option'>
                      ABOUT
                    </div>

                    <div className='option'>
                      SKILLS
                    </div>

                    <div className='option'>
                      PROJECTS
                    </div>

                    <div className='option'>
                      ACTIVITY
                    </div>

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
