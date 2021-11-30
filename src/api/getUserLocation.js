import axios from 'axios';

function getUserLocation({setUserLocation}){
  axios.get("https://geolocation-db.com/json/")
    .then((resp) => {
      setUserLocation(resp.data.country_name);
    }
    );
}

export default getUserLocation;