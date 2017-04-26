import * as types from 'keynos_app/src/redux/types/Conversations'

const initialState = {
  list: [],
  selected: null,
};

export default function conversationsReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_CONVERSATIONS_LIST:
      return {
        ...state,
        list: action.value
      };

    case types.UPDATE_CONVERSATION_SELECTED:
      return {
        ...state,
        selected: action.conversation,
      };

    case types.LOG_OUT:
      return initialState;

    default:
      return state;
  }
}
