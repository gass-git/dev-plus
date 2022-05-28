export const initialState = {
  uniqueVisits: '000000',
  userLocation: 'Planet Earth',
  scores: [],
  posts: [],
  lastPost: {},
  reputation: {},
  repos: [{ url: '', created_at: '', about: '', topics: [], name: '' }],
  gitEvents: [],
  lastCommit: {},
  answers: [],
  lastAnswer: '',
  scrollerDelay: 25, // Duration in seconds 
  msgIndex: 0,
  maxIndex: 5,
  selected: 'about',
  scrollerSwitch: 'on'
}

export const ACTIONS = {
  SET_VISITS: 'set unique visits count',
  SET_LOCATION: 'set user location',
  SET_SCORES: 'set skills score',
  SET_POSTS: 'set posts',
  SET_REPUTATION: 'set reputation data',
  SET_REPOS: 'set repositories',
  SET_LATEST_EVENTS_AND_LAST_COMMIT: 'set latest events and last commit',
  SET_LATEST_ANSWERS: 'set latest answers',
  UPDATE_SELECTED: 'update selected',
  SCROLLER_ON: 'turn scroller on',
  SCROLLER_OFF: 'turn scroller off',
  NEXT_MSG: 'switch to the next message'
}

export function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_VISITS:
      return {
        ...state,
        uniqueVisits: action.count
      }

    case ACTIONS.SET_LOCATION:
      return {
        ...state,
        userLocation: action.location
      }

    case ACTIONS.SET_SCORES:
      return {
        ...state,
        scores: action.scores
      }

    case ACTIONS.SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        lastPost: action.lastPost
      }

    case ACTIONS.SET_REPUTATION:
      return {
        ...state,
        reputation: action.reputation
      }

    case ACTIONS.SET_REPOS:
      return {
        ...state,
        repos: action.repos
      }

    case ACTIONS.SET_LATEST_EVENTS_AND_LAST_COMMIT:
      return {
        ...state,
        gitEvents: action.latestFourEvents,
        lastCommit: action.latestCommit
      }

    case ACTIONS.SET_LATEST_ANSWERS:
      return {
        ...state,
        answers: action.latestAnswers,
        lastAnswer: action.lastAnswer
      }

    case ACTIONS.UPDATE_SELECTED:
      return {
        ...state,
        selected: action.optionSelected
      }

    case ACTIONS.SCROLLER_ON:
      return {
        ...state,
        scrollerSwitch: 'on'
      }

    case ACTIONS.SCROLLER_OFF:
      return {
        ...state,
        scrollerSwitch: 'off'
      }

    case ACTIONS.NEXT_MSG:
      let nextIndex = state.msgIndex + 1

      return {
        ...state,
        msgIndex: state.msgIndex < state.maxIndex ? nextIndex : 0
      }

    default:
      return state
  }
}
