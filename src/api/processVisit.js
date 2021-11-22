import axios from "axios";

function processVisit(){
    axios.post('https://api.gass.dev/save_ip');
}

export default processVisit;