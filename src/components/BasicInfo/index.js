import React from "react";
import './basicInfo.css';

const BasicInfo = () => {
  return (
  <section className="basic-info">
    <div className="border-img">
      <div className="inner-container">
        <div className="pic-name">
          <div className="name">
            GASS
          </div>
          <div className="pic">
            <img src="http://localhost:3000/images/avatar.png" alt="" />
          </div>
        </div>
        <div className="info">
          asasd asdasd
        </div>
      </div>
    </div>
  </section>
  );
}

export default BasicInfo;