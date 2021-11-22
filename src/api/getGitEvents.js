import axios from "axios";

let events_api = "https://api.github.com/users/gass-git/events/public";

function getGitEvents({setGitEvents, setLastCommit}) {
    axios.get(events_api)
    .then((resp) => {
      var filteredArray = [];

      resp.data.forEach((gitEvent)=>{
        if(gitEvent.payload.action !== 'started'){
          filteredArray.push(gitEvent);
        }
      });
      let latestFour = filteredArray.slice(0,4);
      setGitEvents(latestFour);
    
      // Variables for scroll display component
      var repo = latestFour[0].repo.name.slice(9),
      createdAt = latestFour[0].created_at;

      setLastCommit({
        'message' : latestFour[0].payload.commits[0].message,
        'repo' : repo,
        'date' : createdAt.slice(0,10),
        'time' : createdAt.slice(11, 19)
      });
    });
  }

  export default getGitEvents;