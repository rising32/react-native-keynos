import * as types from 'keynos_app/src/redux/types/Conversations'

const initialState = {
  conversationsList: [],
  selected: null,
  messagesList: [],
  question: null,
  typingText: false,
  isFetching: false,
};

export default function conversationsReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_CONVERSATIONS_LIST:
      return {
        ...state,
        conversationsList: action.value
      };

    case types.UPDATE_CONVERSATIONS_MESSAGES_LIST:
      return {
        ...state,
        messagesList: action.value
      };

    case types.UPDATE_CONVERSATION_SELECTED:
      return {
        ...state,
        selected: action.value,
      };

    case types.UPDATE_CONVERSATION_QUESTION:
      return {
        ...state,
        question: action.value,
      };

    case types.CONVERSATION_IS_FETCHING:
      return {
        ...state,
        isFetching: action.value,
      };

    case types.CONVERSATION_SET_TYPING_TEXT:
      return {
        ...state,
        typingText: action.value,
      };

    case types.LOG_OUT:
      return initialState;

    default:
      return state;
  }
}
