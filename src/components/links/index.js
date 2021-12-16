import React, { Fragment } from 'react';
import "./links.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStackOverflow, faGithub, faLinkedin, faCodepen} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faSearch} from "@fortawesome/free-solid-svg-icons";


export default function links(){
  return[
    <main className="links">
      <div className="border-img">
        <div className="inner-container">
          <div className="icons-wrapper">
            <a href="https://github.com/gass-git" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} style={{ fontSize:"35px",marginTop:"1px" }} className="fa-icon"/>
            </a>
            <a href="https://stackoverflow.com/users/14895985/gass?tab=profile" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faStackOverflow} style={{ fontSize:"36px" }} className="fa-icon"/>
            </a>
            <a href="https://www.linkedin.com/in/gabriel-salinas-szada-7a188196" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize:"36px", marginLeft:"6px" }}  className="fa-icon" />
            </a>
            <a href="https://codesandbox.io/u/g.szada" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faCodepen} style={{ fontSize:"33px",marginTop:"2px" }} className="fa-icon" />
            </a>
            <a href="https://codereview.stackexchange.com/users/239120/gass?tab=profile" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faSearch} style={{ fontSize:"31px",marginTop:"2px" }} className="fa-icon" />
            </a>
          </div>
        </div>
      </div>
    </main>
  ]
}