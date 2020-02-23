//import posts from './posts.json';
const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
