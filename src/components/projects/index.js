import React, {useState} from "react";
import { Fragment } from "react";
import './projects.css';

const Projects = ({repos}) => {
  var [current, setCurrent] = useState(0);
  var totalRepos = repos.length;
  var totalSections = Math.ceil(totalRepos/3);
  var [currentSection, setCurrentSection] = useState(1);
  var [indexes, setIndexes] = useState([0,1,2]);
  var space = <Fragment>&nbsp;&nbsp;&nbsp;</Fragment>;

  const RepoDetails = () => {
    let link = repos[current].url;
    
    const LinkField = () => {
      if(link){
        return [
          <a href={link} target="_blank">
            <i class="fas fa-link" />
             {space} {repos[current].url}
          </a>
        ];
      }else{
        return [
          <div>
            <i class="fas fa-link" />
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

  return (
      <section className="projects">
        <div className="title">
          Projects
        </div>
        <div className="content">
            <div className="left-side">
              <div className="top-arrow-box">
                <i 
                  class={currentSection > 1 ? "fas fa-sort-up" : null}
                  onClick={() => showPreviews()}
                />
              </div>
            {
              indexes.map((i) => {
                return[
                  <div
              className={current === i ? "name selected" : "name not-selected"}
              onClick={() => select(i)}
            >
              {repos[i] ?repos[i].name : null}
            </div>
                ]
              })
            }
            <div className="bottom-arrow-box">
               <i 
                class={currentSection === totalSections ? null : "fas fa-sort-down"}
                onClick={() => showNext()}
              />
            </div>
          </div>
          <div className="right-side">
            <RepoDetails />
          </div>
        </div>
    </section>
  );
}

export default Projects;