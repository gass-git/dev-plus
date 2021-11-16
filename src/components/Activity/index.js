import React, {Fragment, useState} from "react";
import './activity.css';
import Date from './childrens/date';

const Activity = ({answers, gitEvents, posts}) => {
  var [current, setCurrent] = useState('stackoverflow');
  var [floorNumber, setFloorNumber] = useState(3);
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

  function select(entry){
    setCurrent(entry);
    
    // Elevator floor
    if(entry === "stackoverflow"){setFloorNumber(3)}
    else if(entry === "github"){setFloorNumber(2)}
    else if(entry === "writings"){setFloorNumber(1)}
  }

  const Writings = () => {
    return [
      <Fragment>
        <div className="sub-title">
            RECENT WRITINGS
          </div>
        <div className="container">
          {
            posts.map((post) => {
              let postURL = `https://blog.gass.dev/post=${post.id}+no_scroll`;
              let date = post.created_at;
              date = date.slice(0,10);

              return [
              <a href={postURL} className="block" target="_blank">
               <div className="date">
                {date}
               </div> 
               <div className="post-title">
                {post.title}
               </div>
              </a>
              ]
            })
          }
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
      <div className="content">
        
        {/* -- LEFT SIDE -- */}
        <div className="left-side">
          {current === "stackoverflow" ? <Stackoverflow /> : null}
          {current === "github" ? <GithubEvents /> : null}
          {current === "writings" ? <Writings /> : null}
        </div>

      {/* -- RIGHT SIDE -- */}
      <div className="right-side">
        
        <div style={{ marginTop:"0px" }}
          className={current === "stackoverflow" ? "option selected" : "option not-selected"}
          onClick={() => select('stackoverflow')}
        >
          <i className="fab fa-stack-overflow" /> 
        </div>
        <div style={{ marginTop:"5px" }}
          className={current === "github" ? "option selected" : "option not-selected"}
          onClick={() => select('github')}
        >
          <i className="fab fa-github" />
        </div>
        <div style={{ marginTop:"6px" }}
          className={current === "writings" ? "option selected" : "option not-selected"}
          onClick={() => select('writings')}
        >
          <i className="far fa-keyboard" />
        </div>

        {/* ELEVATOR */}
        <div className={`elevator floor-${floorNumber}`}>
        </div>

      </div>

      </div>
    </section>
  );
}

export default Activity;