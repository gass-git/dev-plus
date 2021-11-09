import React, {useState, useEffect } from 'react';
import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';

let answers_api =
  "https://api.stackexchange.com/2.3/users/14895985/answers?order=desc&sort=activity&site=stackoverflow";

const App = () => {
  var [selected, setSelected] = useState('about');
  var [answers, setAnswers] = useState([]);

  async function get_SO_data(){
    
    // Get answers data
    let resp = await fetch(answers_api);
    let obj = await resp.json();
    var answersArr = obj.items.slice(0, 5);

    console.log(answersArr)

    let titles = [];
    let merged = [];
    // Get question title
    answersArr.forEach(async function(answer, index){
        
      var id = answer.question_id;
      let questions_api = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
      let resp = await fetch(questions_api);
      let obj = await resp.json();
      let title = obj.items[0].title;

        merged.push({
         ...answersArr[index], 
         ...{'title' : title}
        });
      
    }) 
    
      console.log(merged)
  };

  useEffect(() => {
    get_SO_data();
  }, []);

  return (
    <div className="main-wrapper">
      
      {/* -- FIRST ROW -- */}
      {/*<section className="first-row">
        <ScrollDisplay />
      </section>

      {/* -- SECOND ROW -- */}
      <section className="second-row">
        <div className="left-side">
          <MainMenu selected={selected} setSelected={setSelected}/>
        </div>
        <div className="right-side">
          <BasicInfo />
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
           {/*   {selected === "activity" ? <Activity answers={answers} questions={questions} /> : null}  */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
