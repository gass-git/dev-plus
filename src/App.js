import React, {useState, useEffect } from 'react';
import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/BasicInfo/index';
import Activity from './components/Activity/index';

const App = () => {
  var [selected, setSelected] = useState('about');

  const Skills = () => {
    return (
      <section className="skills">
        <div className="title">
          Skills
        </div>
        <div className="content">
          EMPTY
        </div>
      </section>
    );
  }
  
  const About = () => {
    return(
      <section className="about">
        <div className="title">
          About
        </div>
        <div className="content">
          Coding is a catalyst for creation, to portray an idea
          into reality and be able to interact with it anywhere
            in the world I find it to be fascinating, it is the
            reason I got hooked at 14. This feeling is something
              I always try to tap into when I'm developing 
              projects. 
              My main interest is to enjoy the process and 
              challenges that appear on the coding coast but
              ATST make cool things. This is mainly where I 
              want to be, in the world of ideas, logic and 
              mental labyrinth. 
        </div>
      </section>
    );
  }

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
              {selected === "activity" ? <Activity /> : null} 
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
