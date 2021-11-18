import React from 'react';
import './glitch.css';

const Glitch = ({avatarGlitch}) => {
   
    return (
        <section className={avatarGlitch ? "avatar-glitch effect" : "avatar-glitch"}>
            <div className="first"><img src="http://localhost:3000/images/avatar6.png" alt="" /></div>
            <span><img src="http://localhost:3000/images/avatar6.png" alt="" /></span>
            <span><img src="http://localhost:3000/images/avatar6.png" alt="" /></span>
            <span><img src="http://localhost:3000/images/avatar6.png" alt="" /></span>
            <span><img src="http://localhost:3000/images/avatar6.png" alt="" /></span>
        </section>
    );
}

export default Glitch;