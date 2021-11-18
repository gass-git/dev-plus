import React, {useState, useEffect} from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

const ScrollDisplay = ({lastCommit, answers, lastPost}) => {
    var space = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);
    
    return (
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    <div className="text-container">
                        <div className="scroll-text">
                            {space}
                            {/* GITHUB LAST COMMIT */}
                            Last Github commit: {lastCommit.message} (repo: {lastCommit.repo}) 
                            &nbsp; {lastCommit.date} {lastCommit.time} .....

                            {/* LAST BLOG POST */}
                            {space} {space} Last blog post: {lastPost.title}

                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </section>
    );
}

export default ScrollDisplay;