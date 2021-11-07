import React, {useState} from "react";
import './activity.css';

const Activity = () => {
  var [hoverOne, setHoverOne] = useState(false);
  var [hoverTwo, setHoverTwo] = useState(false);

  function handleHoverTwo(e){
    setHoverTwo(!hoverTwo);
  }

  function handleHoverOne(e){
    setHoverOne(!hoverOne);
  }

  return (
    <section className="activity">
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
  );
}

export default Activity;