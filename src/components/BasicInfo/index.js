import React from "react";
import './basicInfo.css';

const BasicInfo = () => {
  return (
  <section className="basic-info">
    <div className="border-img">
      
      <div className="inner-container">
          <div className="pic-container">
            <img src="http://localhost:3000/images/avatar.png" alt="" />
          </div>
        
        <div className="username-wrapper">
          <div className="username">
            GASS
          </div>
          <div className="class">
           💾 Developer
          </div>
        </div>

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
            <data>2373</data>
          </div>
        </div>
      
      </div>
    </div>
  </section>
  );
}

export default BasicInfo;