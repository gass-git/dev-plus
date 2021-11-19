import React, {useState} from "react";
import './skills.css';

const Skills = ({scores}) => {

  const Skill = ({lang, label}) => {
    var [over, setOver] = useState(false);

    function getScore(tag){
      if(tag === 'html5') { tag = 'html' }
      else if(tag === 'css3') {tag = 'css'}

      var points = scores.filter(obj => obj.tag_name === tag)
      .map(el => el.answer_score);
  
      if(points.length === 0) points = "NF";
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
    );
  }

  return(
      <section className="skills">
      <div className="content">
        <div className="left-side">
          {/*<div className="sub-title">
          ✨ CORE TECH
          </div> */}
          <div className="skills-wrapper">
            <Skill lang="javascript" label="JavaScript" score="30" /> 
            <Skill lang="html5" label="HTML5" score="23" /> 
            <Skill lang="css3" label="CSS3" score="12" /> 
            <Skill lang="php" label="Hypertext Preprocessor" score="5" /> 
          </div>
        </div>
        <div className="right-side">
          {/*<div className="sub-title">
           📚 FRAMEWORKS & LIBRARIES
          </div>*/}
          <div className="skills-wrapper">
            <Skill lang="react" label="React" /> 
            <Skill lang="jquery" label="jQuery"  /> 
            <Skill lang="laravel" label="Laravel" /> 
            <Skill lang="java" label="Java"  /> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;