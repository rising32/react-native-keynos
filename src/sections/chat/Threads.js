// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

export default class Threads extends Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>
        <Text>{'Salas'}</Text>
        <TouchableOpacity onPress={ () => Actions.Chat() } style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: 80, height: 50, marginTop: 50 }} >
          <Text>Chat</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
