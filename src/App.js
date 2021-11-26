import React, {useState, useEffect, Fragment } from 'react';
import {useTransition, animated} from 'react-spring';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';
import Activity from './components/activity/index';
import processVisit from './api/processVisit';
import getUniqueVisits from './api/getUniqueVisits';
import getSkillScores from './api/getSkillScores';
import getWritings from './api/getWritings';
import getReputation from './api/getReputation';
import getRepos from './api/getRepos';
import getGitEvents from './api/getGitEvents';
import getAnswers from './api/getAnswers';
import pixelChar from  "./assets/images/pixel-char-three.gif"

const App = () => {
  var [loading, setLoading] = useState(true);
  var [showBgImage, setShowBgImage] = useState(false);
  
  // For animation effect on page preload
  var [showComponentOne, setShowComponentOne] = useState(false); 
  var [showComponentTwo, setShowComponentTwo] = useState(false); 
  var [showComponentThree, setShowComponentThree] = useState(false); 
  var [showComponentFour, setShowComponentFour] = useState(false); 

  var [selected, setSelected] = useState('about');
  var [avatarGlitch, setAvatarGlitch] = useState(false);
  var [uniqueVisits, setUniqueVisits] = useState();
  var [gitEvents, setGitEvents] = useState([]);
  var [repos, setRepos] = useState([]);
  var [posts, setPosts] = useState([]);
  var [lastPost, setLastPost] = useState([]);

  // Stack Overflow variables
  var [reputation, setReputation] = useState([]);
  var [answers, setAnswers] = useState([]);
  var [scores, setScores] = useState([]);

  // ScrollDisplay variables
  var [lastCommit, setLastCommit] = useState([]);
  var [lastAnswer, setLastAnswer] = useState(); 
  var [msgIndex, setMsgIndex] = useState(0);
  var maxIndex = 3; 
  var scrollInterval = 25; // Seconds it takes for the scroll animation

  function loadProcess() {
    document.body.classList.add("animation");
    
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    setTimeout(() => {
      setShowComponentOne(true);
    }, 3300);

    setTimeout(() => {
      setShowComponentTwo(true);
    }, 3600);

    setTimeout(() => {
      setShowComponentThree(true);
    }, 3800);

    setTimeout(() => {
      setShowComponentFour(true);
    }, 4300);

    setTimeout(() => {
      document.body.classList.remove("animation");
      setShowBgImage(true);
    }, 4800);
  }

  useEffect(() => {
    loadProcess();
    processVisit();
    getUniqueVisits({setUniqueVisits});
    getWritings({setPosts, setLastPost});
  //  getReputation({setReputation});
  //  getRepos({setRepos});
  //  getAnswers({setAnswers, setLastAnswer});
  //  getGitEvents({setGitEvents, setLastCommit});
  //  getSkillScores({setScores});
  }, []);

  useEffect(() => {
    var interval = setInterval(() => {
      // Variables for ScrollDisplay
      msgIndex < maxIndex ? setMsgIndex(msgIndex + 1) : setMsgIndex(0);

      // --- Avatar glitch effect ---
      // msRange: miliseconds range to generate in random
      var msRange = (scrollInterval - 7) * 1000;
      var glitchDuration = 5000; // miliseconds
      var random = Math.random() * msRange;
     
      // Turn effect on
      setTimeout(() => {
        setAvatarGlitch(true);
      }, random)

      // Turn effect off
      setTimeout(() => {
        setAvatarGlitch(false);
      }, random + glitchDuration)

    }, scrollInterval * 1000);
    return () => clearInterval(interval);
  });

  const transitionOne = useTransition(showComponentOne, {
    from: { x: 0, y: -100, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });

  const transitionTwo = useTransition(showComponentTwo, {
    from: { x: -200, y: 800, opacity: 0},
    enter: item => async(next) => {
      await next({ x:-200, y:0, opacity:1});
      await next({ x:0 });
    }
  });

  const transitionThree = useTransition(showComponentThree, {
    from: { x: 800, y: 0, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });

  const transitionFour = useTransition(showComponentFour, {
    from: { x: 0, y: 600, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });

  return [
    <Fragment>
      {/* -- SPINNER -- */}
      <div className={loading ? "loader-2" : "no-loader"}>
        <img src={pixelChar} />
        <div>
          Casting spells to retrieve data..
        </div>
      </div>

      <div className={showBgImage ? "bg-mask opacity-0" : "bg-mask"}>
      </div>

      <div className={loading ? "hide-page" : "show-page"}>
        {/* -- FIRST ROW -- */} 
        {transitionOne((style, item) => 
            item ? 
            <animated.div style={style} className="first-row">
              <ScrollDisplay 
                lastCommit={lastCommit}
                lastAnswer={lastAnswer}
                lastPost={lastPost}
                msgIndex={msgIndex}
                uniqueVisits={uniqueVisits}
              />
            </animated.div>
            :
            ""
          )}
        {/*

        {/* -- SECOND ROW -- */}
        <section className="second-row">
          
          {transitionTwo((style, item) => 
            item ? 
            <animated.div style={style} className="left-side">
              <MainMenu 
                selected={selected} 
                setSelected={setSelected}
              />
            </animated.div>
            : 
            ""
          )}

          {transitionThree((style, item) => 
            item ? 
            <animated.div style={style} className="right-side">
              <BasicInfo reputation={reputation} avatarGlitch={avatarGlitch}/>
            </animated.div>
            : 
            ""
          )}

        </section>

        {/* -- THIRD ROW --  */}
        <section className="third-row">
              
        {transitionFour((style, item) => 
          item ? 
          <animated.div style={style} className="content-display">
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
            ""
          )}

        </section>
      
        </div>        
    </Fragment>
  ]
}

export default App;
