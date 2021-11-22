import axios from "axios";

let repos_api = "https://api.github.com/users/gass-git/repos";

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

export default getRepos;