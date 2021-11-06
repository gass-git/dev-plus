import React, {useState, useEffect} from "react";
import "./styles.css";
import { Fragment } from "react";

let git_events_api = 'https://api.github.com/users/gass-git/events/public';

const ScrollDisplay = () => {
    var [lastEvent, setLastEvent] = useState({message: null, repository: null});
    var welcomeMsg = "...welcome visitor...";
    var space = (<Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>);

    async function gitEvent(){
        var response = await fetch(git_events_api),
            arr = await response.json(),
            msg = arr[0].payload.commits[0].message,
            repo = arr[0].repo.name;
        setLastEvent({ message: msg, repository: repo.slice(9) });
    }

    useEffect(() => {
        gitEvent();
    }, []);

    return (
        <div className="msg-display">
            <div className="scroll-text">
                {welcomeMsg} 
                {space}
                Last Github commit: {lastEvent.message} (repo: {lastEvent.repository})....
            </div>
        </div>      
    );
}

export default ScrollDisplay;