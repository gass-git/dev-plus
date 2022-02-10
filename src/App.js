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

    default:
      return initialState
  }
}

const initialState = {
  uniqueVisits: '000000',
  userLocation: 'Planet Earth',
  scores: []
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { uniqueVisits, userLocation, scores } = state

  // Spaces
  const space1 = <span>&nbsp;</span>
  const space2 = <span>&nbsp;&nbsp;</span>
  const space3 = <span>&nbsp;&nbsp;&nbsp;</span>

  // API 
  const [selected, setSelected] = useState('about')
  const [gitEvents, setGitEvents] = useState([])
  const [repos, setRepos] = useState([])
  const [posts, setPosts] = useState([])
  const [lastPost, setLastPost] = useState([])

  // Stack Overflow variables
  const [reputation, setReputation] = useState([])
  const [answers, setAnswers] = useState([])
  //const [scores, setScores] = useState([])

  // ScrollDisplay variables
  const scrollerDelay = 20 // Duration in seconds 
  const maxIndex = 5
  const [scrollerSwitch, setScrollerSwitch] = useState('on')
  const [lastCommit, setLastCommit] = useState([])
  const [lastAnswer, setLastAnswer] = useState()
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    AOS.init()
    processVisit()
    getUniqueVisits({ dispatch })
    getUserLocation({ dispatch })
    getWritings({ setPosts, setLastPost })
    getReputation({ setReputation })
    getRepos({ setRepos })
    getAnswers({ setAnswers, setLastAnswer })
    getGitEvents({ setGitEvents, setLastCommit })
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
      value={{
        space1,
        space2,
        space3,
        reputation,
        scores,
        repos,
        answers,
        gitEvents,
        posts,
        scrollerSwitch,
        lastCommit,
        lastAnswer,
        lastPost,
        msgIndex,
        uniqueVisits,
        userLocation
      }}
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
            <MainMenu setSelected={setSelected} />
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
