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

function updateConversationsChatFinished(value) {
  return {
    type: types.CONVERSATION_CHAT_FINISHED,
    value
  }
}

function setTypingText(value) {
  return {
    type: types.CONVERSATION_SET_TYPING_TEXT,
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

export function getConversation(id) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch(setFetching(true))

    const fetchUrl = '/conversations/' + id
    fetch(fetchUrl).then((response) => {

      Constants.LOG_ENABLED && console.log("getConversation response: ", response)
      dispatch(setFetching(false))

      if(response.data && response.data.conversation) {
        Actions.TabBar({type: 'reset'})
        dispatch(initConversation(response.data.conversation))
      }
    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: multiStrings.errorFetchConversation, func: 'getConversation', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function initConversation(conversation) {
  return (dispatch, getState) => {

    // Update conversation
    dispatch(updateConversationSelected(conversation))

    // Reset conversation params
    dispatch(updateConversationsChatFinished(false))
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

      // Prepare bot bubbles
      if(response.data && response.data.bot_bubbles && response.data.bot_bubbles.length) {

        // Start isTyping
        dispatch(setTypingText(true))

        // Format answer message
        let formatAnswer = Utils.formatHistoryMessages(response.data.bot_bubbles)

        // Get current messages list
        const state = getState()
        const messagesList = state.conversations.messagesList
        let timeout = 0

        _.reduce(formatAnswer, (accumulator, nextMessage) => {

          // Calculate new timeout with last message length
          let extraTimeout = 0
          let lastMsg = _.last(accumulator)
          if(lastMsg && lastMsg.image) {
            extraTimeout = Constants.IMAGE_TYPING_TIMER
          } else if(lastMsg && lastMsg.text) {
            extraTimeout = lastMsg.text.length * Constants.CHARACTER_TYPING_TIMER
          }
          timeout = (extraTimeout < Constants.DEFAULT_TYPING_TIMER) ? timeout + Constants.DEFAULT_TYPING_TIMER : timeout + extraTimeout

          // Add new message and acumulator to messageList
          let finalList = _.concat(messagesList, accumulator, nextMessage)

          setTimeout(() => {
            // Update message list
            dispatch(updateConversationMessagesList(finalList))

            if(accumulator.length == formatAnswer.length - 1){
              // Stop isTyping
              dispatch(setTypingText(false))

              // After bot bubbles prepare next question
              dispatch(fetchNextQuestion(response))
            }
          }, timeout)

          // Return collection with new Message
          return _.concat(accumulator, nextMessage)

        }, [])

      } else {
        // If no bot bubbles prepare next question
        dispatch(fetchNextQuestion(response))
      }

    }).catch((error) => {
      dispatch({label: multiStrings.errorFetchingNextQuestion, func: 'fetchNextBubble', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

function fetchNextQuestion(response) {
  return (dispatch, getState) => {
    // Prepare next question
    if(response.data && response.data.user_bubbles && response.data.user_bubbles.length) {
      // Set next question
      let formatQuestion = Utils.formatNextmessage(response.data.user_bubbles)
      dispatch(updateConversationQuestion(formatQuestion))
    }else{
      // Delete current question
      dispatch(updateConversationQuestion(null))

      // Set chat finished
      dispatch(updateConversationsChatFinished(true))
    }
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
