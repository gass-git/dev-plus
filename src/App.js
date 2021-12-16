import React, {useState, useEffect, Fragment } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStackOverflow, faGithub, faLinkedin, faCodepen} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faSearch, faGamepad} from "@fortawesome/free-solid-svg-icons";

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

        {/* -- Fourth row -- */}
        <section className="fourth-row">

              <div className="border-img">
                <div className="inner-container">
                  <div className="icons-wrapper">
                  <a href="https://github.com/gass-git" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} style={{ fontSize:"35px",marginTop:"1px" }} className="fa-icon"/>
          </a>
          <a href="https://stackoverflow.com/users/14895985/gass?tab=profile" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faStackOverflow} style={{ fontSize:"36px" }} className="fa-icon"/>
          </a>
          <a href="https://www.linkedin.com/in/gabriel-salinas-szada-7a188196" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize:"36px", marginLeft:"6px" }}  className="fa-icon" />
          </a>
          <a href="https://codesandbox.io/u/g.szada" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faCodepen} style={{ fontSize:"33px",marginTop:"2px" }} className="fa-icon" />
          </a>
          <a href="https://codereview.stackexchange.com/users/239120/gass?tab=profile" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSearch} style={{ fontSize:"31px",marginTop:"2px" }} className="fa-icon" />
          </a>
                  </div>
                </div>
              </div>
            
        </section>

        

      </main>     



      
      <footer>

         

         
       
      

      <div className="credits">
          <a href="https://gass.dev" className="credit-link">
            <span style={{color:"white", fontSize:"14px"}}>@</span> Gass.dev
          </a>
          {space2}   
          <a style={{marginLeft:"0px"}} href="https://gass.dev">
            <img src="https://img.shields.io/github/package-json/v/gass-git/dev-plus?style=plastic&color=orange" alt="version"/>
          </a>
          {space2}
          
              <div className='txt'>  
              -
              {space2}
              rendered in <span style={{color:"rgb(144,238,144)"}} id="render-time"></span> MS
              {space2}
              -
              </div>
              {space2} 
              <a  href="https://github.com/gass-git/dev-plus" target="_blank" rel="noreferrer">
                <img src="https://img.shields.io/github/license/gass-git/dev-plus?style=plastic" alt="License name"/>
              </a>
              {space2}
              
              <div className='txt'>
                -
              {space2}
            Inspired by 
            </div>
            <FontAwesomeIcon style={{ margin:"-1px 2px 0 4px",fontSize:"20px" }} icon={faGamepad}/>
            <a className="credit-link" href="https://www.rpgmakerweb.com/" target="_blank" rel="noreferrer">
              {space1}RPG maker 
            </a> 
            <div className="txt">
            {space1}
            designs
            {space1}
            
            </div>
            
            
        
        </div>

      </footer> 
      
      


    </Fragment>
  ]
}
