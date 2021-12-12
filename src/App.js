import React, {useState, useEffect, Fragment } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

export default function App(){
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
  var scrollerDelay = 20; // Duration in seconds 
  const [scrollerSwitch, setScrollerSwitch] = useState('on'),
        [lastCommit, setLastCommit] = useState([]),
        [lastAnswer, setLastAnswer] = useState(),
        [msgIndex, setMsgIndex] = useState(0),
        maxIndex = 4;

  useEffect(() => {
    AOS.init();
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
      setScrollerSwitch('off'); 

      // Switch to the next message
      msgIndex < maxIndex ? setMsgIndex(msgIndex + 1) : setMsgIndex(0);
      
      // Once changes have been made turn scroller back on
      setTimeout(()=>{setScrollerSwitch('on')}, 500);
    }, scrollerDelay * 1000 + 500);
    
    return () => clearInterval(interval);
  });

  return [
    <Fragment key="main-component-identifier">
      {/* -- Background image -- not wrapper -- */}
      {/*<div className={showBg ? "bg-image" : null}/>*/}

      {/* -- Main wrapper -- */}
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="900">
        
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
            <MainMenu setSelected={setSelected}/>
          </div>
            
          <div  className="right-side">
            <BasicInfo reputation={reputation} />
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
