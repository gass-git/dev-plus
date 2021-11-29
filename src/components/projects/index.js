import React, {useState} from "react";
import { Fragment } from "react";
import './projects.css';
import useSound from "use-sound";
import tickSound from "../../assets/sounds/tick-sound.wav";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

const Projects = ({repos}) => {
  var [current, setCurrent] = useState(0);
  var totalRepos = repos.length;
  var totalSections = Math.ceil(totalRepos/4);
  var [currentSection, setCurrentSection] = useState(1);
  var [indexes, setIndexes] = useState([0,1,2,3]);
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;
  const [playTickSound] = useSound(tickSound,{volume: 0.6});
  const [playSelectionSound] = useSound(selectionSound, {volume:1});

  const RepoDetails = () => {
    let link = repos[current].url;
    
    const LinkField = () => {
      if(link){
        return [
          <a key={5} href={link} target="_blank" rel="noreferrer">
            <i className="fas fa-paperclip" />
             {space} {repos[current].url}
          </a>
        ];
      }else{
        return [
          <div key={6} className="not-available">
            <i className="far fa-times-circle" />
              {space} No link available
          </div>
        ];
      }
    }

    return [
    <Fragment key={7}>
      <div key={12} className="about">
              {repos[current].about}
      </div>
      <div key={13} className="link">
        <LinkField />
      </div>
      <div key={14} className="tags-wrapper">
        {
          repos[current].topics.map((topic)=>{
            return [
              <div key={8} className="tag">
                {topic}
              </div>
            ];
          })
        }
      </div>
    </Fragment>];
  }
  function select(repo){
    setCurrent(repo);

    // Sound effect
    playSelectionSound();
  }
  function showPreviewsSection(){
    var firstIndex = indexes[0] - 4,
    secondIndex = indexes[0] - 3,
    thirdIndex = indexes[0] - 2,
    fourthIndex = indexes[0] - 1,
    newIndexes = [firstIndex, secondIndex, thirdIndex, fourthIndex];
    setIndexes(newIndexes);
    setCurrentSection(currentSection - 1);
    setCurrent(firstIndex);
  }
  function showNextSection(){
    var firstIndex = indexes[3] + 1,
    secondIndex = indexes[3] + 2,
    thirdIndex = indexes[3] + 3,
    fourthIndex = indexes[3] + 4,
    newIndexes = [firstIndex, secondIndex, thirdIndex];
    setIndexes(newIndexes);
    setCurrentSection(currentSection + 1);
    setCurrent(firstIndex);
  }
  function previewsProject(){
    if(current > 0) {
      setCurrent(current - 1);
      
      // Sound effect
      playTickSound();
    }
  }
  function nextProject(){
    // (totalRepos - 1) is the maximum index of the repos array
    if(current < totalRepos - 1){ 
      setCurrent(current + 1)

      // Sound effect
      playTickSound();
    }
  }
  function handleUpClick(){
    // Sound effect
    playTickSound();
    if(currentSection > 1){showPreviewsSection()} 
  }
  function handleDownClick(){
    // Sound effect
    playTickSound();
    if(currentSection !== totalSections){showNextSection()}
  }
  function handleLeftArrowClass(){
    if(current === totalRepos - 1){
      return "fas fa-caret-left pointer animate"
    }
    else if(current !== 0){
      return "fas fa-caret-left pointer"
    }
    else{
      return "fas fa-caret-left"
    }
  }
  function handleRightArrowClass(){
    if(current === 0){
      return "fas fa-caret-right pointer animate";
    }
    else if(current < totalRepos - 1){
      return "fas fa-caret-right pointer";
    }              
    else{
      return "fas fa-caret-right";
    }
  }
  return (
      <section key={17} className="projects">
        <div className="content">

          {/* @MEDIA - small screens */}
          <div className="switcher-box">
            <div className="arrow-left">
              <i 
                className={handleLeftArrowClass()} 
                onClick={() => previewsProject()}
              />
            </div>
            <div className="project-name">
              {repos[current].name}
            </div>
            <div className="arrow-right">
              <i 
                className={handleRightArrowClass()}
                onClick={() => nextProject()}
              />
            </div>
          </div>

          {/* LEFT SIDE */}
          <div className="left-side">
            <RepoDetails />
          </div>

          {/* RIGHT SIDE */}
          <div className="right-side">
            <div className="top-arrow-box">
              <i 
                className={currentSection > 1 ? "fas fa-sort-up" : "fas fa-sort-up opacity-05"}
                onClick={handleUpClick}
              />
            </div>
            <div className="options-wrapper">
              {
                indexes.map((i) => {
                  let iconClass = current === i ? "far fa-folder-open" : "far fa-folder";

                  if(parseInt(i) < totalRepos){
                    return[
                      <div
                        key={20}
                        className={current === i ? "option selected" : "option not-selected"}
                        onClick={() => select(i)}
                      >
                        <div className="folder">
                          <i className={iconClass}></i>
                        </div>
                        <div className="project-name">
                          {repos[i] ?repos[i].name : null}
                        </div>
                      
                      </div>
                    ]
                  }
                  else { return null; }
                })
              }
            </div>  
          <div className="bottom-arrow-box">
              <i 
              className={currentSection !== totalSections ? "fas fa-sort-down" : "fas fa-sort-down opacity-05"}
              onClick={handleDownClick}
            />
          </div>
        </div>
         
        </div>
    </section>
  );
}

export default Projects;