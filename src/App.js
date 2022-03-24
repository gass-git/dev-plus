// ---------------------------------------------------------------------------
import React, { useEffect, useReducer } from 'react'
import { appReducer, initialState, ACTIONS } from './stateCapsule'
import Layout from './skeleton/layout'
import AOS from 'aos'
import 'aos/dist/aos.css'
// ---------------------------------------------------------------------------
import {
  getAnswers, getReputation, getSkillScores, getRepos, getGitEvents, processVisit,
  getUniqueVisits, getUserLocation, getWritings
} from './utilities/importsAPI'
// ---------------------------------------------------------------------------


export const AppContext = React.createContext(null)

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const { SCROLLER_OFF, SCROLLER_ON, NEXT_MSG } = ACTIONS

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

  return (
    <AppContext.Provider value={{ state, dispatch }} key={'ctx-key'}>
      <Layout />
    </AppContext.Provider>
  )
}
