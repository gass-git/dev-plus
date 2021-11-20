import React, {useState} from "react";
import './mainMenu.css';
import useSound from "use-sound";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

const MainMenu = ({setSelected}) => {
  var [floorNumber, setFloorNumber] = useState(4);
  const [playSwitchSound] = useSound(selectionSound, {volume: 0.8});

  function select(entry){
    setSelected(entry);
    
    // Sound effect
    playSwitchSound();
    
    // Elevator
    if(entry === 'about') {setFloorNumber(4)}
    else if(entry === 'skills') {setFloorNumber(3)}
    else if(entry === 'projects') {setFloorNumber(2)}
    else if(entry === 'activity') {setFloorNumber(1)}
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
          <div className={`elevator floor-${floorNumber}`}>
          </div>

        </div>
      </div>
    </div>
  </section>  
  );
}

export default MainMenu;