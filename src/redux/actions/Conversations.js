import * as types from 'keynos_app/src/redux/types/Conversations'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import { Utils } from 'keynos_app/src/commons/Commons'
import { Actions } from 'react-native-router-flux'

function updateConversationsList(value) {
  return {
    type: types.UPDATE_CONVERSATIONS_LIST,
    value
  }
}

export function updateConversationSelected(value) {
  return {
    type: types.UPDATE_CONVERSATION_SELECTED,
    value
  }
}

export function updateConversationMessagesList(value) {
  return {
    type: types.UPDATE_CONVERSATIONS_MESSAGES_LIST,
    value
  }
}

export function updateConversationQuestion(value) {
  return {
    type: types.UPDATE_CONVERSATION_QUESTION,
    value
  }
}

export function getConversationsList() {
  return (dispatch, getState) => {
    const state = getState()
    const workspaceId = state.company.id

    if(!workspaceId){
      return
    }

    const fetchUrl = '/workspaces/' + workspaceId + '/conversations'
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("getConversationsList response: ", response)
      if(response.data && response.data.conversations)
        dispatch(updateConversationsList(response.data.conversations))
    }).catch((error) => {
      dispatch({label: multiStrings.errorFetchConversationList, func: 'getConversationsList', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function initConversation(conversation) {
  return (dispatch, getState) => {
    // Update conversation
    dispatch(updateConversationSelected(conversation))

    // Get history messages list
    let formatMessages = Utils.formatHistoryMessages(conversation)
    dispatch(updateConversationMessagesList(formatMessages))

    // Set next question
    let formatQuestion = Utils.formatNextmessage(conversation)
    console.log("formatQuestion: ", formatQuestion)

    if(formatQuestion && formatQuestion.type){
      if(formatQuestion.type == "bot"){
        dispatch(fetchNextBubble(formatQuestion.bubble_id))
      }else{
        dispatch(updateConversationQuestion(formatQuestion))
      }
    }

    Actions.Chat()

    //dispatch(fetchNextBubble(1))
  }
}

export function fetchNextBubble(bubbleId) {
  return (dispatch, getState) => {
    const state = getState()

    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/next'
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("postConversationsResponse response: ", response)
      /*
      if(response.data && response.data.conversations)
        dispatch(updateConversationsList(response.data.conversations))
      */

    }).catch((error) => {
      dispatch({label: multiStrings.errorFetchingNextQuestion, func: 'postConversationsResponse', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function postBubbleResponse(bubbleId, nodeId) {
  return (dispatch, getState) => {
    const state = getState()

    let data = {node_id: nodeId}
    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/save-answer'
    post(fetchUrl, data, dispatch).then((response) => {
      Constants.LOG_ENABLED && console.log("postConversationsResponse response: ", response)
      /*
      if(response.data && response.data.conversations)
        dispatch(updateConversationsList(response.data.conversations))
      */
    }).catch((error) => {
      dispatch({label: multiStrings.errorPostQuestionResponse, func: 'postConversationsResponse', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}
