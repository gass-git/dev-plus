import axios from 'axios'
import { ACTIONS } from '../stateCapsule'

let answers_api = "https://api.stackexchange.com/2.3/users/14895985/answers?order=desc&sort=activity&site=stackoverflow&key=op*AZFz8o6Pqr3596Yc)Lw(("
let SO_user_info_api = "https://api.stackexchange.com/2.3/users/14895985?order=desc&sort=reputation&site=stackoverflow&key=op*AZFz8o6Pqr3596Yc)Lw(("
let scores_api = "https://api.stackexchange.com/2.3/users/14895985/top-tags?site=stackoverflow&key=op*AZFz8o6Pqr3596Yc)Lw(("
const {
  SET_LATEST_ANSWERS,
  SET_REPUTATION,
  SET_SCORES
} = ACTIONS;

function getAnswers({ dispatch }) {
  let mergedArrays = []

  axios.get(answers_api).then((resp) => {

    // Last 4 answers data
    let answersArray = resp.data.items.slice(0, 4)

    // Get questions titles associated to the answers
    answersArray.forEach((answer, index) => {
      let id = answer.question_id
      let questions_api = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow&key=op*AZFz8o6Pqr3596Yc)Lw((`

      axios.get(questions_api).then((resp) => {
        let questionTitle = resp.data.items[0].title

        mergedArrays.push({
          ...answersArray[index],
          ...{ 'title': questionTitle }
        })

        dispatch({
          type: SET_LATEST_ANSWERS,
          latestAnswers: mergedArrays,
          lastAnswer: mergedArrays[0].title
        })
      })
    })

  })
}
function getReputation({ dispatch }) {
  axios.get(SO_user_info_api)
    .then((resp) => {
      let reputation = resp.data.items[0].reputation
      let reputationChange = resp.data.items[0].reputation_change_month
      let data = {
        'total': reputation,
        'monthChange': reputationChange
      }

      dispatch({ type: SET_REPUTATION, reputation: data })
    })
}
function getSkillScores({ dispatch }) {
  axios.get(scores_api)
    .then((resp) => {
      dispatch({ type: SET_SCORES, scores: resp.data.items })
    })
}

export { getAnswers, getReputation, getSkillScores }