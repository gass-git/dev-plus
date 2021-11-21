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

let answers_api = "https://api.stackexchange.com/2.3/users/14895985/answers?order=desc&sort=activity&site=stackoverflow";
let SO_user_info_api = "https://api.stackexchange.com/2.3/users/14895985?order=desc&sort=reputation&site=stackoverflow";
let events_api = "https://api.github.com/users/gass-git/events/public";
let repos_api = "https://api.github.com/users/gass-git/repos";
let posts_api = "https://blog.gass.dev/api/posts";
let scores_api =  "https://api.stackexchange.com/2.3/users/14895985/top-tags?site=stackoverflow";
let geolocation_api = "https://geolocation-db.com/json/";

const App = () => {
  // Global variables
  var [loading, setLoading] = useState(true);
  var [selected, setSelected] = useState('about');
  var [avatarGlitch, setAvatarGlitch] = useState(false);
  var [visitorIP, setVisitorIP] = useState();

  // Github variables
  var [gitEvents, setGitEvents] = useState([]);
  var [repos, setRepos] = useState([]);

  // Blog variables
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
  var maxIndex = 2;
  var scrollInterval = 25; // Seconds it takes for the scroll animation

  async function getVisitorIP(){
    let req = await fetch(geolocation_api),
    resp = await req.json();

    setVisitorIP(resp.IPv4);
  }

  async function getWritings(){
    let req = await fetch(posts_api),
      resp = await req.json(),
      newArray = [];
    
    resp.forEach((post) => {
      newArray.push({
        'id' : post.id,
        'title' : post.title,
        'created_at' : post.created_at,
        'views' : post.views
      });
    });

    let sortedArr = newArray.sort((a, b) => {return b.id - a.id});
    setPosts(sortedArr);
    setLastPost(sortedArr[0]);
  }

  async function getReputation(){
    var req = await fetch(SO_user_info_api),
      resp = await req.json(),
      reputation = resp.items[0].reputation,
      repChangeMonth = await resp.items[0].reputation_change_month,
      newElement = { 
        'total': reputation, 
        'monthChange': repChangeMonth 
      };
    setReputation(newElement);
  };

  function showLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  async function getGitEvents() {
    var req = await fetch(events_api), 
      respArray = await req.json();

    var filteredArr = [];

    // Delete events that have no commits
    respArray.forEach((el) => {
      if(el.payload.action !== 'started'){
        filteredArr.push(el);
      }
    }); 

    var latestFour = filteredArr.slice(0,4); 
    setGitEvents(latestFour);

    // Variables for scroll display component
    var lastCommitMsg = latestFour[0].payload.commits[0].message;
    var fromRepo = latestFour[0].repo.name;
    fromRepo = fromRepo.slice(9);
    var createdAt = latestFour[0].created_at;
    var date = createdAt.slice(0,10);
    var time = createdAt.slice(11, 19);

    setLastCommit({
      'message' : lastCommitMsg,
      'repo' : fromRepo,
      'date' : date,
      'time' : time
    });

  }

  async function getRepos() {
    var req = await fetch(repos_api),
      respArray = await req.json(),
      newArray = [], 
      newObj = null;

    respArray.forEach((repo)=>{
      newObj = {
        'name' : repo.name, 
        'about' : repo.description, 
        'url' : repo.homepage,
        'topics' : repo.topics,
        'created_at' : repo.created_at
      };
      newArray.push(newObj);
    });
    // Remove repos with about section empty
    let filteredArr = newArray.filter((repo) => { return repo.about != null ? true : false });
    
    // Sort array from old to new 
    let sortedArr = filteredArr.sort((a,b) =>  new Date(a.created_at) - new Date(b.created_at));
    setRepos(sortedArr);
  }

  async function getAnswers(){
    // Get answers data
    let req = await fetch(answers_api),
      resp = await req.json(),
      answersArr = resp.items.slice(0, 4),
      merged = [];

    // Get questions title
    answersArr.forEach(async function(answer, index){
      var id = answer.question_id;
      let questions_api = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
      let req = await fetch(questions_api),
       resp = await req.json(),
       questionTitle = resp.items[0].title;

        merged.push({
         ...answersArr[index], 
         ...{'title' : questionTitle}
        });
    })

    setAnswers(merged);

    // -- Variable for ScrollDisplay component --
    // setTimeout is to solve a delay issue with the API
    setTimeout(() => {
      setLastAnswer(merged[0].title)
    }, 10000);
  };

  async function getSkillScores(){
    var req = await fetch(scores_api),
      resp = await req.json(),
      arr = resp.items;
    setScores(arr);
  }

  useEffect(() => {
    showLoading();
    getWritings();
 //   getReputation();
    getRepos();
 //   getAnswers();
    getGitEvents();
 //   getSkillScores();
    getVisitorIP();
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
