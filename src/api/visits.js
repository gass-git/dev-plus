import axios from "axios";

function getUniqueVisits({setUniqueVisits}){
    axios.get('https://api.gass.dev/unique_visitors')
    .then((response) => {
        let visits_count = response.data.count;
        setUniqueVisits('000' + visits_count);
    });
}
function getUserLocation({setUserLocation}){
  axios.get("https://geolocation-db.com/json/")
    .then((resp) => {
      setUserLocation(resp.data.country_name);
    }
    );
}
function processVisit(){
  axios.post('https://api.gass.dev/save_ip');
}

export {getUniqueVisits, getUserLocation, processVisit};