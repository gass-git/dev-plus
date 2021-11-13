import React from "react";
import './basicInfo.css';

const BasicInfo = ({reputation}) => {
  return (
  <section className="basic-info">
    <div className="border-img">
      
      <div className="inner-container">
          <div className="pic-container">
            <img src="http://localhost:3000/images/avatar.png" alt="" />
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
            <div className="icon">
              <img src="http://localhost:3000/images/metal-icon.png" alt="" />
            </div>
            <label>Profession</label>
            <data>Engineer</data>
          </div>
          <div>
            <div className="icon">
              <img src="http://localhost:3000/images/metal-icon.png" alt="" />
            </div>
            <label>Started Coding</label>
            <data>2004</data>
          </div>
          <div>
            <div className="icon">
              <img src="http://localhost:3000/images/metal-icon.png" alt="" />
            </div>
            <label>Turned Pro</label>
            <data>2020</data>
          </div>
          <div>
            <div className="icon">
              <img src="http://localhost:3000/images/metal-icon.png" alt="" />
            </div>
            <label>SO Points</label>
            <data>
              {reputation.total} &nbsp;&nbsp;
              <i class="fas fa-arrow-up" />&nbsp;
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