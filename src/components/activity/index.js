import React, {Fragment, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStackOverflow, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faKeyboard} from "@fortawesome/free-solid-svg-icons";
import './activity.css';
import Stackoverflow from "./childrens/stackoverflow";
import GithubEvents from "./childrens/githubEvents";
import Writings from "./childrens/writings";
import useSound from "use-sound";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

export default function Activity ({answers, gitEvents, posts}){
  const [current, setCurrent] = useState('stackoverflow'),
        [posNumber, setPosNumber] = useState(3),
        [playSound] = useSound(selectionSound, {volume: 1});
  
  let space = <Fragment>&nbsp; &nbsp; &nbsp;</Fragment>;
  function select(entry){
    setCurrent(entry);
    playSound();
    
    // Elevator floor
    if(entry === "stackoverflow"){setPosNumber(3)}
    else if(entry === "github"){setPosNumber(2)}
    else if(entry === "writings"){setPosNumber(1)}
  }

  return [
    <section key="activity-identifier" className="activity">
      <div className="content">
        
        {/* -- For @media -- */}
        <div className="media-top-selector">
          <div 
            style={{ marginRight:"7px"  }}
            className="option"
            onClick={() => select('stackoverflow')}
          >
            <FontAwesomeIcon 
              icon={faStackOverflow} 
              style={{ margin: "13px auto" }} 
              className="icon shadow-04" 
            />
          </div>
          <div 
            style={{ marginRight:"7px" }}
            className="option"
            onClick={() => select('github')}
          >
            <FontAwesomeIcon icon={faGithub} className="icon shadow-04"/>
          </div>
          <div 
            className="option"
            onClick={() => select('writings')}
          >
            <FontAwesomeIcon icon={faKeyboard} className="icon shadow-04" />
          </div>

          {/* -- Elevator -- */}
          <div className={`wiggle pos-${posNumber}`}>
          </div>
          {/* -------------- */}

        </div>
        {/* -- End of @media section -- */}

        {/* -- Left side -- */}
        <div className="left-side">
          {current === "stackoverflow" ? <Stackoverflow answers={answers} /> : null}
          {current === "github" ? <GithubEvents gitEvents={gitEvents} space={space}/> : null}
          {current === "writings" ? <Writings posts={posts}/> : null}
        </div>

      {/* -- Right side -- */}
      <div className="right-side">
        
        <div 
          style={{ marginTop:"-1px" }}
          className="option"
          onClick={() => select('stackoverflow')}
        >
          <FontAwesomeIcon icon={faStackOverflow} className='icon shadow-04'/>
        </div>
        <div 
          style={{ marginTop:"11px" }}
          className="option"
          onClick={() => select('github')}
        >
          <FontAwesomeIcon icon={faGithub} className='icon shadow-04'/>
        </div>
        <div 
          style={{ marginTop:"12px" }}
          className="option"
          onClick={() => select('writings')}
        >
          <FontAwesomeIcon icon={faKeyboard} className='icon shadow-04'/>
        </div>

        {/* -- Elevator -- */}
        <div className={`elevator floor-${posNumber}`}>
        </div>
        {/* -------------- */}

      </div>
      {/* -- End of right side -- */}

      </div>
    </section>
  ]
}