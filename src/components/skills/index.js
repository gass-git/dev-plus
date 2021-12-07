import React, {useState, useEffect} from "react";
import useSound from "use-sound";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons"; 
import './skills.css';
import tickSound from "../../assets/sounds/tick-sound.wav";

// SVG icon components
import HTML_ICON from "../icons/html_icon";
import BOOTSTRAP_ICON from "../icons/bootstrap_icon";
import JAVASCRIPT_ICON from "../icons/javascript_icon";
import CSS_ICON from "../icons/css_icon";
import JQUERY_ICON from "../icons/jquery_icon";
import REACT_ICON from "../icons/react_icon";
import PHP_ICON  from "../icons/php_icon";
import LARAVEL_ICON from "../icons/laravel_icon";

export default function Skills({scores}) {
  const [section, setSection] = useState(1),
        [playTickSound] = useSound(tickSound,{volume: 0.6});

  function handleArrowClick(){
    section === 1 ? setSection(2) : setSection(1);
    playTickSound();
  }
  useEffect(() => {
    /** @abstract
     *  The skills component when it gets resized to a smaller screen 
     *  less than 750px of width it will use the left-side container 
     *  to show CORE TECH and FRAMEWORKS AND LIBARIES.
     *  If a use clicks down and then resizes the screen the skills
     *  component will display the FRAMEWORKS AND LIBRARIES in both
     *  sides. To avoid this from happening the following function
     *  has been implemented.
     */
    function handleResize() {
      if(window.innerWidth > 750) setSection(1);
    }
    window.addEventListener('resize', handleResize)
  })  

  const Skill = ({lang, label}) => {
    function handleIcon(lang){
      switch(lang){
       case "html": return <HTML_ICON/>;
       case "bootstrap": return <BOOTSTRAP_ICON/>;
       case "javascript": return <JAVASCRIPT_ICON/>;
       case "css": return <CSS_ICON/>;
       case "jquery": return <JQUERY_ICON/>;
       case "react": return <REACT_ICON/>;
       case "php": return <PHP_ICON/>;
       case "laravel": return <LARAVEL_ICON/>;
       default: return null;
      }
    }
    function getScore(tag){
      let tagModified = null, filteredData = null;
      if(tag === 'html5') { tagModified = 'html' }
      else if(tag === 'css3') {tagModified = 'css'}

      if(tagModified){
        filteredData = scores.filter((data) => {return data.tag_name === tagModified});
      }else{
        filteredData = scores.filter((data) => {return data.tag_name === tag});
      }

      var points = filteredData.map((lang) => { return lang.answer_score});
      points = points.length === 0 ?  "NF" : points;
      return points;
    }
    function getUrl(tag){
      var url = `https://stackoverflow.com/search?tab=votes&q=user%3a14895985 [${tag}]`;
      return url;
    }

    return [
      <div key={lang}>
        <ReactTooltip />
        <a 
          href={getUrl(lang)} 
          className="block" 
          target="_blank"
          rel="noreferrer"
          title="go to answers"
        >
          <div className="badge-wrapper">
            {handleIcon(lang)}
          </div>
        
          <div className="name">
            {label}
          </div>  

          <div className="score" data-tip="Stack Overflow score">
            {getScore(lang)}
          </div>
        </a>
      </div>
    ]
  }

  return [
    <section className="skills" key="skills-identifier">
      <div className="content">
        <div className="left-side">
          <div className="sub-title">
            CORE TECH {/* Disappears in smaller viewports */}
          </div>

          {/* -- Left side -- */}
          <div className="skills-wrapper">
            <div className={section === 1 ? 'show' : 'hide'}>
              <div className="media-title">
                CORE TECH {/* Appears in smaller viewports */}
              </div>
              <Skill key="javascript" lang="javascript" label="JavaScript" /> 
              <Skill key="html" lang="html" label="HTML5" /> 
              <Skill key="css" lang="css" label="CSS3" /> 
              <Skill key="php" lang="php" label="Hypertext Preprocessor" /> 
            </div>

            {/* -- For @media functionality -- */}
            <div className={section === 2 ? 'show' : 'hide'}>
              <div className="media-title">
                FRAMEWORKS & LIBRARIES
              </div>
                <Skill key="react-@media" lang="react" label="React" /> 
                <Skill key="jquery-@media" lang="jquery" label="jQuery"  /> 
                <Skill key="laravel-@media" lang="laravel" label="Laravel" /> 
                <Skill key="bootstrap-@media" lang="bootstrap" label="Bootstrap" />  
              </div>
            {/* ------------------------------ */}
          
          </div>
        </div>

        {/* -- Right side -- */}
        <div className="right-side">
          <div div className="sub-title">
            FRAMEWORKS & LIBRARIES
          </div>
          <div className="skills-wrapper">
            <Skill key="react" lang="react" label="React" /> 
            <Skill key="jquery" lang="jquery" label="jQuery"  /> 
            <Skill key="laravel" lang="laravel" label="Laravel" /> 
            <Skill key="bootstrap" lang="bootstrap" label="Bootstrap" /> 
          </div>
        </div>
      </div>

      {/* -- FOR @MEDIA small screens -- */}
      <div className="down-arrow-box">
       <FontAwesomeIcon 
        icon={section === 1 ? faCaretDown : faCaretUp} 
        className="icon"
        onClick={() => handleArrowClick()}
      />
      </div>
    </section>
  ]
}