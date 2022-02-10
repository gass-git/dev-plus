import axios from "axios";

function getUniqueVisits({ dispatch }) {
  axios.get('https://api.gass.dev/unique_visitors')
    .then((resp) => {
      dispatch({
        type: 'set unique visits count',
        count: '000' + resp.data.count
      })
    })
}
function getUserLocation({ dispatch }) {
  axios.get("https://geolocation-db.com/json/")
    .then((resp) => {
      dispatch({
        type: 'set user location',
        location: resp.data.country_name
      })
    })
}
function processVisit() {
  axios.post('https://api.gass.dev/save_ip')
}

export { getUniqueVisits, getUserLocation, processVisit };