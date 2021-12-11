import React, {useState, useEffect, useReducer, Fragment } from 'react';
import {useTransition, animated} from 'react-spring';
import wizard from  "./assets/images/wizard-v6.gif"
import {preload, preloadMessages} from './preload';
import {reducer, initState} from './reducer';

// APIs
import {getAnswers, getReputation, getSkillScores} from './api/stackOverflow';
import {getRepos, getGitEvents} from './api/github';
import {processVisit, getUniqueVisits, getUserLocation} from './api/visits';
import getWritings from './api/getWritings';
import AOS from 'aos';
import 'aos/dist/aos.css';


// Components
import Activity from './components/activity/index';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';
import aos from 'aos';

export default function App(){
  const [state, dispatch] = useReducer(reducer, initState);
  const {isLoading, showBackground, isMenuActive} = state;

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
  var maxIndex = 4, scrollerDelay = 20; // Duration in seconds 

  useEffect(() => {
    AOS.init();
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
      <div className={showBackground ? "bg-image" : null}/>

      {/* -- Main wrapper -- */}
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="700">
        
        {/* -- First row -- */} 
  
            <div className="first-row">
              <ScrollDisplay 
                scrollerSwitch={scrollerSwitch}
                lastCommit={lastCommit}
                lastAnswer={lastAnswer}
                lastPost={lastPost}
                msgIndex={msgIndex}
                uniqueVisits={uniqueVisits}
                userLocation={userLocation}
              />
            </div>
            

        {/* -- Second row -- */}
        <section className="second-row">
          
            <div  className="left-side">
              <MainMenu 
                setSelected={setSelected}
                isMenuActive={isMenuActive}
              />
            </div>
            
          
            <div  className="right-side">
              <BasicInfo reputation={reputation} avatarGlitch={avatarGlitch}/>
            </div>
            
        </section>

        {/* -- Third row -- */}
        <section className="third-row">
          
            <div  className="content-display">
              <div className="border-img">
                <div className="inner-container">
                  {selected === "about" ? <About /> : null}
                  {selected === "skills" ? <Skills scores={scores}/> : null} 
                  {selected === "projects" ? <Projects repos={repos} /> : null}
                  {selected === "activity" ? <Activity answers={answers} gitEvents={gitEvents} posts={posts} /> : null}
                </div>
              </div>
            </div>
              
        </section>
      </main>      
    </Fragment>
  ]
}
