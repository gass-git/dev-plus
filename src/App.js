import React, {useState, useEffect, Fragment } from 'react';
import './global/App.css';
import './global/loader.css';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';
import Activity from './components/activity/index';
import processVisit from './api/processVisit';
import getUniqueVisits from './api/getUniqueVisits';
import showLoading from './functions/showLoading';
import getSkillScores from './api/getSkillScores';
import getWritings from './api/getWritings';
import getReputation from './api/getReputation';
import getRepos from './api/getRepos';
import getGitEvents from './api/getGitEvents';
import getAnswers from './api/getAnswers';

const App = () => {
  var [loading, setLoading] = useState(true);
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

  useEffect(() => {
   showLoading({setLoading});
    processVisit();
    getUniqueVisits({setUniqueVisits});
    getWritings({setPosts, setLastPost});
  //  getReputation({setReputation});
    getRepos({setRepos});
  //  getAnswers({setAnswers, setLastAnswer});
  //  getGitEvents({setGitEvents, setLastCommit});
   // getSkillScores({setScores});
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

  return [
    <Fragment>
      {/* -- SPINNER -- */}
      <div className={loading ? "loader" : "no-loader"}>
          Loading...
      </div>

      <div className={loading ? "hide-page" : "show-page"}>
        {/* -- FIRST ROW -- */} 
        <section className="first-row">
          <ScrollDisplay 
            lastCommit={lastCommit}
            lastAnswer={lastAnswer}
            lastPost={lastPost}
            msgIndex={msgIndex}
            uniqueVisits={uniqueVisits}
          />
        </section>

        {/* -- SECOND ROW -- */}
        <section className="second-row">
          <div className="left-side">
            <MainMenu 
              selected={selected} 
              setSelected={setSelected}
            />
          </div>
          <div className="right-side">
            <BasicInfo reputation={reputation} avatarGlitch={avatarGlitch}/>
          </div>
        </section>

        {/* -- THIRD ROW --  */}
        <section className="third-row">
          <div className="content-display">
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
      
        </div>        
    </Fragment>
  ]
}

export default App;
