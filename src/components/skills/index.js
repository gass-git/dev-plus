import React, {useState, useEffect} from "react";
import useSound from "use-sound";
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

const Skills = ({scores}) => {
  var [arrowClicked, setArrowClicked] = useState(false);
  const [playTickSound] = useSound(tickSound,{volume: 0.6});

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
      if(window.innerWidth > 750) setArrowClicked(false);
    }
    window.addEventListener('resize', handleResize)
  })  

  function handleArrowClick(){
    setArrowClicked(!arrowClicked)

    // Sound effect
    playTickSound();
  }

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

    return (
      <div>
        <a href={getUrl(lang)} 
        className="block" 
        target="_blank"
        rel="noreferrer"
        >
          <div className="badge-wrapper">
            {handleIcon(lang)}
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
          <div className="sub-title">
           CORE TECH {/* Disappears in smaller viewports */}
          </div>

          {/* -- Left side -- */}
          <div className="skills-wrapper">
            <div className={arrowClicked === false ? 'show' : 'hide'}>
              <div className="media-title">
                 CORE TECH {/* Appears in smaller viewports */}
              </div>
              <Skill key={1} lang="javascript" label="JavaScript" /> 
              <Skill key={2} lang="html" label="HTML5" /> 
              <Skill key={3} lang="css" label="CSS3" /> 
              <Skill key={4} lang="php" label="Hypertext Preprocessor" /> 
            </div>

            {/* -- For @media functionality -- */}
            <div className={arrowClicked === true ? 'show' : 'hide'}>
              <div className="media-title">
                 FRAMEWORKS & LIBRARIES
              </div>
              <Skill lang="react" label="React" /> 
              <Skill lang="jquery" label="jQuery"  /> 
              <Skill lang="laravel" label="Laravel" /> 
              <Skill lang="php" label="Java"  /> 
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
            <Skill key={5} lang="react" label="React" /> 
            <Skill key={6} lang="jquery" label="jQuery"  /> 
            <Skill key={7} lang="laravel" label="Laravel" /> 
            <Skill key={8} lang="bootstrap" label="Bootstrap"  /> 
          </div>
        </div>
      </div>

      {/* -- FOR @MEDIA small screens -- */}
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