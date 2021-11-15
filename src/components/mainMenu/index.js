import React, {useState, useEffect} from "react";
import './mainMenu.css';

const MainMenu = ({selected, setSelected}) => {
  
  function select(entry){
    setSelected(entry);
  }
  
  return (
  <section className="main-menu">
    <div className="border-img">
      <div className="inner-container">
        <div className="menu-wrapper">
          <div 
          className={selected === 'about' ? 'selected' : "not-selected"} 
          onClick={() => select('about')}
          >
            
            <div className="label">
              About
            </div>
          </div>
          <div 
          className={selected === 'skills' ? 'selected' : "not-selected"} 
          onClick={() => select('skills')}
          >
           
            <div className="label">
              Skills
            </div>
          </div>
          <div 
          className={selected === 'projects' ? 'selected' : "not-selected"} 
          onClick={() => select('projects')}
          >
            
            <div className="label">
              Projects
            </div>
             
          </div>
          <div 
          className={selected === 'activity' ? 'selected' : "not-selected"} 
          onClick={() => select('activity')}
          >
            
            <div className="label">
              Activity
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>  
  );
}

export default MainMenu;