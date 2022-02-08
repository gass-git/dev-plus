import React, { useState, useEffect } from 'react'
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

export default function App() {
  const space1 = <span>&nbsp;</span>
  const space2 = <span>&nbsp;&nbsp;</span>
  const space3 = <span>&nbsp;&nbsp;&nbsp;</span>

  // API 
  const [userLocation, setUserLocation] = useState(),
    [selected, setSelected] = useState('about'),
    [uniqueVisits, setUniqueVisits] = useState(),
    [gitEvents, setGitEvents] = useState([]),
    [repos, setRepos] = useState([]),
    [posts, setPosts] = useState([]),
    [lastPost, setLastPost] = useState([]);

  // Stack Overflow variables
  const [reputation, setReputation] = useState([]),
    [answers, setAnswers] = useState([]),
    [scores, setScores] = useState([]);

  // ScrollDisplay variables
  const scrollerDelay = 20, // Duration in seconds 
    maxIndex = 5,
    [scrollerSwitch, setScrollerSwitch] = useState('on'),
    [lastCommit, setLastCommit] = useState([]),
    [lastAnswer, setLastAnswer] = useState(),
    [msgIndex, setMsgIndex] = useState(0);


  useEffect(() => {
    AOS.init()
    processVisit()
    getUniqueVisits({ setUniqueVisits })
    getUserLocation({ setUserLocation })
    getWritings({ setPosts, setLastPost })
    getReputation({ setReputation })
    getRepos({ setRepos })
    getAnswers({ setAnswers, setLastAnswer })
    getGitEvents({ setGitEvents, setLastCommit })
    getSkillScores({ setScores })
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
        posts
      }}
      key={'ctx-key'}
    >

      {/* -- Main wrapper -- */}
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">

        {/* -- First row -- */}
        <section className="first-row">
          <ScrollDisplay
            scrollerSwitch={scrollerSwitch}
            lastCommit={lastCommit}
            lastAnswer={lastAnswer}
            lastPost={lastPost}
            msgIndex={msgIndex}
            uniqueVisits={uniqueVisits}
            userLocation={userLocation}
          />
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
