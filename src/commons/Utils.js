import React, { Alert, Linking, Dimensions } from 'react-native'
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

// Format history message
export function formatHistoryMessages(bubblesArray) {
  let messages = []

  if(bubblesArray && bubblesArray.length){
    _.map(bubblesArray, (bubble) => {
      let isBot = bubble.bubble_type == "bot" ? true : false
      let createdAt = bubble.read_on ? moment(bubble.read_on).format('YYYY-MM-DD HH:mm:ss') : moment()
      createdAt = bubble.read_on ? moment.utc(createdAt, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss') : createdAt

      let user = {
        _id: isBot ? 2 : 1,
        name: bubble.interlocutor,
        avatar: null
      }

      if(bubble.nodes && bubble.nodes.length) {
        let node = bubble.nodes[0]
        if(node.nodeable_type == "App\\NodeText") {
          messages.push({_id: uuidV4(), user: user, text: node.text, createdAt})
        } else if(node.nodeable_type == "App\\NodeImage") {
          messages.push({_id: uuidV4(), user: user, image: node.image_path, createdAt})
        }
      }
    })
  }
  return messages
}

// Format next question
export function formatNextmessage(bubblesArray) {

  if(bubblesArray && bubblesArray.length) {
    let bubble = bubblesArray[0]

    if(bubble.bubble_type == "bot") {
      return {type: "bot", bubble_id: bubble.bubble_id, bubble}
    }

    if(bubblesArray.length == 1) {
      // Type text/image
      if(bubble.nodes && bubble.nodes.length && bubble.nodes[0].nodeable_type == "App\\NodeCamera"){
        return { type: "image", bubble_id: bubble.bubble_id, node_id: bubble.nodes[0].node_id }
      } else if(bubble.nodes && bubble.nodes.length && bubble.nodes[0].nodeable_type == "App\\NodeFreeText") {
        return { type: "text", bubble_id: bubble.bubble_id, node_id: bubble.nodes[0].node_id }
      } else {
        return null
      }
    } else {
      // Type options
      let options = []
      _.map(bubblesArray, (bubble) => {
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


// Responsive
const IPHONE6_WIDTH = 375;
const IPHONE6_HEIGHT = 667;

export function widthScale() {
  let dimension = Dimensions.get('window').width / IPHONE6_WIDTH
  return dimension > 1 ? 1 : dimension
}

export function heightScale() {
  let dimension = Dimensions.get('window').height / IPHONE6_HEIGHT
  return dimension > 1 ? 1 : dimension
}

// HEX to RGBA
export function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}
