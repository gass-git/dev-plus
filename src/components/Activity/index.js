import React, {Fragment, useState} from "react";
import './activity.css';
import Date from './childrens/date';
import useSound from "use-sound";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

const Activity = ({answers, gitEvents, posts}) => {
  var [current, setCurrent] = useState('stackoverflow');
  var [posNumber, setPosNumber] = useState(3);
  const [playSound] = useSound(selectionSound, {volume: 1});

  function select(entry){
    setCurrent(entry);

    // Sound effect
    playSound();
    
    // Elevator floor
    if(entry === "stackoverflow"){setPosNumber(3)}
    else if(entry === "github"){setPosNumber(2)}
    else if(entry === "writings"){setPosNumber(1)}
  }

  const Writings = () => {
    return [
      <Fragment key={0}>
        <div className="sub-title">
            LATEST WRITINGS
          </div>
        <div className="container">
          {
            posts.map((post) => {
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
            })
          }
        </div> 
      </Fragment>
    ]
  }

  const Stackoverflow = () => {
    return [
      <Fragment key={1}>
        <div className="sub-title">
            LATEST EDITS & ANSWERS
          </div>
        <div className="container">
          {
            answers.map((data) => {
              let answerURL = "https://stackoverflow.com/a/" + data.answer_id;

              return [
                <a key={23} href={answerURL} className="block" target="_blank" rel="noreferrer">
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
      <Fragment key={2}>
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
              let commit = data.payload.commits[0].message;
              let push_id = data.payload.push_id;

              date = date.slice(0,10);
              return [
                <a key={push_id} href={repoURL} className='block' target="_blank" rel="noreferrer">
                  <div className="date">
                    {date}
                  </div>
                  <div className="commit">{commit}</div>
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
        
        {/* -- FOR @MEDIA -- */}
        <div className="media-top-selector">
          <div style={{ marginRight:"7px"  }}
            className="option"
            onClick={() => select('stackoverflow')}
          >
            <i style={{ margin: "13px auto" }} className="fab fa-stack-overflow" /> 
          </div>
          <div style={{ marginRight:"7px" }}
            className="option"
            onClick={() => select('github')}
          >
            <i className="fab fa-github" />
          </div>
          <div style={{   }}
            className="option"
            onClick={() => select('writings')}
          >
            <i  className="far fa-keyboard" />
          </div>

          {/* ELEVATOR */}
          <div className={`wiggle pos-${posNumber}`}>
          </div>
        </div>
        {/* --------------- */}

        {/* -- LEFT SIDE -- */}
        <div className="left-side">
          {current === "stackoverflow" ? <Stackoverflow /> : null}
          {current === "github" ? <GithubEvents /> : null}
          {current === "writings" ? <Writings /> : null}
        </div>

      {/* -- RIGHT SIDE -- */}
      <div className="right-side">
        
        <div style={{ marginTop:"-1px" }}
          className="option"
          onClick={() => select('stackoverflow')}
        >
          <i className="fab fa-stack-overflow" /> 
        </div>
        <div style={{ marginTop:"7px" }}
          className="option"
          onClick={() => select('github')}
        >
          <i className="fab fa-github" />
        </div>
        <div style={{ marginTop:"6px" }}
          className="option"
          onClick={() => select('writings')}
        >
          <i className="far fa-keyboard" />
        </div>

        {/* ELEVATOR */}
        <div className={`elevator floor-${posNumber}`}>
        </div>

      </div>

      </div>
    </section>
  );
}

export default Activity;