import React from "react";
import ReactTooltip from "react-tooltip";
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
          
        <ReactTooltip/>

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
            <label data-tip="Stack Overflow reputation">SO Points</label>
            <data>
              <label data-tip="Total">{reputation.total} &nbsp;&nbsp;</label>
              
              <span style={{cursor:"default"}} data-tip="Month change">
                <i className="fas fa-arrow-up" />&nbsp;&nbsp;
                {reputation.monthChange}
              </span>
            </data>
          </div>
        </div>
      
      </div>
    </div>
  </section>
  );
}

export default BasicInfo;