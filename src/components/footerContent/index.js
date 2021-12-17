import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import "./footerContent.css";

export default function FooterContent({space1, space2, space3}){
  return [
    <div className="credits">
        <a  href="https://gass.dev" className="credit-link">
          <span style={{color:"rgb(255,255,255,0.9)"}}>
            ©
          {space2}
          gass.dev
          </span> 
        </a>
        {space3} 
        <a style={{marginLeft:"0px"}} href="https://gass.dev">
          <img src="https://img.shields.io/github/package-json/v/gass-git/dev-plus?style=plastic&color=orange" alt="version"/>
        </a>
        {space2}
        <div className='txt'>  
          {space1}
          rendered in <span style={{color:"rgb(144,238,144)"}} id="render-time"></span> MS
          {space2}
          -
        </div>
        {space2} 
        <a  href="https://github.com/gass-git/dev-plus" target="_blank" rel="noreferrer">
          <img src="https://img.shields.io/github/license/gass-git/dev-plus?style=plastic" alt="License name"/>
        </a>
        {space2}
        <div className='txt'>
          -
          {space2}
          Inspired by 
        </div>
        <FontAwesomeIcon style={{ margin:"-1px 5px 0 5px",fontSize:"19px", opacity:"0.9" }} icon={faGamepad}/>
        <a className="credit-link" href="https://www.rpgmakerweb.com/" target="_blank" rel="noreferrer">
          RPG maker 
        </a> 
        <div className="txt">
          {space1}
          designs
          {space1}
        </div>
      </div>
  ]
}