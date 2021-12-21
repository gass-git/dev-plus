import React from "react";
import { Fragment } from 'react';

export default function GithubEvents({gitEvents, space}){
  return [
    <Fragment key="git-identifier">
      <div className="sub-title">
          LATEST COMMITS
      </div>
      <div className="container">
        {gitEvents.map((data) => {
          let event_id = data.id;
          let repoName = data.repo.name;
          let repoURL = "https://github.com/" + repoName + "/commits/master";
          repoName = repoName.slice(9);
          let date = data.created_at;
          let commit = data.payload.commits[0].message;

          date = date.slice(0,10);
          return [
            <a 
              key={event_id} 
              href={repoURL} 
              className='block' 
              target="_blank" 
              rel="noreferrer" 
              title="See details on GitHub"
            >
              <div className="events-date">
                {date}
              </div>
              <div className="commit">{commit}</div>
              {space}
              <div className="repo-name" title="Repository name" >{repoName}</div>
            </a>
          ]
        })}
      </div>
    </Fragment>
  ]
}