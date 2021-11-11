import React, {useState} from "react";
import { Fragment } from "react/cjs/react.production.min";
import './projects.css';

const Projects = ({repos}) => {
  var [current, setCurrent] = useState(0);
  var totalRepos = repos.length;
  var totalSections = Math.ceil(totalRepos/3);
  var [currentSection, setCurrentSection] = useState(1);
  var [indexes, setIndexes] = useState([0,1,2]);

  const RepoDetails = () => {
    return [
    <Fragment>
      <div className="about">
              {repos[current].about}
            </div>
            <div className="link">
              <a href={repos[current].url} target="_blank">
              <i class="fas fa-link"></i> {repos[current].url}
              </a>
            </div>
            <div className="tags">
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
  }

  function showNext(){
    var firstIndex = indexes[2] + 1,
    secondIndex = indexes[2] + 2,
    thirdIndex = indexes[2] + 3,
    newIndexes = [firstIndex, secondIndex, thirdIndex];
    setIndexes(newIndexes);
    setCurrentSection(currentSection + 1);
  }

  return (
      <section className="projects">
        <div className="title">
          Projects
        </div>
        <div className="content">
            <div className="left-side">
              <div>
                <i 
                  class={currentSection > 1 ? "fas fa-sort-up" : null}
                  onClick={() => showPreviews()}
                />
              </div>
            {
              indexes.map((i) => {
                return[
                  <div 
              className={current === i ? "selected" : "not-selected"}
              onClick={() => select(i)}
            >
              {repos[i].name}
            </div>
                ]
              })
            }
            <div>
              More <i 
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