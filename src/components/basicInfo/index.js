import React from "react";
import './basicInfo.css';
import Glitch from './glitch';

const BasicInfo = ({reputation, avatarGlitch}) => {
  return (
  <section className="basic-info">
    <div className="border-img">
      
      <div className="inner-container">
      
        <div className="avatar-wrapper">
          <Glitch avatarGlitch={avatarGlitch}/>
        </div>
          
        
        {/* -- AVATAR AND NAME -- */}
        <div className="username-wrapper">
          <div className="username">
            GASS
          </div>
          <div className="sub-username">
           Developer
          </div>
        </div>

        {/* -- INFO -- */}
        <div className="info">
          <div>
            <label>Profession</label>
            <data>Engineer</data>
          </div>
          <div>
            <label>Started Coding</label>
            <data>2004</data>
          </div>
          <div>
            <label>Turned Pro</label>
            <data>2020</data>
          </div>
          <div>
            <label>SO Points</label>
            <data>
              {reputation.total} &nbsp;&nbsp;
              <i className="fas fa-arrow-up" />&nbsp;
              <span>{reputation.monthChange}</span>
            </data>
          </div>
        </div>
      
      </div>
    </div>
  </section>
  );
}

export default BasicInfo;