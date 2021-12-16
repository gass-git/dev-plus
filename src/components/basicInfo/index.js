import React from "react";
import ReactTooltip from "react-tooltip";
import './basicInfo.css';
import avatar from  "../../assets/images/avatar7.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";


export default function BasicInfo ({reputation}) {
  return [
    <section key="basic-info-identifier" className="basic-info">
      <div className="border-img">
        
        <div className="inner-container">
        
          <div className="avatar-wrapper">
            <img src={avatar} alt="Stardew Valley pixel avatar" title="Pixel art made by Eric Barone"/>
          </div>
            
          <ReactTooltip/>

          {/* -- Avatar & username -- */}
          <div className="username-wrapper">
            <div className="username">
              GASS
            </div>
            <div className="sub-username">
            Developer
            </div>
          </div>

          {/* -- Profile summary -- */}
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
                  <FontAwesomeIcon icon={faArrowUp} className="icon shadow-04"/>
                  &nbsp;&nbsp;
                  {reputation.monthChange}
                </span>
              </data>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  ]
}