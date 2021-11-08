import React, {useState, useEffect } from 'react';
import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/basicInfo/index';
import Activity from './components/activity/index';
import Projects from './components/projects/index';
import Skills from './components/skills/index';
import About from './components/about/index';

const App = () => {
  var [selected, setSelected] = useState('about');

  return (
    <div className="main-wrapper">

      <section className="first-row">
        <ScrollDisplay />
      </section>
      
      <section className="second-row">
        <div className="left-side">
          <MainMenu selected={selected} setSelected={setSelected}/>
        </div>
        <div className="right-side">
          <BasicInfo />
        </div>
      </section>
      
      <section className="third-row">
        <div className="content-display">
          <div className="border-img">
            <div className="inner-container">
              {selected === "about" ? <About /> : null}
              {selected === "skills" ? <Skills /> : null} 
              {selected === "projects" ? <Projects /> : null}
              {selected === "activity" ? <Activity /> : null} 
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
