import React, {useState, useEffect} from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

const ScrollDisplay = ({lastCommit, answers, lastPost, msgIndex}) => {
    var space4 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>;
    var space8 = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>;
    var messages = [
        <Fragment> 
            Last Github commit - {lastCommit.message} (repo: {lastCommit.repo}) 
            &nbsp; {lastCommit.date} {lastCommit.time} .....
        </Fragment>,
        <Fragment>
            Last blog post - {lastPost.title}
        </Fragment>,
        <Fragment>
            This is message three
        </Fragment>
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