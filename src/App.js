import React, {useState, useEffect, useReducer, Fragment } from 'react';
import {useTransition, animated} from 'react-spring';
import wizard from  "./assets/images/wizard-v6.gif"
import {preload, preloadMessages} from './globalFunctions';

// APIs
import {getAnswers, getReputation, getSkillScores} from './api/stackOverflow';
import {getRepos, getGitEvents} from './api/github';
import {processVisit, getUniqueVisits, getUserLocation} from './api/visits';
import getWritings from './api/getWritings';

// Components
import Activity from './components/activity/index';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';

// Reducer is in charge of the preload states
function reducer(state, action){
  switch(action){
    case 'turn off loading':  return {...state, isLoading: false};
    case 'show gif': return {...state, showGif: true};
    case 'remove gif':return {...state, showGif: false};
    case 'show msg one':return {
                          ...state,
                          message: 'Casting spells to collect data',
                          msgNumber: 'one'
                        };
    case 'show msg two':return {
                          ...state,
                          message: 'Fetch completed',
                          msgNumber: 'two'
                        };
    case 'remove message':return {
                          ...state,
                          message: null,
                          msgNumber: null
                          };
    case 'show component one': return {...state, showCompOne: true};
    case 'show component two': return {...state, showCompTwo: true};
    case 'show component three': return {...state, showCompThree: true};
    case 'show component four': return {...state,showCompFour: true};
    case 'activate menu': return {...state, isMenuActive: true};
    default: return state;
  }
};
const initState = {
  isLoading: true,
  isMenuActive: false,
  showGif: false,
  message: null,
  msgNumber: null,
  showCompOne: false,
  showCompTwo: false,
  showCompThree: false,
  showCompFour: false
};

export default function App(){
  const [state, dispatch] = useReducer(reducer, initState);
  const {isLoading, showGif, message, msgNumber, isMenuActive} = state;
  const {showCompOne, showCompTwo,showCompThree,showCompFour} = state;

  // API 
  const [userLocation, setUserLocation] = useState();
  const [selected, setSelected] = useState('about');
  const [uniqueVisits, setUniqueVisits] = useState();
  const [gitEvents, setGitEvents] = useState([]);
  const [repos, setRepos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState([]);

  // Avatar glitch effect
  const [avatarGlitch, setAvatarGlitch] = useState(true);
  var glitchDuration = 5; // Duration in seconds 

  // Stack Overflow variables
  const [reputation, setReputation] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState([]);

  // ScrollDisplay variables
  const [scrollerSwitch, setScrollerSwitch] = useState('on');
  const [lastCommit, setLastCommit] = useState([]);
  const [lastAnswer, setLastAnswer] = useState(); 
  const [msgIndex, setMsgIndex] = useState(0);
  var maxIndex = 3, scrollerDelay = 20; // Duration in seconds 

  // Transitions
  const transitionOne = useTransition(showCompOne, {
    from: { x: 0, y: -100, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });
  const transitionTwo = useTransition(showCompTwo, {
    from: { x: -100, y: 800, opacity: 0},
    enter: item => async(next) => {
      await next({ x:-100, y:0, opacity:1});
      await next({ x:0 });
    }
  });
  const transitionThree = useTransition(showCompThree, {
    from: { x: 800, y: 0, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });
  const transitionFour = useTransition(showCompFour, {
    from: { x: 0, y: 600, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });

  useEffect(() => {
    preload({dispatch});
    processVisit();
    getUniqueVisits({setUniqueVisits});
    getUserLocation({setUserLocation});
    getWritings({setPosts, setLastPost});
    getReputation({setReputation});
    getRepos({setRepos});
    getAnswers({setAnswers, setLastAnswer});
    getGitEvents({setGitEvents, setLastCommit});
    getSkillScores({setScores});
  }, []);

  useEffect(() => {
    var interval = setInterval(() => {
      
      // Turn off scroller to make changes
      setScrollerSwitch('off')
      
      // This changes the message to be displayed
      msgIndex < maxIndex ? setMsgIndex(msgIndex + 1) : setMsgIndex(0);
      
      // Once changes have been made turn scroller back on
      setTimeout(()=>{
        setScrollerSwitch('on');
      }, 1000)
      
      // --- Avatar glitch effect ---
      // msRange: generate random number inside this range
      var msRange = (scrollerDelay - 7) * 1000,
        random = Math.random() * msRange;
     
      // Turn glitch effect on
      setTimeout(() => {
        setAvatarGlitch(true);
      }, random)

      // Turn glitch effect off after glitch duration
      setTimeout(() => {
        setAvatarGlitch(false);
      }, random + glitchDuration * 1000)

    }, scrollerDelay * 1000 + 1000);

    return () => clearInterval(interval);
  });

  return [
    <Fragment key="main-component-identifier">
      {/* -- Background image -- not wrapper -- */}
      <div className={showCompFour ? "bg-image" : null } />

      {/* -- Preloader -- */}
      <main className={isLoading ? "loader" : "no-loader"}>
        <section className="center-wrapper">
          <div className="gif-frame">
            {showGif ? <img src={wizard} alt="Wizard gif"/> : null}
          </div>
          { preloadMessages({message, msgNumber})}
        </section>    
      </main>

      {/* -- Main wrapper -- */}
      <main className={isLoading ? null : "main-wrapper"}>
        
        {/* -- First row -- */} 
        {transitionOne((style, item) => 
            item ? 
            <animated.div key="animation-one" style={style} className="first-row">
              <ScrollDisplay 
                scrollerSwitch={scrollerSwitch}
                lastCommit={lastCommit}
                lastAnswer={lastAnswer}
                lastPost={lastPost}
                msgIndex={msgIndex}
                uniqueVisits={uniqueVisits}
                userLocation={userLocation}
              />
            </animated.div>
            :
            null
        )}

        {/* -- Second row -- */}
        <section className="second-row">
          {transitionTwo((style, item) => 
            item ? 
            <animated.div key="animation-two" style={style} className="left-side">
              <MainMenu 
                setSelected={setSelected}
                isMenuActive={isMenuActive}
              />
            </animated.div>
            : 
            null
          )}
          {transitionThree((style, item) => 
            item ? 
            <animated.div key="animation-three" style={style} className="right-side">
              <BasicInfo reputation={reputation} avatarGlitch={avatarGlitch}/>
            </animated.div>
            : 
            null
          )}
        </section>

        {/* -- Third row -- */}
        <section className="third-row">
          {transitionFour((style, item) => 
            item ? 
            <animated.div key="animation-four" style={style} className="content-display">
              <div className="border-img">
                <div className="inner-container">
                  {selected === "about" ? <About /> : null}
                  {selected === "skills" ? <Skills scores={scores}/> : null} 
                  {selected === "projects" ? <Projects repos={repos} /> : null}
                  {selected === "activity" ? <Activity answers={answers} gitEvents={gitEvents} posts={posts} /> : null}
                </div>
              </div>
            </animated.div>
              : 
              null
          )}
        </section>
      </main>      
    </Fragment>
  ]
}
