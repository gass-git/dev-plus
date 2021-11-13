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

const App = () => {
  var [loading, setLoading] = useState(true);
  var [selected, setSelected] = useState('about');
  var [reputation, setReputation] = useState([]);
  var [answers, setAnswers] = useState([]);
  var [gitEvents, setGitEvents] = useState([]);
  var [repos, setRepos] = useState([]);
  var [posts, setPosts] = useState([]);
  var [intervalTime, setIntervalTime] = useState(4000);
  var [glitch, setGlitch] = useState(false);

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
  }

  async function getReputation(){
    var req = await fetch(SO_user_info_api),
      resp = await req.json(),
      reputation = resp.items[0].reputation,
      repChangeMonth = await resp.items[0].reputation_change_month,
      newElement = { total: reputation, monthChange: repChangeMonth };
    setReputation(newElement);
  };

  function showLoading() {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  async function getGitEvents() {
    var req = await fetch(events_api), 
      respArray = await req.json(),
      latestFive = respArray.slice(0,4); 
    setGitEvents(latestFive);
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
       title = resp.items[0].title;

        merged.push({
         ...answersArr[index], 
         ...{'title' : title}
        });
    })
    setAnswers(merged);
  };

  useEffect(() => {
    showLoading();
    getWritings();
    getReputation();
    getRepos();
     getAnswers();
     getGitEvents();
  }, []);

  useEffect(() => {
    
    var interval = setInterval(() => {
    
      setGlitch(!glitch);
      
      var random = 4000 + Math.random()*5000;
      setIntervalTime(random)
      console.log(random)
    }, intervalTime);
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
            gitEvents={gitEvents}
            answers={answers}
            posts={posts}
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
            <BasicInfo reputation={reputation}/>
          </div>
        </section>

        {/* -- THIRD ROW --  */}
        <section className="third-row">
          <div className="content-display">
            <div className="border-img">
              <div className="inner-container">
                {selected === "about" ? <About glitch={glitch}/> : null}
                {selected === "skills" ? <Skills glitch={glitch}/> : null} 
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
