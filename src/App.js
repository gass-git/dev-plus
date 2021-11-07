import React, {useState, useEffect } from 'react';
import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';
import MainMenu from './components/mainMenu/index';
import BasicInfo from './components/BasicInfo/index';
import Activity from './components/Activity/index';

const App = () => {

  return (
    <div className="main-wrapper">

      <section className="first-row">
        {/*<ScrollDisplay />*/}
      </section>
      
      <section className="second-row">
        <div className="left-side">
          <MainMenu />
        </div>
        <div className="right-side">
          <BasicInfo />
        </div>
      </section>
      
      <section className="third-row">
        <Activity />
      </section>

    </div>
  );
}

export default App;
