import React, {Fragment, useState} from "react";
import './activity.css';
import Date from './childrens/date';

const Activity = ({answers, gitEvents}) => {
  var [current, setCurrent] = useState('stackoverflow');
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

  function select(entry){
    setCurrent(entry);
  }

  const Stackoverflow = () => {
    return [
      <Fragment>
        <div className="container">
          {
            answers.map((data) => {
              return [
                <div className="block">
                  <div className="date">
                    <Date entry={data.creation_date} />
                  </div>
                  <div className="question">
                    {data.title}
                  </div>
                </div>
              ]
            })
          }
        </div> 
      </Fragment>
    ];
  }

  const GithubEvents = () => {
    return [
      <Fragment>
        <div className="container">
          {
            gitEvents.map((data) => {
              let repoName = data.repo.name;
              repoName = repoName.slice(9);
              let date = data.created_at;
              date = date.slice(0,10);
              return [
                <div className='block'>
                  <div className="date">
                    {date}
                  </div>
                  <div className="commit">{data.payload.commits[0].message} - </div>
                  {space}
                  <div>{repoName}</div>
                </div>
              ]
            })
          }
        </div>
      </Fragment>
    ];
    
  }

  return (
    <section className="activity">
      <div className="title">
        Activity
      </div>
      <div className="content">
        
        {/* -- LEFT SIDE -- */}
        <div className="left-side">
          <div 
            className={current === "stackoverflow" ? "selected" : null}
            onClick={() => select('stackoverflow')}
          >
            <i className="fab fa-stack-overflow" /> 
            {space}
            STACK OVERFLOW LATEST
          </div>
          <div 
            className={current === "github" ? "selected" : null}
            onClick={() => select('github')}
          >
            <i className="fab fa-github-square" />
            {space}
            GITHUB LATEST EVENTS
          </div>
        </div>

        {/* -- RIGHT SIDE -- */}
        <div className="right-side">
          {current === "stackoverflow" ? <Stackoverflow /> : null}
          {current === "github" ? <GithubEvents /> : null}
        </div>

      </div>
    </section>
  );
}

export default Activity;