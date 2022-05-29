import React, { useContext, useEffect, useState } from 'react'
import './mainMenu.css'
import useSound from 'use-sound'
import selectionSound from '../../assets/sounds/game-selection-sound.wav'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function MainMenu() {
  const { state, dispatch } = useContext(AppContext)
  const { selected } = state
  const [floorNumber, setFloorNumber] = useState(4)
  const [playSwitchSound] = useSound(selectionSound, { volume: 1 })
  const navigate = useNavigate()

  useEffect(() => {
    if (selected === 'about') { setFloorNumber(4) }
    else if (selected === 'skills') { setFloorNumber(3) }
    else if (selected === 'projects') { setFloorNumber(2) }
    else if (selected === 'activity') { setFloorNumber(1) }
  }, [selected])

  function select(entry) {
    dispatch({
      type: 'update selected',
      optionSelected: entry
    })
    playSwitchSound()
    navigate(`../${entry}`)

    // Elevator
    if (entry === 'about') { setFloorNumber(4) }
    else if (entry === 'skills') { setFloorNumber(3) }
    else if (entry === 'projects') { setFloorNumber(2) }
    else if (entry === 'activity') { setFloorNumber(1) }
  }

  return (
    <section key='main-menu-identifier' className='main-menu'>
      <div className='border-img'>
        <div className='inner-container'>
          <div className='menu-wrapper'>
            <div className='option' onClick={() => select('about')}>
              <div
                className='label'>
                About
              </div>
            </div>
            <div className='option' onClick={() => select('skills')}>
              <div className='label'>
                Skills
              </div>
            </div>
            <div className='option' onClick={() => select('projects')}>
              <div className='label'>
                Projects
              </div>
            </div>
            <div className='option' onClick={() => select('activity')}>
              <div className='label'>
                Activity
              </div>
            </div>

            {/* -- Elevator -- */}
            <div className={`elevator floor-${floorNumber}`}>
            </div>
            {/* -------------- */}

          </div>
        </div>
      </div>
    </section>
  )
}