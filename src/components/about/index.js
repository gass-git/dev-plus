import React, {Fragment, useEffect, useState} from "react";
import './about.css';
import useSound from "use-sound";
import tickSound from '../../assets/sounds/tick-sound.wav';

const About = () => {
  var [current, setCurrent] = useState(0);
  const [playSound] = useSound(tickSound, {volume: 0.6});
  var textArray = [
    <Fragment>
      For me coding is a <span className="highlight">catalyst for creation</span>, to portray 
      an idea into reality and be able to interact with it anywhere on 
      the world I find it to be fascinating, it is the <span className="highlight">reason</span> I got hooked at age 14.
      This <span className="highlight">feeling</span> is 
      something I always try to tap into when I'm developing projects...
    </Fragment>,
    <Fragment>
      My main interest is to <span className="highlight"> enjoy the process and 
      challenges</span> that appear on the coding coast but
      at the same time make cool things and hopefully <span className="highlight">add value to peoples lifes</span>...
    </Fragment>,
    <Fragment>
      This is mainly where I want to be, in the <span className="highlight">world of ideas</span>
      , logic and <span className="highlight">mental labyrinth</span>.  The hunger for challenge is never satisfied, so I'm always
        pushing myself to go beyond, for the pure joy of it.
    </Fragment>
  ];

  function handleCurrent(){
    if(current === textArray.length - 1){
      setCurrent(0);
    }else{
      setCurrent(current + 1);
    }
    // Sound effect
    playSound();
  }
  function handleArrowClass(){
    if(current === textArray.length - 1){
      return "fas fa-angle-double-up";
    }
    else{
      return "fas fa-caret-down"; 
    }
  }

  return(
    <section className="about">
      <div className="content">
        {textArray[current]}
      </div>
      <div className="arrow-box">
        <i 
          className={handleArrowClass()}
          onClick={() => handleCurrent()} 
        />
      </div>
    </section>
  );
  }

  export default About;