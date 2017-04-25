const initialState = {
  label: null,
  error: null,
  url: null,
  func: null,
};

export default function errorReducer(state = initialState, action = {}) {
  switch (action.type) {

    case 'SET_ERROR':
      return {
        ...state,
        label: action.label,
        error: action.error,
        url: action.url,
        func: action.func,
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        label: null,
        error: null,
        url: null,
        func: null,
      };

    default:
      return state;
  }
}
