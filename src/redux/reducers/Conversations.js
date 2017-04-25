import * as types from 'keynos_app/src/redux/types/Conversations'

const initialState = {
  list: [],
  offset: 0,
  total: 0,
};

export default function conversationsReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_CONVERSATIONS_LIST:
      return {
        ...state,
        list: action.list,
        total: action.total,
      };

    case types.UPDATE_CONVERSATIONS_OFFSET:
      return {
        ...state,
        offset: action.value,
      };

    default:
      return state;
  }
}
