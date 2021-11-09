import React, {Fragment, useState} from "react";
import reactDom from "react-dom";
import './activity.css';
import Date from './childrens/date';

const Activity = ({answers, gitEvents}) => {
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

  return (
    <section className="activity">
      <div className="title">Activity</div>
      <div className="content">
      <div className="sub-title">
          GITHUB LATEST EVENTS
      </div>
      <div className="container">
        {
          gitEvents.map((data) => {
            let repoName = data.repo.name;
            repoName = repoName.slice(9);

            return (
              <div className='block'>
                <div>{data.created_at}</div>
                {space}
                <div>Commit: {data.payload.commits[0].message} - </div>
                {space}
                <div>Repo: {repoName}</div>
              </div>
            )
          })
        }
      </div>
      </div>
    </section>
  );
}

export default Activity;