import React, { Alert, Linking } from 'react-native'
import moment from 'moment';

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

export function stringValidate(value){
  var re = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z21210-9]+[a-zA-Z\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA\xF1\xD1\s]{1,}$/;
  return re.test(value)
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
