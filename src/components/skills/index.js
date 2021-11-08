import React from "react";
import './skills.css';

const Skills = () => {
    return(
        <section className="skills">
        <div className="title">
          Skills
        </div>
        <div className="content">
          <div className="left-side">
            <div className="sub-title">
              CORE TECH
            </div>
            <div className="skills-wrapper">
              {/* JavaScript */}
              <div>
                <div className="badge-wrapper">
                  <i className="devicon-javascript-plain yellow"></i>
                </div>
                <div className="details">
                  <div className="name bb-yellow">
                    JavaScript
                  </div>
                  <div className="score">
                    30
                  </div>
                </div>
              </div>
              {/* HTML */}
              <div>
                <div className="badge-wrapper">
                  <i className="devicon-html5-plain orangered"></i>
                </div>
                <div className="details">
                  <div className="name bb-orangered">
                    HTML
                  </div>
                  <div className="score">
                    32
                  </div>
                </div>
              </div>
              {/* CSS */}
              <div>
                <div className="badge-wrapper">
                  <i className="devicon-css3-plain blue"></i>
                </div>
                <div className="details">
                  <div className="name bb-blue">
                    CSS
                  </div>
                  <div className="score">
                    27
                  </div>
                </div>
              </div>
              {/* PHP */}
              <div>
                <div className="badge-wrapper">
                  <i className="devicon-php-plain black"></i>
                </div>
                <div className="details">
                  <div className="name bb-grey">
                    CSS
                  </div>
                  <div className="score">
                    27
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div className="right-side">
            <div className="sub-title">
              FRAMEWORKS & LIBRARIES
            </div>
            <div className="skills-wrapper">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Skills;