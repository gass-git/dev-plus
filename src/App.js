import React, {useState, useEffect } from 'react';
import './global/App.css';
import ScrollDisplay from './components/scrollDisplay/index';

const App = () => {
  var [hoverOne, setHoverOne] = useState(false);
  var [hoverTwo, setHoverTwo] = useState(false);

  function handleHoverTwo(e){
    setHoverTwo(!hoverTwo);
  }

  function handleHoverOne(e){
    setHoverOne(!hoverOne);
  }

  return (
    <div className="main-wrapper">
      
      <section className="first-row">
        
        <div className="border-img">
          <div className="inner-container">
            <ScrollDisplay />
          </div>
        </div>

      </section>
      
      <section className="second-row">
        
        <div className="left-side">
          <div className="border-img">
            <div className="inner-container">
              <div className="menu-wrapper">
                <div>
                  General
                </div>
                <div>
                  About
                </div>
                <div>
                  Skills
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="right-side">
          <div className="border-img">
              <div className="inner-container">
                <div className="pic-name">
                  <div className="name">
                    GASS
                  </div>
                  <div className="pic">
                    <img src="http://localhost:3000/images/avatar.png" alt="" />
                  </div>
                </div>
                <div className="info">
                  asasd asdasd
                </div>
              </div>
          </div>
        </div>

      </section>

      <section className="third-row">

        <div className="border-img">
          <div className="inner-container">
            <div className="arrow-menu">
              <div className="previews">
                previews
              </div>
              <div className="left-arrow">
                <img 
                    src={ hoverTwo ? "images/arrow-left-2.png" : "images/arrow-left-1.png" }
                    alt="" 
                    onMouseEnter={handleHoverTwo}
                    onMouseLeave={handleHoverTwo}/>
              </div>
              <div className="selected">
                category
              </div>
              <div className="right-arrow">
                <img 
                  src={ hoverOne ? "images/arrow-right-2.png" : "images/arrow-right-1.png" }
                  alt="" 
                  onMouseEnter={handleHoverOne}
                  onMouseLeave={handleHoverOne}/>
              </div>
              <div className="next">
                next
              </div>
            </div>
          </div>
        </div> 

      </section>

    </div>
  );
}

export default App;
