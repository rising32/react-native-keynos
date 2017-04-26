import * as types from 'keynos_app/src/redux/types/Conversations'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'


function updateConversationsList(value) {
  return {
    type: types.UPDATE_CONVERSATIONS_LIST,
    value
  }
}

export function updateConversationSelected(conversation) {
  return {
    type: types.UPDATE_CONVERSATION_SELECTED,
    conversation
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
      dispatch({label: 'error', func: 'getConversationsList', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}
