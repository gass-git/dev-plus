import React, {useState, useEffect} from "react";
import useSound from "use-sound";
import './skills.css';
import tickSound from "../../assets/sounds/tick-sound.wav";

// SVG icon components
import HTML_icon from "../../iconComponents/html_icon";
import Bootstrap_icon from "../../iconComponents/bootstrap_icon";
import Javascript_icon from "../../iconComponents/javascript_icon";
import CSS_icon from "../../iconComponents/css_icon";
import Jquery_icon from "../../iconComponents/jquery_icon";
import React_icon from "../../iconComponents/react_icon";
import PHP_icon  from "../../iconComponents/php_icon";
import Laravel_icon from "../../iconComponents/laravel_icon";
// import  from "../../iconComponents/";

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
    var [over, setOver] = useState(false);

    function handleIcon(lang){
      switch(lang){
       case "html": return <HTML_icon/>;
       break;
       case "bootstrap": return <Bootstrap_icon/>;
       break;
       case "javascript": return <Javascript_icon/>;
       break;
       case "css": return <CSS_icon/>;
       break;
       case "jquery": return <Jquery_icon/>;
       break;
       case "react": return <React_icon/>;
       break;
       case "php": return <PHP_icon/>;
       break;
       case "laravel": return <Laravel_icon/>;
       break;
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
           CORE TECH
          </div>
          <div className="skills-wrapper">
            <div className={arrowClicked === false ? 'show' : 'hide'}>
              <div className="media-title">
                 CORE TECH
              </div>
              <Skill key={1} lang="javascript" label="JavaScript" /> 
              <Skill key={2} lang="html" label="HTML5" /> 
              <Skill key={3} lang="css" label="CSS3" /> 
              <Skill key={4} lang="php" label="Hypertext Preprocessor" /> 
            </div>
            {/* -- FOR @MEDIA functionality -- */}
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