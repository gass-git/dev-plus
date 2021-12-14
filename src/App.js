import React, {useState, useEffect, Fragment } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStackOverflow, faGithub, faLinkedin, faCodepen} from "@fortawesome/free-brands-svg-icons";
import {faSearch, faCode} from "@fortawesome/free-solid-svg-icons";
import {faKeyboard} from "@fortawesome/free-regular-svg-icons";


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
  let space1 = <Fragment>&nbsp;</Fragment>,
      space2 = <Fragment>&nbsp;&nbsp;</Fragment>,
      space3 = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

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
    preload();
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

  function preload(){
    // Remove horizontal scrollbar 
   document.body.classList.add("animation");
    
  }

  return [
    <Fragment key="main-component-identifier">

      {/* -- Main wrapper -- */}
      <main className="main-wrapper" data-aos="zoom-in" data-aos-duration="500">
        
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
                  {selected === "projects" ? <Projects repos={repos} space3={space3} /> : null}
                  {selected === "activity" ? <Activity answers={answers} gitEvents={gitEvents} posts={posts} /> : null}
                </div>
              </div>
            </div>
        </section>
      </main>     

      <footer>
       
        <section className="left-area">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize:"25px", margin:"0 40px 0 35px" }}  className="fa-icon" />
          <FontAwesomeIcon icon={faStackOverflow} style={{ fontSize:"26px", margin:"0 40px 0 0" }} className="fa-icon"/>
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize:"26px", margin:"0 40px 0 0" }}  className="fa-icon" />
          <FontAwesomeIcon icon={faCodepen} style={{ fontSize:"22px", margin:"3px 40px 0 0" }} className="fa-icon" />
        </section>

        <section className="center-area">
            <a href="https://github.com/gass-git/dev-plus" target="_blank">
              © DevPlus
            </a>
            {space1}        
              rendered in <span id="render-time"></span> MS
              -
            Inspired by 
            <a  className="color-two" href="https://www.rpgmakerweb.com/" target="_blank">
              {space1} rpg maker 
            </a> 
            {space1}
            designs 
        </section>
          
        <section className="right-area">
          <a style={{ marginLeft:"0px" }} href="https://gass.dev">
            <img src="https://img.shields.io/github/package-json/v/gass-git/dev-plus?style=flat-square&logo=appveyor&color=orange"/>
          </a>
          <a id="repo-size-badge" href="https://github.com/gass-git/dev-plus" target="_blank">
            <img src="https://img.shields.io/github/repo-size/gass-git/dev-plus?style=flat-square"/>
          </a>
          <a style={{marginRight:"20px"}} href="https://github.com/gass-git/dev-plus" target="_blank">
            <img src="https://img.shields.io/github/license/gass-git/dev-plus?style=flat-square"/>
          </a>
        </section>

        
        </footer> 
          
        


    </Fragment>
  ]
}
