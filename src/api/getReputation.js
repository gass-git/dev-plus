import axios from "axios";

let SO_user_info_api = "https://api.stackexchange.com/2.3/users/14895985?order=desc&sort=reputation&site=stackoverflow&key=op*AZFz8o6Pqr3596Yc)Lw((";

function getReputation({setReputation}){
    axios.get(SO_user_info_api)
    .then((resp) => {
      var reputation = resp.data.items[0].reputation,
        reputationChange = resp.data.items[0].reputation_change_month,
        newElement = {
          'total': reputation, 
          'monthChange': reputationChange 
        }
      setReputation(newElement);
    });
}

export default getReputation;