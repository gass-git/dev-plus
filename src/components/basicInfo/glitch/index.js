import React from 'react';
import './glitch.css';
import avatar from  "../../../assets/images/avatar6.png"

const Glitch = ({avatarGlitch}) => {

    return (
        <section key="glitch-identifier" className={avatarGlitch ? "avatar-glitch effect" : "avatar-glitch"}>
            <div className="first"><img src={avatar} alt="" /></div>
            <span><img src={avatar} alt="" /></span>
            <span><img src={avatar} alt="" /></span>
            <span><img src={avatar} alt="" /></span>
            <span><img src={avatar} alt="" /></span>
        </section>
    );
}

export default Glitch;