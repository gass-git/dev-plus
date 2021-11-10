import React, {Fragment, useState} from "react";
import './activity.css';
import Date from './childrens/date';

const Activity = ({answers, gitEvents}) => {
  var [current, setCurrent] = useState('stackoverflow');
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

  function select(entry){
    setCurrent(entry);
  }

  const Writings = () => {
    return [
      <Fragment>
        <div className="sub-title">
            RECENT WRITINGS
          </div>
        <div className="container">
          EMPTY
        </div> 
      </Fragment>
    ]
  }

  const Stackoverflow = () => {
    return [
      <Fragment>
        <div className="sub-title">
            LATEST EDITS & ANSWERS
          </div>
        <div className="container">
          {
            answers.map((data) => {
              let answerURL = "https://stackoverflow.com/a/" + data.answer_id;

              return [
                <a href={answerURL} className="block" target="_blank" rel="">
                  <div className="date">
                    <Date entry={data.creation_date} />
                  </div>
                  <div className="question">
                    {data.title}
                  </div>
                </a>
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
        <div className="sub-title">
            LATEST COMMITS
          </div>
        <div className="container">
          {
            gitEvents.map((data) => {
              let repoName = data.repo.name;
              let repoURL = "https://github.com/" + repoName + "/commits/master";
              repoName = repoName.slice(9);
              let date = data.created_at;
              date = date.slice(0,10);
              return [
                <a href={repoURL} className='block' target="_blank" rel="">
                  <div className="date">
                    {date}
                  </div>
                  <div className="commit">{data.payload.commits[0].message}</div>
                  <div>{repoName}</div>
                </a>
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
            className={current === "stackoverflow" ? "selected" : "not-selected"}
            onClick={() => select('stackoverflow')}
          >
            <i className="fab fa-stack-overflow" /> 
          </div>
          <div 
            className={current === "github" ? "selected" : "not-selected"}
            onClick={() => select('github')}
          >
            <i className="fab fa-github" />
          </div>
          <div 
            className={current === "writings" ? "selected" : "not-selected"}
            onClick={() => select('writings')}
          >
            <i className="far fa-keyboard" />
          </div>
        </div>

        {/* -- RIGHT SIDE -- */}
        <div className="right-side">
          {current === "stackoverflow" ? <Stackoverflow /> : null}
          {current === "github" ? <GithubEvents /> : null}
          {current === "writings" ? <Writings /> : null}
        </div>

      </div>
    </section>
  );
}

export default Activity;