import React from 'react';
import './glitchTitle.css';

const GlitchTitle = ({entry, glitch}) => {
    
    return (
        <section className={glitch ? "skills-title effect" : "skills-title"}>
            <div className="first">{entry}</div>
            <span>{entry}</span>
            <span>{entry}</span>
            <span>{entry}</span>
            <span>{entry}</span>
        </section>
    );
}

export default GlitchTitle;