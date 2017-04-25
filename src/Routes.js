// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// COMPONENTS
import TabIcon from './components/TabIcon';
import { Colors } from './commons/Commons'

// NAVIGATION COMPONENTS (ROUTER FLUX)
import {Modal, Actions, Scene, Router, TabBar, ActionConst} from 'react-native-router-flux'

// SCENES
import Tutorial from './sections/login/Tutorial'
import CompanySelection from './sections/login/CompanySelection'

import Login from './sections/login/Login'

import Chat from './sections/chat/Chat'
import Threads from './sections/chat/Threads'

import Settings from './sections/settings/Settings'

// MULTILENGUAJE
import multiStrings from './commons/Multistrings'


export default class Routes extends Component {

  render() {
    return (
      <Router sceneStyle={Styles.mainScene} >
        <Scene key="root" >
          <Scene key='Tutorial' component={Tutorial} hideNavBar={true} />
          <Scene key='CompanySelection' component={CompanySelection} hideNavBar={true} />
          <Scene key='Login' component={Login} hideNavBar={true} initial={true} />

          <Scene key="tabBar" tabs={true} tabBarStyle={Styles.tabBarStyle}>
            <Scene
              key="chatTab"
              title={multiStrings.chat}
              icon={TabIcon}
              onPress={ ()=> {
                Actions.Threads({type: ActionConst.REFRESH});
              }}
             >
                <Scene key="Threads" component={Threads} />
                <Scene key="Chat" component={Chat} hideTabBar/>
            </Scene>

            <Scene
              key="settingsTab"
              title={multiStrings.settings}
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
    borderColor    : Colors.gray_inactive,
    backgroundColor: Colors.white,
    opacity        : 1
  }
})
