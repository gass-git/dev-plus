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

const App = () => {
  var [loading, setLoading] = useState(true);
  var [selected, setSelected] = useState('about');
  var [repData, setRepData] = useState([]);
  var [answers, setAnswers] = useState([]);
  var [gitEvents, setGitEvents] = useState([]);
  var [repos, setRepos] = useState([]);


  async function getReputation(){
    var req = await fetch(SO_user_info_api),
      resp = await req.json(),
      reputation = resp.items[0].reputation,
      repChangeMonth = await resp.items[0].reputation_change_month,
      newElement = { total: reputation, monthChange: repChangeMonth };
    setRepData(newElement);
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
      respArray = await req.json();
    setRepos(respArray);
  }

  async function getAnswers(){
    
    // Get answers data
    let req = await fetch(answers_api);
    let resp = await req.json();
    var answersArr = resp.items.slice(0, 4);
    let merged = [];

    // Get questions title
    answersArr.forEach(async function(answer, index){
        
      var id = answer.question_id;
      let questions_api = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
      let req = await fetch(questions_api);
      let resp = await req.json();
      let title = resp.items[0].title;

        merged.push({
         ...answersArr[index], 
         ...{'title' : title}
        });
      
    }) 
    
      setAnswers(merged);
  };

  useEffect(() => {
    showLoading();
    getReputation();
    getRepos();
    getAnswers();
    getGitEvents();
  }, []);

  return [
    <Fragment>
      {/* -- SPINNER -- */}
      <div className={loading ? "loader" : "no-loader"}>
          Loading...
      </div>

      <div className={loading ? "hide-page" : "show-page"}>
        
        {/* -- FIRST ROW -- */}
         
        <section className="first-row">
          <ScrollDisplay />
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
            <BasicInfo repData={repData}/>
          </div>
        </section>

        {/* -- THIRD ROW --  */}
        <section className="third-row">
          <div className="content-display">
            <div className="border-img">
              <div className="inner-container">
                {selected === "about" ? <About /> : null}
                {selected === "skills" ? <Skills /> : null} 
                {selected === "projects" ? <Projects /> : null}
                {selected === "activity" ? <Activity answers={answers} gitEvents={gitEvents} /> : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  ]
}

export default App;
