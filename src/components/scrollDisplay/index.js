import React, {useState, useEffect} from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

let git_events_api = 'https://api.github.com/users/gass-git/events/public';

const ScrollDisplay = () => {
    var welcomeMsg = "...welcome visitor...";
    var space = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);
       
    // Will need to do API fetching inside this component

    return (
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    <div className="text-container">
                        <div className="scroll-text">
                            {space}
                            Last Github commit:  (repo: )....
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