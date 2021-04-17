export const initialState = {
  user: null,
  search: null,
  ipLocation: null,
  settings: {
    metric: localStorage.getItem('unit') === 'imperial' ? false : true,
    owmIcons: localStorage.getItem('owmIcons') === 'off' ? false : true,
    defaultWeather: localStorage.getItem('defaultWeather') === 'off' ? false : true
  }
}

export const reducer = (state, action) => {

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.search
      };
    case 'SET_IP_LOCATION':
      return {
        ...state,
        ipLocation: action.ipLocation
      };
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.settings
      };
    default:
      return state;
  }
  
}