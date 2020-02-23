const initialState = {
  producer: 'DELFI'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_SOURCE':
      return {
        ...state,
        source: action.payload
      };
    default:
      return state;
  }
}
