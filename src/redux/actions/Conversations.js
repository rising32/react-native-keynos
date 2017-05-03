import * as types from 'keynos_app/src/redux/types/Conversations'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import { Utils } from 'keynos_app/src/commons/Commons'
import { Actions } from 'react-native-router-flux'
import update from 'immutability-helper';

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
    let historyBubblesArray = conversation.conversation_tree && conversation.conversation_tree.history ? conversation.conversation_tree.history : []
    let formatMessages = Utils.formatHistoryMessages(historyBubblesArray)

    // Set next question
    let nextBubblesArray = conversation.conversation_tree.next
    let formatQuestion = Utils.formatNextmessage(nextBubblesArray)

    if(formatQuestion && formatQuestion.type){

      // If question is "bot" type
      if(formatQuestion.type == "bot"){

        // Add current next message to formatMessages list
        let formatNewHistoryMessages = Utils.formatHistoryMessages([formatQuestion.bubble])
        formatMessages = formatMessages.concat(formatNewHistoryMessages)

        // Get next question
        dispatch(fetchNextBubble(formatQuestion.bubble_id))
      }else{

        // Update next question
        dispatch(updateConversationQuestion(formatQuestion))
      }
    }

    // Update messages list
    dispatch(updateConversationMessagesList(formatMessages))
    Actions.Chat()
  }
}

export function fetchNextBubble(bubbleId) {
  return (dispatch, getState) => {
    const state = getState()

    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/next'
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("fetchNextBubble response: ", response)

      if(response.data && response.data.bot_bubbles && response.data.bot_bubbles.length) {
        /*
        let historyBubblesArray = conversation.conversation_tree && conversation.conversation_tree.history ? conversation.conversation_tree.history : []
        let formatMessages = Utils.formatHistoryMessages(historyBubblesArray)
        dispatch(updateConversationMessagesList(formatMessages))
        */
      }

      if(response.data && response.data.user_bubbles && response.data.user_bubbles.length) {
        let formatQuestion = Utils.formatNextmessage(response.data.user_bubbles)
        console.log("fetchNextBubble user_bubbles formatQuestion: ", formatQuestion)
        dispatch(updateConversationQuestion(formatQuestion))
      }

    }).catch((error) => {
      dispatch({label: multiStrings.errorFetchingNextQuestion, func: 'fetchNextBubble', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function postBubbleResponse(bubbleId, nodeId, text) {
  return (dispatch, getState) => {

    let data = {}
    if(nodeId) data.node_id = nodeId
    if(text) data.free_text = text

    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/save-answer'
    post(fetchUrl, data, dispatch).then((response) => {
      Constants.LOG_ENABLED && console.log("postBubbleResponse response: ", response)

      if(response.data && response.data.answer) {
        /*
        let formatAnswer = Utils.formatHistoryMessages(null, response.data.answer)
        console.log("formatAnswer: ", formatAnswer)

        const state = getState()
        let messagesList = update(state.conversations.messagesList, {$push: formatAnswer})
        dispatch(updateConversationsList(messagesList))
        */
      }
    }).catch((error) => {
      dispatch({label: multiStrings.errorPostQuestionResponse, func: 'postBubbleResponse', type: 'SET_ERROR', url: fetchUrl, error})
    })

  }
}

export function onAnswerTapped(type, bubble_id, answer) {
  return (dispatch, getState) => {

    if(type == "options") {
      dispatch(postBubbleResponse(bubble_id, answer, null))
    } else if(type == "text") {
      dispatch(postBubbleResponse(bubble_id, null, answer))
    }


  }
}
