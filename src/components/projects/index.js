import React, {useState} from "react";
import { Fragment } from "react";
import './projects.css';
import useSound from "use-sound";
import tickSound from "../../assets/sounds/tick-sound.wav";
import selectionSound from '../../assets/sounds/game-selection-sound.wav';

const Projects = ({repos}) => {
  var [current, setCurrent] = useState(0);
  var totalRepos = repos.length;
  var totalSections = Math.ceil(totalRepos/3);
  var [currentSection, setCurrentSection] = useState(1);
  var [indexes, setIndexes] = useState([0,1,2]);
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;
  const [playTickSound] = useSound(tickSound,{volume: 0.6});
  const [playSelectionSound] = useSound(selectionSound, {volume:0.8});

  const RepoDetails = () => {
    let link = repos[current].url;
    
    const LinkField = () => {
      if(link){
        return [
          <a href={link} target="_blank" rel="noreferrer">
            <i class="fas fa-paperclip" />
             {space} {repos[current].url}
          </a>
        ];
      }else{
        return [
          <div className="not-available">
            <i class="far fa-times-circle" />
              {space} No link available
          </div>
        ];
      }
    }

    return [
    <Fragment>
      <div className="about">
              {repos[current].about}
      </div>
      <div className="link">
        <LinkField />
      </div>
      <div className="tags-wrapper">
        {repos[current].topics.map((topic)=>{
          return [
            <div className="tag">
              {topic}
            </div>
          ];
        })}
      </div>
    </Fragment>];
  }

  function select(repo){
    setCurrent(repo);

    // Sound effect
    playSelectionSound();
  }

  function showPreviews(){
    var firstIndex = indexes[0] - 3,
    secondIndex = indexes[0] - 2,
    thirdIndex = indexes[0] - 1,
    newIndexes = [firstIndex, secondIndex, thirdIndex];
    setIndexes(newIndexes);
    setCurrentSection(currentSection - 1);
    setCurrent(firstIndex);
  }

  function showNext(){
    var firstIndex = indexes[2] + 1,
    secondIndex = indexes[2] + 2,
    thirdIndex = indexes[2] + 3,
    newIndexes = [firstIndex, secondIndex, thirdIndex];
    setIndexes(newIndexes);
    setCurrentSection(currentSection + 1);
    setCurrent(firstIndex);
  }

  function handleUpClick(){
    // Sound effect
    playTickSound();
    if(currentSection > 1){showPreviews()} 
  }

  function handleDownClick(){
    // Sound effect
    playTickSound();
    if(currentSection !== totalSections){showNext()}
  }

  return (
      <section className="projects">
        <div className="content">

          {/* LEFT SIDE */}
          <div className="left-side">
            <RepoDetails />
          </div>

          {/* RIGHT SIDE */}
          <div className="right-side">
            <div className="top-arrow-box">
              <i 
                class={currentSection > 1 ? "fas fa-sort-up" : "fas fa-sort-up opacity-05"}
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
                        className={current === i ? "option selected" : "option not-selected"}
                        onClick={() => select(i)}
                      >
                        <div className="folder">
                          <i class={iconClass}></i>
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
              class={currentSection !== totalSections ? "fas fa-sort-down" : "fas fa-sort-down opacity-05"}
              onClick={handleDownClick}
            />
          </div>
        </div>
         
        </div>
    </section>
  );
}

export default Projects;