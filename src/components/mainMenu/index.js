import React from "react";
import './mainMenu.css';

const MainMenu = () => {
  return (
  <section className="main-menu">
    <div className="border-img">
      <div className="inner-container">
        <div className="menu-wrapper">
          <div>
            About
          </div>
          <div>
            Skills
          </div>
          <div>
            Projects
          </div>
          <div>
            Activity
          </div>
        </div>
      </div>
    </div>
  </section>  
  );
}

export default MainMenu;