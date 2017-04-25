// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// NAVIGATION COMPONENTS (ROUTER FLUX)
import {Modal, Actions, Scene, Router, TabBar} from 'react-native-router-flux'

// SCENES
import Login from './sections/register/Login'

let offset = (Platform.OS === 'ios') ? 20 : 0 //56-and, 74-ios
let getNavBarOffset = Navigator.NavigationBar.Styles.General.NavBarHeight + offset

export default class Routes extends Component {

  render() {
    return (
      <Router sceneStyle={Styles.mainScene} >
        <Scene key="root" >
          <Scene key='Login' component={Login} hideNavBar={true} initial={true} />

        </Scene>
      </Router>
    )
  }
}

const Styles = StyleSheet.create({
	mainScene: {
		paddingTop: getNavBarOffset
	}
})
