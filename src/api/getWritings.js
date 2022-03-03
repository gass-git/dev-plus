import axios from 'axios'
import { ACTIONS } from '../stateCapsule'

let posts_api = 'https://blog.gass.dev/api/posts'

const { SET_POSTS } = ACTIONS;

function getWritings({ dispatch }) {
  let newArray = []

  axios.get(posts_api)
    .then((resp) => {
      resp.data.forEach((post) => {
        newArray.push({
          'id': post.id,
          'title': post.title,
          'created_at': post.created_at,
          'views': post.views
        })
      })

      let sortedArr = newArray.sort((a, b) => { return b.id - a.id })

      dispatch({
        type: SET_POSTS,
        posts: sortedArr,
        lastPost: sortedArr[0]
      })
    })
}

export default getWritings