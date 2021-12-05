import React, {Fragment, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStackOverflow, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faKeyboard} from "@fortawesome/free-solid-svg-icons";
import './activity.css';
import Date from './childrens/date';
import useSound from "use-sound";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

const Activity = ({answers, gitEvents, posts}) => {
  var [current, setCurrent] = useState('stackoverflow');
  var [posNumber, setPosNumber] = useState(3);
  const [playSound] = useSound(selectionSound, {volume: 1});
  const space = <Fragment>&nbsp; &nbsp; &nbsp;</Fragment>;

  function select(entry){
    setCurrent(entry);
    playSound();
    
    // Elevator floor
    if(entry === "stackoverflow"){setPosNumber(3)}
    else if(entry === "github"){setPosNumber(2)}
    else if(entry === "writings"){setPosNumber(1)}
  }
  const Stackoverflow = () => {
    return [
      <Fragment key={"SO-identifier"}>
        <div className="sub-title">
            LATEST EDITS & ANSWERS
        </div>
        <div className="container">
          {answers.map((data) => {
            let answer_id = data.answer_id,
              answerURL = "https://stackoverflow.com/a/" + answer_id;
            
            return [
              <a 
                key={answer_id} 
                href={answerURL} 
                className="block" 
                target="_blank" 
                rel="noreferrer"
              >
                <div className="date">
                  <Date entry={data.creation_date} />
                </div>
                <div className="question">
                  {data.title}
                </div>
              </a>
            ]
            })}
        </div> 
      </Fragment>
    ];
  }
  const GithubEvents = () => {
    return [
      <Fragment key="git-identifier">
        <div className="sub-title">
            LATEST COMMITS
        </div>
        <div className="container">
          {gitEvents.map((data) => {
            var event_id = data.id;
            let repoName = data.repo.name;
            let repoURL = "https://github.com/" + repoName + "/commits/master";
            repoName = repoName.slice(9);
            let date = data.created_at;
            let commit = data.payload.commits[0].message;

            date = date.slice(0,10);
            return [
              <a key={event_id} href={repoURL} className='block' target="_blank" rel="noreferrer">
                <div className="events-date">
                  {date}
                </div>
                <div className="commit">{commit}</div>
                {space}
                <div className="repo-name">{repoName}</div>
              </a>
            ]
          })}
        </div>
      </Fragment>
    ];
    
  }
  const Writings = () => {
    return [
      <Fragment key="writings-identifier">
        <div className="sub-title">
            LATEST WRITINGS
          </div>
        <div className="container">
          {posts.map((post) => {
            let postURL = `https://blog.gass.dev/post=${post.id}+no_scroll`;
            let date = post.created_at;
            date = date.slice(0,10);

            return [
            <a key={post.id} href={postURL} className="block" target="_blank" rel="noreferrer">
              <div className="date">
              {date}
              </div>
              <div className="post-title">
              {post.title}
              </div>
            </a>
            ]
          })}
        </div> 
      </Fragment>
    ]
  }

  return (
    <section className="activity">
      <div className="content">
        
        {/* -- For @media -- */}
        <div className="media-top-selector">
          <div 
            style={{ marginRight:"7px"  }}
            className="option"
            onClick={() => select('stackoverflow')}
          >
            <FontAwesomeIcon 
              icon={faStackOverflow} 
              style={{ margin: "13px auto" }} 
              className="icon shadow-04" 
            />
          </div>
          <div 
            style={{ marginRight:"7px" }}
            className="option"
            onClick={() => select('github')}
          >
            <FontAwesomeIcon icon={faGithub} className="icon shadow-04"/>
          </div>
          <div 
            className="option"
            onClick={() => select('writings')}
          >
            <FontAwesomeIcon icon={faKeyboard} className="icon shadow-04" />
          </div>

          {/* -- Elevator -- */}
          <div className={`wiggle pos-${posNumber}`}>
          </div>
          {/* -------------- */}

        </div>
        {/* -- End of @media section -- */}

        {/* -- Left side -- */}
        <div className="left-side">
          {current === "stackoverflow" ? <Stackoverflow /> : null}
          {current === "github" ? <GithubEvents /> : null}
          {current === "writings" ? <Writings /> : null}
        </div>

      {/* -- Right side -- */}
      <div className="right-side">
        
        <div 
          style={{ marginTop:"-1px" }}
          className="option"
          onClick={() => select('stackoverflow')}
        >
          <FontAwesomeIcon icon={faStackOverflow} className='icon shadow-04'/>
        </div>
        <div 
          style={{ marginTop:"11px" }}
          className="option"
          onClick={() => select('github')}
        >
          <FontAwesomeIcon icon={faGithub} className='icon shadow-04'/>
        </div>
        <div 
          style={{ marginTop:"12px" }}
          className="option"
          onClick={() => select('writings')}
        >
          <FontAwesomeIcon icon={faKeyboard} className='icon shadow-04'/>
        </div>

        {/* -- Elevator -- */}
        <div className={`elevator floor-${posNumber}`}>
        </div>
        {/* -------------- */}

      </div>
      {/* -- End of right side -- */}

      </div>
    </section>
  );
}

export default Activity;