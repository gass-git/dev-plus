// Reducer is in charge of the preload states
function reducer(state, action){
  switch(action){
    case 'turn off loading':  return {...state, isLoading: false};
    case 'show gif': return {...state, showGif: true};
    case 'remove gif':return {...state, showGif: false};
    case 'show msg one':return {
                          ...state,
                          message: 'Casting spells to collect data',
                          msgNumber: 'one'
                        };
    case 'show msg two':return {
                          ...state,
                          message: 'Fetch completed',
                          msgNumber: 'two'
                        };
    case 'remove message':return {
                          ...state,
                          message: null,
                          msgNumber: null
                          };
    case 'show component one': return {...state, showCompOne: true};
    case 'show component two': return {...state, showCompTwo: true};
    case 'show component three': return {...state, showCompThree: true};
    case 'show component four': return {...state,showCompFour: true};
    case 'activate menu': return {...state, isMenuActive: true};
    default: return state;
  }
};
const initState = {
  isLoading: true,
  isMenuActive: false,
  showGif: false,
  message: null,
  msgNumber: null,
  showCompOne: false,
  showCompTwo: false,
  showCompThree: false,
  showCompFour: false
};

export {reducer, initState};