// Reducer is in charge of the preload states
function reducer(state, action){
  switch(action){
    case 'turn off loading':  return {...state, isLoading: false};
    case 'show svg background': return {...state, showBackground: true};
    case 'activate menu': return {...state, isMenuActive: true};
    default: return state;
  }
};
const initState = {
  isLoading: true,
  isMenuActive: true,
  showBackground: false
};

export {reducer, initState};