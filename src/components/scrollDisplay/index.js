import React, {useState, useEffect} from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

const ScrollDisplay = ({lastCommit, answers, posts}) => {
    var welcomeMsg = "...welcome visitor...";
    var space = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);
    
    

    return (
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    <div className="text-container">
                        <div className="scroll-text">
                            {space}
                            Last Github commit: {lastCommit.message} (repo: {lastCommit.repo})....
                            Last blog post: ....
                           
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </section>
    );
}

export default ScrollDisplay;