import React, {useState, useEffect} from "react";
import "./scrollDisplay.css";
import { Fragment } from "react";

let git_events_api = 'https://api.github.com/users/gass-git/events/public';

const ScrollDisplay = () => {
    var [lastEvent, setLastEvent] = useState({message: null, repository: null});
    var welcomeMsg = "...welcome visitor...";
    var space = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);

    /*async function gitEvent(){
        var response = await fetch(git_events_api),
            arr = await response.json(),
            msg = arr[0].payload.commits[0].message,
            repo = arr[0].repo.name;
        setLastEvent({ message: msg, repository: repo.slice(9) });
    }

    useEffect(() => {
        gitEvent();
    }, []);
*/
    return (
    <section className="scroll-display">
        <div className="border-img">
            <div className="inner-container">
                <div className="msg-display">
                    <div className="text-container">
                        <div className="scroll-text">
                            Last Github commit: DynamicBox component improved (repo: dev-plus-2)....
                            {space}
                            {/*Last Github commit: {lastEvent.message} (repo: {lastEvent.repository})....*/}
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </section>
    );
}

export default ScrollDisplay;