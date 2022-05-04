import axios from "axios"
import { ACTIONS } from '../stateCapsule'

let repos_api = "https://api.github.com/users/gass-git/repos";
let events_api = "https://api.github.com/users/gass-git/events/public";
const {
  SET_LATEST_EVENTS_AND_LAST_COMMIT,
  SET_REPOS
} = ACTIONS;


function getGitEvents({ dispatch }) {
  axios.get(events_api)
    .then((resp) => {
      let filteredArray = []

      resp.data.forEach((gitEvent) => {
        if ("commits" in gitEvent.payload) {
          filteredArray.push(gitEvent)
        }
      })

      let latestFour = filteredArray.slice(0, 4)

      //setGitEvents(latestFour)

      // Variables for scroll display component
      let repo = latestFour[0].repo.name.slice(9)
      let createdAt = latestFour[0].created_at
      let commitData = {
        'message': latestFour[0].payload.commits[0].message,
        'repo': repo,
        'date': createdAt.slice(0, 10),
        'time': createdAt.slice(11, 19)
      }

      dispatch({
        type: SET_LATEST_EVENTS_AND_LAST_COMMIT,
        latestFourEvents: latestFour,
        latestCommit: commitData
      })
    })
}
function getRepos({ dispatch }) {
  axios.get(repos_api).then((resp) => {
      let newArray = []

      resp.data.forEach((repo) => {
        if(repo.description !== null && repo.homepage !== '' && !repo.fork){
          newArray.push({
            'name': repo.name,
            'about': repo.description,
            'url': repo.homepage,
            'topics': repo.topics,
            'created_at': repo.created_at
          })
        }
      })

      // Sort repos from old to new
      newArray = newArray.sort((a, b) => {
        return (new Date(a.created_at) - new Date(b.created_at))
      })

      dispatch({ type: SET_REPOS, repos: newArray })
    })
}

export { getGitEvents, getRepos }
