import axios from "axios";

let repos_api = "https://api.github.com/users/gass-git/repos";
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
function getRepos({setRepos}) {
    axios.get(repos_api)
    .then((resp)=> {
      let newArray = [];

      resp.data.forEach((repo)=>{
        newArray.push({
          'name': repo.name,
          'about': repo.description,
          'url' : repo.homepage,
          'topics' : repo.topics,
          'created_at' : repo.created_at
        });

      });
      
      // Remove repos that have the ABOUT SECTION empty
      let filteredArray = newArray.filter((repo) => {
         return repo.about !== null ? true : false; 
      });

      // Sort repos from old to new
      let sortedArray = filteredArray.sort((a,b) =>  {
        return (new Date(a.created_at) - new Date(b.created_at));
      });

      setRepos(sortedArray);
    });
}

export {getGitEvents, getRepos};
