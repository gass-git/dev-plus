import React, { useEffect, useReducer } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { appReducer, initialState, ACTIONS } from './stateCapsule'

// ---------------------------------------------------------------------------
import {
  getAnswers, getReputation, getSkillScores, getRepos,
  getGitEvents, processVisit, getUniqueVisits, getUserLocation, getWritings
} from './importsAPI'

// ---------------------------------------------------------------------------
import {
  Activity, ScrollDisplay, MainMenu, BasicInfo, Projects,
  Skills, About, FooterContent, Links
} from './componentsImports'
// ---------------------------------------------------------------------------

export const AppContext = React.createContext(null)

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { SCROLLER_OFF, SCROLLER_ON, NEXT_MSG } = ACTIONS;

  useEffect(() => {
    AOS.init()
    processVisit()
    getUniqueVisits({ dispatch })
    getUserLocation({ dispatch })
    getWritings({ dispatch })
    getReputation({ dispatch })
    getRepos({ dispatch })
    getAnswers({ dispatch })
    getGitEvents({ dispatch })
    getSkillScores({ dispatch })
  }, [])

  useEffect(() => {
    let interval = setInterval(() => {
      dispatch({ type: SCROLLER_OFF })
      dispatch({ type: NEXT_MSG })

      // Once changes have been made, turn scroller back on
      setTimeout(() => {
        dispatch({ type: SCROLLER_ON })
      }, 500)
    }, state.scrollerDelay * 1000 + 500);

    return () => clearInterval(interval)
  })

  return [
    <AppContext.Provider value={{ state, dispatch }} key={'ctx-key'}>
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">

        <section className="first-row">
          <ScrollDisplay />
        </section>

        <section className="second-row">
          <div className="left-side">
            <MainMenu />
          </div>
          <div className="right-side">
            <BasicInfo />
          </div>
        </section>

        <section className="third-row">
          <div className="content-display">
            <div className="border-img">
              <div className="inner-container">
                <Routes>
                  <Route path='*' element={<Navigate to='/' />} />
                  <Route path='/' element={<About />} />
                  <Route path='about' element={<About />} />
                  <Route path='skills' element={<Skills />} />
                  <Route path='projects' element={<Projects />} />
                  <Route path='activity' element={<Activity />} />
                </Routes>
              </div>
            </div>
          </div>
        </section>

        <section className="fourth-row">
          <Links />
        </section>
      </main>

      <footer>
        <FooterContent />
      </footer>
    </AppContext.Provider>
  ]
}
