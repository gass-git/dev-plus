import axios from "axios"
import { ACTIONS } from '../stateCapsule'

const { SET_VISITS, SET_LOCATION } = ACTIONS;

function getUniqueVisits({ dispatch }) {
  axios.get('https://api.gass.dev/unique_visitors')
    .then((resp) => {
      dispatch({ type: SET_VISITS, count: '000' + resp.data.count })
    })
}
function getUserLocation({ dispatch }) {
  axios.get("https://geolocation-db.com/json/")
    .then((resp) => {
      dispatch({
        type: SET_LOCATION,
        location: resp.data.country_name
      })
    })
}
function processVisit() {
  axios.post('https://api.gass.dev/save_ip')
}

export { getUniqueVisits, getUserLocation, processVisit };