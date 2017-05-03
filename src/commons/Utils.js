import React, { Alert, Linking } from 'react-native'
import moment from 'moment'
import _ from 'lodash'
import uuidV4 from 'uuid/v4'

export function firstToUpperCase( str ) {
   return str.substr(0, 1).toUpperCase() + str.substr(1);
}

export function sortTime(list) {
  return list.sort(function(a,b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
  });
}

export function mailValidate(mail){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail);
}

export function companyValidate(value) {
  if(value && value.length > 1){
    return true
  }else{
    return false
  }
}

export function passwordValidate(password){
  return password.length>7
}

export function repeatPasswordValidate(repeat, password){
  if(password==repeat)
    return true
  else
    return false
}

export function fix2decimal (data) {
  return parseFloat(data).toFixed(2)
}

export function openUrl(url){
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Don\'t know how to open URI: ' + url);
    }
  });
}

export function formatHistoryMessages(conversation) {
  let messages = []

  if(conversation && conversation.conversation_tree && conversation.conversation_tree.history){
    _.map(conversation.conversation_tree.history, (bubble) => {
      let isBot = bubble.bubble_type == "bot" ? true : false
      let user = {
        _id: isBot ? 2 : 1,
        name: bubble.interlocutor,
        avatar: isBot && conversation.bot_image ? conversation.bot_image : null
      }

      if(bubble.nodes && bubble.nodes.length) {
        let node = bubble.nodes[0]
        if(node.nodeable_type == "App\\NodeText") {
          messages.push({_id: uuidV4(), user: user, text: node.text})
        } else if(node.nodeable_type == "App\\NodeImage") {
          messages.push({_id: uuidV4(), user: user, image: node.image_path})
        }
      }
    })
  }

  return messages
}

export function formatNextmessage(conversation) {
  if(conversation.conversation_tree && conversation.conversation_tree.next && conversation.conversation_tree.next.length) {

    let bubblesList = conversation.conversation_tree.next
    let bubble = bubblesList[0]

    if(bubble.bubble_type == "bot") {
      return {type: "bot", bubble_id: bubble.bubble_id}
    }

    if(bubblesList.length == 1) {
      // Type text/image
      if(bubble.nodes && bubble.nodes.length && bubble.nodes[0].nodeable_type == "App\\NodeImage"){
        return { type: "image", bubble_id: bubble.bubble_id, node_id: bubble.nodes[0].node_id }
      } else if(bubble.nodes && bubble.nodes.length && bubble.nodes[0].nodeable_type == "App\\NodeFreeText") {
        return { type: "text", bubble_id: bubble.bubble_id, node_id: bubble.nodes[0].node_id }
      } else {
        return null
      }
    } else {
      // Type options
      let options = []
      _.map(conversation.conversation_tree.next, (bubble) => {
        if(bubble.nodes && bubble.nodes.length) {
          let node = bubble.nodes[0]
          if(node.nodeable_type == "App\\NodeText") {
            options.push({bubble_id: bubble.bubble_id, node_id: node.node_id, text: node.text})
          }
        }
      })

      return { type: "options", options: options}
    }
  } else {
    return null
  }
}
