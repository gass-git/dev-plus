import React from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

const ScrollDisplay = ({lastCommit, lastAnswer, lastPost, msgIndex, uniqueVisits}) => {
    var messages = [
       <Fragment> 
            Last Github commit - {lastCommit.message} (repo: {lastCommit.repo}) 
            &nbsp; {lastCommit.date} {lastCommit.time}
        </Fragment>,
        <Fragment>
            Last blog post - {lastPost.title}
        </Fragment>,
        <Fragment>
            Last on Stack Overflow - {lastAnswer} 
        </Fragment>,
        <Fragment>
        Unique visitors to date - {uniqueVisits} and counting..
    </Fragment>,
    ];

    return (
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    <div className="text-container">
                        <div className="scroll-text">
                           {messages[msgIndex]}
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </section>
    );
}

export default ScrollDisplay;