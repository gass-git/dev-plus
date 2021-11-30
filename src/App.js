import React, {useState, useEffect, Fragment } from 'react';
import {useTransition, animated} from 'react-spring';

// API fetching
import Activity from './components/activity/index';
import processVisit from './api/processVisit';
import getUniqueVisits from './api/getUniqueVisits';
import getSkillScores from './api/getSkillScores';
import getWritings from './api/getWritings';
import getReputation from './api/getReputation';
import getRepos from './api/getRepos';
import getGitEvents from './api/getGitEvents';
import getAnswers from './api/getAnswers';

// Components
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';

// Global functions
import preload from './functions/preload';
import handlePreloadMessages from './functions/preloadMessages';

// Assets
import wizard from  "./assets/images/wizard-v2.gif"

const App = () => {
  var [loading, setLoading] = useState(true);
  var [showGif, setShowGif] = useState(false);
  var [castingSpells, setCastingSpells] = useState(false);
  var [castCompleted, setCastCompleted] = useState(false);
  var [menuActivated, setMenuActivated] = useState(false);

  // For animation effect on page preload
  var [showComponentOne, setShowComponentOne] = useState(false); 
  var [showComponentTwo, setShowComponentTwo] = useState(false); 
  var [showComponentThree, setShowComponentThree] = useState(false); 
  var [showComponentFour, setShowComponentFour] = useState(false); 

  var [selected, setSelected] = useState('about');
  var [uniqueVisits, setUniqueVisits] = useState();
  var [gitEvents, setGitEvents] = useState([]);
  var [repos, setRepos] = useState([]);
  var [posts, setPosts] = useState([]);
  var [lastPost, setLastPost] = useState([]);

  // Avatar glitch effect
  var [avatarGlitch, setAvatarGlitch] = useState(true);
  var glitchDuration = 5; // Duration in seconds 

  // Stack Overflow variables
  var [reputation, setReputation] = useState([]);
  var [answers, setAnswers] = useState([]);
  var [scores, setScores] = useState([]);

  // ScrollDisplay variables
  var [scrollerSwitch, setScrollerSwitch] = useState('on');
  var [lastCommit, setLastCommit] = useState([]);
  var [lastAnswer, setLastAnswer] = useState(); 
  var [msgIndex, setMsgIndex] = useState(0);
  var maxIndex = 3; 
  var scrollerDelay = 18; // Duration in seconds 

  // Transitions
  const transitionOne = useTransition(showComponentOne, {
    from: { x: 0, y: -100, opacity: 0},
    enter: { x:0, y:0, opacity:1}
  });
  const transitionTwo = useTransition(showComponentTwo, {
    from: { x: -100, y: 800, opacity: 0},
    enter: item => async(next) => {
      await next({ x:-100, y:0, opacity:1});
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

  useEffect(() => {
    preload({
      setShowGif, 
      setCastingSpells, 
      setCastCompleted, 
      setLoading,
      setShowComponentOne,
      setShowComponentTwo,
      setShowComponentThree,
      setShowComponentFour,
      setMenuActivated
      });
    processVisit();
    getUniqueVisits({setUniqueVisits});
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
    <Fragment>
      {/* -- Background image -- not wrapper -- */}
      <div className={showComponentOne ? "bg-image" : null } />

      {/* -- Preloader -- */}
      <main className={loading ? "loader" : "no-loader"}>
        <section className="center-wrapper">
          <div className="gif-frame">
            {showGif ? <img src={wizard} /> : null}
          </div>
          { handlePreloadMessages({castingSpells, castCompleted})}
        </section>    
      </main>

      {/* -- Main wrapper -- */}
      <main className={loading ? null : "main-wrapper"}>
        
        {/* -- First row -- */} 
        {transitionOne((style, item) => 
            item ? 
            <animated.div style={style} className="first-row">
              <ScrollDisplay 
                scrollerSwitch={scrollerSwitch}
                lastCommit={lastCommit}
                lastAnswer={lastAnswer}
                lastPost={lastPost}
                msgIndex={msgIndex}
                uniqueVisits={uniqueVisits}
              />
            </animated.div>
            :
            null
        )}

        {/* -- Second row -- */}
        <section className="second-row">
          {transitionTwo((style, item) => 
            item ? 
            <animated.div style={style} className="left-side">
              <MainMenu 
                setSelected={setSelected}
                menuActivated={menuActivated}
              />
            </animated.div>
            : 
            null
          )}
          {transitionThree((style, item) => 
            item ? 
            <animated.div style={style} className="right-side">
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
              null
          )}
        </section>
      </main>      
    </Fragment>
  ]
}

export default App;
