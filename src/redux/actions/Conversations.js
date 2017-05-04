import * as types from 'keynos_app/src/redux/types/Conversations'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import { Utils } from 'keynos_app/src/commons/Commons'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

function setFetching(value) {
  return {
    type: types.CONVERSATION_IS_FETCHING,
    value
  }
}

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

    dispatch(setFetching(true))

    const fetchUrl = '/workspaces/' + workspaceId + '/conversations'
    fetch(fetchUrl).then((response) => {

      Constants.LOG_ENABLED && console.log("getConversationsList response: ", response)
      dispatch(setFetching(false))

      if(response.data && response.data.conversations) {
        dispatch(updateConversationsList(response.data.conversations))
      }
    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: multiStrings.errorFetchConversationList, func: 'getConversationsList', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function initConversation(conversation) {
  return (dispatch, getState) => {

    // Update conversation
    dispatch(updateConversationSelected(conversation))

    // Reset conversation params
    dispatch(updateConversationMessagesList([]))
    dispatch(updateConversationQuestion(null))

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
        formatMessages = _.concat(formatMessages, formatNewHistoryMessages)

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

    if(!bubbleId) {
      return
    }

    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/next'
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("fetchNextBubble response: ", response)

      if(response.data && response.data.bot_bubbles && response.data.bot_bubbles.length) {

        // Format answer message
        let formatAnswer = Utils.formatHistoryMessages(response.data.bot_bubbles)

        // Get current messages list
        const state = getState()
        const messagesList = state.conversations.messagesList

        // Add format answer message to current messages list
        let newMessagesList = _.concat(messagesList, formatAnswer)
        dispatch(updateConversationMessagesList(newMessagesList))
      }

      if(response.data && response.data.user_bubbles && response.data.user_bubbles.length) {

        // Set next question
        let formatQuestion = Utils.formatNextmessage(response.data.user_bubbles)
        dispatch(updateConversationQuestion(formatQuestion))
      }

    }).catch((error) => {
      dispatch({label: multiStrings.errorFetchingNextQuestion, func: 'fetchNextBubble', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function onAnswerTapped(type, bubble_id, answer) {
  return (dispatch, getState) => {

    if(type == "options") {
      let node_id = answer
      dispatch(postBubbleResponse(bubble_id, node_id, null, null))
    } else if(type == "text") {
      let text = answer
      dispatch(postBubbleResponse(bubble_id, null, text, null))
    } else if(type == "image") {
      let image = answer
      dispatch(postBubbleResponse(bubble_id, null, null, image))
    }
  }
}

export function postBubbleResponse(bubbleId, nodeId, text, image) {
  return (dispatch, getState) => {

    let data = {}
    if(nodeId) data.node_id = nodeId
    if(text) data.free_text = text
    if(image) data.image = 'data:image/jpeg;base64,' + image

    const fetchUrl = '/conversations/bubbles/' + bubbleId + '/save-answer'
    post(fetchUrl, data, dispatch).then((response) => {
      Constants.LOG_ENABLED && console.log("postBubbleResponse response: ", response)

      if(response.data && response.data.answer) {
        // Delete current question
        dispatch(updateConversationQuestion(null))

        // Format answer message
        let formatAnswer = Utils.formatHistoryMessages(response.data.answer)

        // Get current messages list
        const state = getState()
        const messagesList = state.conversations.messagesList

        // Add format answer message to current messages list
        let newMessagesList = _.concat(messagesList, formatAnswer)
        dispatch(updateConversationMessagesList(newMessagesList))

        // Get next question
        let lastBubble = _.last(response.data.answer)
        dispatch(fetchNextBubble(lastBubble.bubble_id))
      }
    }).catch((error) => {
      dispatch({label: multiStrings.errorPostQuestionResponse, func: 'postBubbleResponse', type: 'SET_ERROR', url: fetchUrl, error})
    })

  }
}
