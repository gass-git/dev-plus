import React, {useState, useEffect} from "react";
import './mainMenu.css';

const MainMenu = ({selected, setSelected}) => {
  var [currentFloor, setCurrentFloor] = useState(4);

  function select(entry){
    setSelected(entry);
    
    // Elevator
    if(entry === 'about') {setCurrentFloor(4)}
    else if(entry === 'skills') {setCurrentFloor(3)}
    else if(entry === 'projects') {setCurrentFloor(2)}
    else if(entry === 'activity') {setCurrentFloor(1)}
  }
  
  return (
  <section className="main-menu">
    <div className="border-img">
      <div className="inner-container">
        <div className="menu-wrapper">
          <div 
          className="option"
          onClick={() => select('about')}
          >
            <div 
            className="label">
              About
            </div>
          </div>
          <div 
          className="option"
          onClick={() => select('skills')}
          >
           
            <div className="label">
              Skills
            </div>
          </div>
          <div 
          className="option"
          onClick={() => select('projects')}
          >
            
            <div className="label">
              Projects
            </div>
             
          </div>
          <div 
          className="option"
          onClick={() => select('activity')}
          >
            
            <div className="label">
              Activity
            </div>
          </div>

          {/* ELEVATOR */}
          <div className={`elevator floor-${currentFloor}`}>
          </div>

        </div>
      </div>
    </div>
  </section>  
  );
}

export default MainMenu;