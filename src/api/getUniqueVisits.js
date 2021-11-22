import axios from "axios";


function getUniqueVisits({setUniqueVisits}){

    axios.get('https://api.gass.dev/unique_visitors')
    .then((response) => {
        let visits_count = response.data.count;
        setUniqueVisits(visits_count);
    });
}

export default getUniqueVisits;