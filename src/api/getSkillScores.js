import axios from "axios";

let scores_api =  "https://api.stackexchange.com/2.3/users/14895985/top-tags?site=stackoverflow";

function getSkillScores({setScores}){
    axios.get(scores_api)
    .then((resp) =>{
      setScores(resp.data.items)
    });
}

export default getSkillScores;