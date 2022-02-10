import React, { useState, useEffect, useReducer } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// APIs
import { getAnswers, getReputation, getSkillScores } from './api/stackOverflow'
import { getRepos, getGitEvents } from './api/github'
import { processVisit, getUniqueVisits, getUserLocation } from './api/visits'
import getWritings from './api/getWritings'

// Components
import Activity from './components/activity/index'
import ScrollDisplay from './components/scrollDisplay/index'
import MainMenu from './components/mainMenu/index'
import BasicInfo from './components/basicInfo/index'
import Projects from './components/projects/index'
import Skills from './components/skills/index'
import About from './components/about/index'
import FooterContent from './components/footerContent/index'
import Links from './components/links/index'

export const AppContext = React.createContext(null)

function appReducer(state, action) {
  switch (action.type) {
    case 'set unique visits count':
      return {
        ...state,
        uniqueVisits: action.count
      }

    case 'set user location':
      return {
        ...state,
        userLocation: action.location
      }

    case 'set skill scores':
      return {
        ...state,
        scores: action.scores
      }

    case 'set posts':
      return {
        ...state,
        posts: action.posts,
        lastPost: action.lastPost
      }

    case 'set reputation data':
      return {
        ...state,
        reputation: action.reputation
      }

    case 'set repos':
      return {
        ...state,
        repos: action.repos
      }

    case 'set latest events and last commit':
      return {
        ...state,
        gitEvents: action.latestFourEvents,
        lastCommit: action.latestCommit
      }

    case 'set latest answers':
      return {
        ...state,
        answers: action.latestAnswers,
        lastAnswer: action.lastAnswer
      }

    case 'update selected':
      return {
        ...state,
        selected: action.optionSelected
      }

    default:
      return initialState
  }
}
const initialState = {
  uniqueVisits: '000000',
  userLocation: 'Planet Earth',
  scores: [],
  posts: [],
  lastPost: {},
  reputation: {},
  repos: [],
  gitEvents: [],
  lastCommit: {},
  answers: [],
  lastAnswer: '',
  scrollerDelay: 20, // Duration in seconds 
  maxIndex: 5,
  selected: 'about'
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { selected, scrollerDelay, maxIndex } = state

  // ScrollDisplay variables
  const [scrollerSwitch, setScrollerSwitch] = useState('on')
  const [msgIndex, setMsgIndex] = useState(0)

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
      setScrollerSwitch('off')

      // Switch to the next message
      msgIndex < maxIndex ? setMsgIndex(msgIndex + 1) : setMsgIndex(0)

      // Once changes have been made turn scroller back on
      setTimeout(() => { setScrollerSwitch('on') }, 500)
    }, scrollerDelay * 1000 + 500);

    return () => clearInterval(interval)
  })

  return [
    <AppContext.Provider
      value={{ scrollerSwitch, msgIndex, state, dispatch }}
      key={'ctx-key'}
    >

      {/* -- Main wrapper -- */}
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">

        {/* -- First row -- */}
        <section className="first-row">
          <ScrollDisplay />
        </section>

        {/* -- Second row -- */}
        <section className="second-row">
          <div className="left-side">
            <MainMenu />
          </div>
          <div className="right-side">
            <BasicInfo />
          </div>
        </section>

        {/* -- Third row -- */}
        <section className="third-row">
          <div className="content-display">
            <div className="border-img">
              <div className="inner-container">
                {selected === "about" ? <About /> : null}
                {selected === "skills" ? <Skills /> : null}
                {selected === "projects" ? <Projects /> : null}
                {selected === "activity" ? <Activity /> : null}
              </div>
            </div>
          </div>
        </section>

        {/* -- Fourth row -- */}
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
