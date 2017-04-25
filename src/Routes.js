// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// COMPONENTS
import TabIcon from './components/TabIcon';

// NAVIGATION COMPONENTS (ROUTER FLUX)
import {Modal, Actions, Scene, Router, TabBar, ActionConst} from 'react-native-router-flux'

// SCENES
import Tutorial from './sections/login/Tutorial'
import CompanySelection from './sections/login/CompanySelection'
import Login from './sections/login/Login'
import Chat from './sections/chat/Chat'
import Settings from './sections/settings/Settings'

export default class Routes extends Component {

  render() {
    return (
      <Router sceneStyle={Styles.mainScene} >
        <Scene key="root" >
          <Scene key='Tutorial' component={Tutorial} hideNavBar={true} initial={true} />
          <Scene key='CompanySelection' component={CompanySelection} hideNavBar={true} />
          <Scene key='Login' component={Login} hideNavBar={true} />

          <Scene key="tabBar" tabs={true} tabBarStyle={Styles.tabBarStyle}>
            <Scene
              key="chatTab"
              title="Chat"
              icon={TabIcon}
              onPress={ ()=> {
                Actions.Chat({type: ActionConst.REFRESH});
              }}
             >
                <Scene key="Chat" component={Chat} />
            </Scene>

            <Scene
              key="settingsTab"
              title="Settings"
              icon={TabIcon}
              onPress={ ()=> {
                Actions.Settings({type: ActionConst.REFRESH});
              }}
             >
                <Scene key="Settings" component={Settings} />
            </Scene>
          </Scene>

        </Scene>
      </Router>
    )
  }
}

const Styles = StyleSheet.create({
	mainScene: {

	},
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: 'white',
    opacity        : 1
  }
})
