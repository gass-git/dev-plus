import React from 'react';
import './glitchTitle.css';

const GlitchTitle = ({entry, glitch}) => {
    
    return (
        <section className={glitch ? "about-title effect" : "about-title"}>
            <div className="first">{entry}</div>
            <span>{entry}</span>
            <span>{entry}</span>
            <span>{entry}</span>
            <span>{entry}</span>
        </section>
    );
}

export default GlitchTitle;