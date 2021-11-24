import React, {useState} from "react";
import useSound from "use-sound";
import './skills.css';
import tickSound from "../../assets/sounds/tick-sound.wav";

const Skills = ({scores}) => {
  var [arrowClicked, setArrowClicked] = useState(false);
  const [playTickSound] = useSound(tickSound,{volume: 0.6});

  function handleArrowClick(){
    setArrowClicked(!arrowClicked)

    // Sound effect
    playTickSound();
  }

  const Skill = ({lang, label}) => {
    var [over, setOver] = useState(false);

    function getScore(tag){
      if(tag === 'html5') { tag = 'html' }
      else if(tag === 'css3') {tag = 'css'}

      var filteredData = scores.filter((data) => {return data.tag_name === tag});
      var points = filteredData.map((lang) => { return lang.answer_score});
  
      points = points.length === 0 ?  "NF" : points;
      return points;
    }
    function getUrl(tag){
      var url = `https://stackoverflow.com/search?tab=votes&q=user%3a14895985 [${tag}]`;
      return url;
    }
    function handleMouseOver(){
      setOver(true);
    }
    function handleMouseLeave(){
      setOver(false);
    }

    return (
      <div>
        <a href={getUrl(lang)} 
        className="block" 
        target="_blank"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseLeave()}
        rel="noreferrer"
        >
          <div className={over ? `badge-wrapper ${lang}-hover` : `badge-wrapper`} >
            <i className={`devicon-${lang}-plain`}></i>
          </div>
        
          <div className={`name`}>
            {label}
          </div>  

          <div className="score">
            {getScore(lang)}
          </div>

        </a>
      </div>
    )
  }

  return (
      <section className="skills">
      <div className="content">
        <div className="left-side">
          {/*<div className="sub-title">
          ✨ CORE TECH
          </div> */}
          <div className="skills-wrapper">
            <div className={arrowClicked === false ? 'show' : 'hide'}>
              <Skill key={1} lang="javascript" label="JavaScript" score="30" /> 
              <Skill key={2} lang="html5" label="HTML5" score="23" /> 
              <Skill key={3} lang="css3" label="CSS3" score="12" /> 
              <Skill key={4} lang="php" label="Hypertext Preprocessor" score="5" /> 
            </div>
            {/* -- FOR @MEDIA functionality -- */}
            <div className={arrowClicked === true ? 'show' : 'hide'}>
              <Skill lang="react" label="React" /> 
              <Skill lang="jquery" label="jQuery"  /> 
              <Skill lang="laravel" label="Laravel" /> 
              <Skill lang="java" label="Java"  /> 
            </div>
            {/* ------------------------------ */}
          </div>
        </div>
        <div className="right-side">
          {/*<div className="sub-title">
           📚 FRAMEWORKS & LIBRARIES
          </div>*/}
          <div className="skills-wrapper">
            <Skill key={5} lang="react" label="React" /> 
            <Skill key={6} lang="jquery" label="jQuery"  /> 
            <Skill key={7} lang="laravel" label="Laravel" /> 
            <Skill key={8} lang="java" label="Java"  /> 
          </div>
        </div>
      </div>
      <div className="down-arrow-box">
        <i 
          className={arrowClicked === true ? "fas fa-caret-up" : "fas fa-caret-down"}
          onClick={() => handleArrowClick()} 
        />
      </div>
    </section>
  )
}

export default Skills;