import React, { useState, useContext, Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { faPaperclip, faCaretLeft, faCaretRight, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle, faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import './projects.css'
import useSound from "use-sound"
import tickSound from "../../assets/sounds/tick-sound.wav"
import selectionSound from '../../assets/sounds/game-selection-sound.wav'
import { AppContext } from "../../App"
import { space3 } from "../../spaces"

export default function Projects() {
  const { state, dispatch } = useContext(AppContext)
  const { repos } = state

  const [current, setCurrent] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)
  const [indexes, setIndexes] = useState([0, 1, 2, 3])
  const [playTickSound] = useSound(tickSound, { volume: 0.6 })
  const [playSelectionSound] = useSound(selectionSound, { volume: 1 })

  let totalRepos = repos.length
  let totalSections = Math.ceil(totalRepos / 4)

  useEffect(() => {
    dispatch({
      type: 'update selected',
      optionSelected: 'projects'
    })
  }, [dispatch])


  const RepoDetails = () => {
    let link = repos[current].url

    const LinkField = () => {
      if (link) {
        return [
          <a key={link} href={link} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faPaperclip} className="icon shadow-04" />
            {space3} {repos[current].url}
          </a>
        ]
      } else {
        return [
          <div key={link} className="not-available">
            <FontAwesomeIcon icon={faTimesCircle} className="icon shadow-04" />
            {space3} No link available
          </div>
        ]
      }
    }

    return [
      <Fragment key={repos[current].created_at}>
        <div className="about">
          {repos[current].about}
        </div>
        <div className="link">
          <LinkField />
        </div>
        <div className="tags-wrapper">
          {repos[current].topics.map((topic) => {
            return [
              <div key={topic} className="tag">
                {topic}
              </div>
            ];
          })}
        </div>
      </Fragment>
    ]
  }
  function select(repo) {
    setCurrent(repo);
    playSelectionSound();
  }
  function showPreviewsSection() {
    var newIndexes = [
      indexes[0] - 4,
      indexes[0] - 3,
      indexes[0] - 2,
      indexes[0] - 1
    ];
    setIndexes(newIndexes);
    setCurrentSection(currentSection - 1);
    setCurrent(indexes[0] - 4);
  }
  function showNextSection() {
    var newIndexes = [
      indexes[3] + 1,
      indexes[3] + 2,
      indexes[3] + 3,
      indexes[3] + 4
    ];
    setIndexes(newIndexes);
    setCurrentSection(currentSection + 1);
    setCurrent(indexes[3] + 1);
  }
  function previewsProject() {
    if (current > 0) {
      setCurrent(current - 1);
      playTickSound();
    }
  }
  function nextProject() {
    // (totalRepos - 1) is the maximum index of the repos array
    if (current < totalRepos - 1) {
      setCurrent(current + 1);
      playTickSound();
    }
  }
  function handleUpClick() {
    if (currentSection > 1) {
      showPreviewsSection();
      playTickSound();
    }
  }
  function handleDownClick() {
    if (currentSection !== totalSections) {
      showNextSection();
      playTickSound();
    }
  }
  function handleLeftArrowClass() {
    if (current === totalRepos - 1) {
      return "icon shadow-08 pointer animate"
    }
    else if (current !== 0) {
      return "icon shadow-08 pointer"
    }
    else {
      return "icon shadow-08"
    }
  }
  function handleRightArrowClass() {
    if (current === 0) {
      return "icon shadow-08 pointer animate";
    }
    else if (current < totalRepos - 1) {
      return "icon shadow-08 pointer";
    }
    else {
      return "icon shadow-08";
    }
  }
  return [
    <section key="projects-identifier" className="projects">
      <div className="content">

        {/* @MEDIA - small screens */}
        <div className="switcher-box">
          <div className="arrow-left">
            <FontAwesomeIcon
              icon={faCaretLeft}
              className={handleLeftArrowClass()}
              onClick={() => previewsProject()}
            />
          </div>
          <div className="project-name">
            {repos[current].name}
          </div>
          <div className="arrow-right">
            <FontAwesomeIcon
              icon={faCaretRight}
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
            <FontAwesomeIcon
              icon={faSortUp}
              className={currentSection > 1 ? "icon shadow-08" : "icon shadow-08 opacity-05"}
              onClick={handleUpClick}
            />
          </div>
          <div className="options-wrapper">
            {indexes.map((i) => {
              if (parseInt(i) < totalRepos) {
                return [
                  <div
                    key={i}
                    className={current === i ? "option selected" : "option not-selected"}
                    onClick={() => select(i)}
                  >
                    <div className="folder">
                      <FontAwesomeIcon
                        icon={current === i ? faFolderOpen : faFolder}
                        className={current === i ? "icon-yellow shadow-08" : "icon-white shadow-08"}
                      />
                    </div>
                    <div className="project-name">
                      {repos[i].name}
                    </div>

                  </div>
                ]
              }
              else { return null }
            })}
          </div>
          <div className="bottom-arrow-box">
            <FontAwesomeIcon
              icon={faSortDown}
              className={currentSection !== totalSections ? "icon shadow-08" : "icon shadow-08 opacity-05"}
              onClick={handleDownClick}
            />
          </div>
        </div>

      </div>
    </section>
  ]
}