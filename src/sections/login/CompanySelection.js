// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

export default class CompanySelection extends Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>
        <Text>{multiStrings.login}</Text>
        <TouchableOpacity onPress={ () => Actions.Login() } style={{ backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', width: 80, height: 50, marginTop: 50 }} >
          <Text>TabBar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
