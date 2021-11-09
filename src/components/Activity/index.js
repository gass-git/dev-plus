import React, {useState} from "react";
import './activity.css';

const Activity = () => {

  return (
    <section className="activity">
      <div className="title">Activity</div>
      <div className="content">
        <div className="sub-title">
          STACK OVERFLOW LATEST ANSWERS
        </div>
        <div className="block-wrapper">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Activity;