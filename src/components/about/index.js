import React, {Fragment, useState} from "react";
import './about.css';
import GlitchTitle from './glitchTitle/index';

const About = ({arrowEffect}) => {
  var [arrow1, setArrow1] = useState("http://localhost:3000/images/down-arrow.png");
  var arrow2 = "http://localhost:3000/images/down-arrow-yellow-border.png";
  var [current, setCurrent] = useState(0);
  var text = [
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
      at the same time make cool things and hopefully <span className="highlight">add value to peoples lifes</span>. 
    </Fragment>,
    <Fragment>
      This is mainly where I want to be, in the <span className="highlight">world of ideas</span>
      , logic and <span className="highlight">mental labyrinth</span>.  The hunger for challenge is never satisfied, so I'm always
        pushing myself to go beyond, for the pure joy of it.
    </Fragment>
  ];

  function handleMouseOver(){
    setArrow1(arrow2);
  }

  function handleMouseLeave(){
    setArrow1("http://localhost:3000/images/down-arrow.png");
  }

  const ArrowDown = () => {
    return [
      <div className="down-arrow-box">
        <i class="fas fa-caret-down"></i>
      </div>
    ];
  }

    return(
      <section className="about">
        <div className="content">
          {text[current]}
        </div>
         { current < 2 ?  <ArrowDown /> : null }
      </section>
    );
  }

  export default About;