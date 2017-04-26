import React, { Alert, Linking } from 'react-native'
import moment from 'moment';
import _ from 'lodash'

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
  if(value && value.length > 2){
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

export function formatConversationMessages(conversation) {
  let messages = []
  console.log("formatConversationMessages conversation: ", conversation)

  if(conversation.conversation_tree && conversation.conversation_tree.history){
    _.map(conversation.conversation_tree.history, (item) => {
      let user = {
        name: item.interlocutor,
        _id: item.bubble_type == "bot" ? 2 : 1
      }

      _.map(item.nodes, (node) => {
        if(node.nodeable_type == "App\\NodeText" || node.nodeable_type == "App\\NodeFreeText") {
          messages.push({_id: item.bubble_id + node.node_id, user: user, text: node.text})
        } else if(node.nodeable_type == "App\\NodeImage") {
          messages.push({_id: item.bubble_id + node.node_id, user: user, image: node.image_path})
        }
      })
    })
  }

  if(conversation.conversation_tree && conversation.conversation_tree.next){
    let item = conversation.conversation_tree.next
    let user = {
      name: item.interlocutor,
      _id: item.bubble_type == "bot" ? 2 : 1
    }

    _.map(item.nodes, (node) => {
      if(node.nodeable_type == "App\\NodeText" || node.nodeable_type == "App\\NodeFreeText") {
        messages.push({_id: item.bubble_id + node.node_id, user: user, text: node.text})
      } else if(node.nodeable_type == "App\\NodeImage") {
        messages.push({_id: item.bubble_id + node.node_id, user: user, image: node.image_path})
      }
    })
  }

  console.log("formatConversationMessages messages: ", messages)
  return messages
}

/*
{
  _id: 1,
  text: 'Hello developer',
  createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  },
},
*/
