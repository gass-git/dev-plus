import { Fragment } from "react";
import "./scrollDisplay.css";

const ScrollDisplay = ({
    scrollerSwitch, 
    lastCommit, 
    lastAnswer, 
    lastPost, 
    msgIndex, 
    uniqueVisits,
    userLocation
}) => {
    let messages = [
        <Fragment> 
            Welcome visitor #{uniqueVisits} from {userLocation}! I'm glad to see you here! Feel free to take a look arround...
        </Fragment>,
       <Fragment> 
            Last Github commit - {lastCommit.message} (repo: {lastCommit.repo}) 
            &nbsp; {lastCommit.date} {lastCommit.time}
        </Fragment>,
        <Fragment>
            Last blog post - {lastPost.title}
        </Fragment>,
        <Fragment>
            Last on Stack Overflow - {lastAnswer} 
        </Fragment>
    ];

    return [
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    {scrollerSwitch === 'on' ?    
                        <div className="scroll-text">
                            {messages[msgIndex]}
                        </div>
                        : 
                        null
                    }
                </div>
            </div>
        </div>
    </section>
    ];
}

export default ScrollDisplay;