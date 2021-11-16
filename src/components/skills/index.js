import React, {useState} from "react";
import './skills.css';

const Skills = () => {

  const Skill = ({lang, label, score}) => {
    var [over, setOver] = useState(false);

    function handleMouseOver(){
      setOver(true);
    }
    
    function handleMouseLeave(){
      setOver(false);
    }

    return (
      <div>
        <div className={over ? `badge-wrapper ${lang}-hover` : `badge-wrapper`} 
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <i className={`devicon-${lang}-plain`}></i>
        </div>
        <div className="details">
          <div className={`name ${lang}`}>
            {label}
          </div>
          <div className="score">
            {score}
          </div>
        </div>
      </div>
    );
  }

  return(
      <section className="skills">
      <div className="content">
        <div className="left-side">
          <div className="sub-title">
          ✨ CORE TECH
          </div>
          <div className="skills-wrapper">
            <Skill lang="javascript" label="JavaScript" score="30" /> 
            <Skill lang="html5" label="HTML5" score="23" /> 
            <Skill lang="css3" label="CSS3" score="12" /> 
            <Skill lang="php" label="Hypertext Preprocessor" score="5" /> 
          </div>
        </div>
        <div className="right-side">
          <div className="sub-title">
           📚 FRAMEWORKS & LIBRARIES
          </div>
          <div className="skills-wrapper">
            <Skill lang="react" label="React" score="10" /> 
            <Skill lang="jquery" label="jQuery" score="2" /> 
            <Skill lang="laravel" label="Laravel" score="18" /> 
            <Skill lang="bootstrap" label="Bootstrap" score="8" /> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;