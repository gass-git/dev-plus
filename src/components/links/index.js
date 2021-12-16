import React, { Fragment, useState } from 'react';
import "./links.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStackOverflow, faGithub, faLinkedin, faCodepen} from "@fortawesome/free-brands-svg-icons";
import {faAt, faSearch} from "@fortawesome/free-solid-svg-icons";
import useSound from 'use-sound';
import clickSound from '../../assets/sounds/link-click.mp3';
import copySound from '../../assets/sounds/copy-email.mp3';

export default function Links(){
  const [playClickSound] = useSound(clickSound, {volume:0.8}),
        [playCopySound] = useSound(copySound, {volume: 0.4}),
        [copied, setCopied] = useState(false),
        [showEffect, setShowEffect] = useState(false);
  

  function copyText(entryText){
    navigator.clipboard.writeText(entryText);
    setCopied(true);
    setTimeout(()=>{setCopied(false)}, 500);

    // Show "Email copied!" effect
    setShowEffect(true);
    
    // Make the effect disapper
    setTimeout(() => {
      setShowEffect(false);
    }, 1000)

    playCopySound();
  }

  return[ 
    <main className="links">
      <div className="border-img">
        <div className="inner-container">
          <div className="icons-wrapper">
            <a onClick={() => playClickSound()} href="https://github.com/gass-git" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize:"35px",marginTop:"1px" }} className="fa-icon"/>
            </a>
            <a onClick={() => playClickSound()} href="https://stackoverflow.com/users/14895985/gass?tab=profile" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faStackOverflow} style={{ fontSize:"36px" }} className="fa-icon"/>
            </a>
            <a onClick={() => playClickSound()} href="https://www.linkedin.com/in/gabriel-salinas-szada-7a188196" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize:"36px", marginLeft:"6px" }}  className="fa-icon" />
            </a>
            <a onClick={() => playClickSound()} href="https://codesandbox.io/u/g.szada" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faCodepen} style={{ fontSize:"33px",marginTop:"2px" }} className="fa-icon" />
            </a>
            <div 
            onClick={()=>copyText('gabriel.salinas@protonmail.com')}
            title="Copy email"
            >
              {showEffect ? <div className="copied-animation">Copied !</div> : null}

              <FontAwesomeIcon icon={faAt} style={{ fontSize:"33px",marginTop:"2px" }} className="fa-icon" />
            </div>
          </div>
        </div>
      </div>
    </main>
  ]
}