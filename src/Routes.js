// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// COMPONENTS
import { Colors, Utils } from './commons/Commons'
import {CustomNavBar, ConversationNavBar, TabIcon} from 'keynos_app/src/widgets/'
import { connect } from 'react-redux'
import * as Constants from 'keynos_app/src/webservices/Constants'

// NAVIGATION COMPONENTS (ROUTER FLUX)
import {Modal, Actions, Scene, Router, TabBar, ActionConst, NavBar} from 'react-native-router-flux'

// SCENES
import Splash from './sections/login/Splash'
import Tutorial from './sections/login/Tutorial'
import CompanySelection from './sections/login/CompanySelection'
import Login from './sections/login/Login'
import LoginToken from './sections/login/LoginToken'

import Chat from './sections/chat/Chat'
import Conversations from './sections/chat/Conversations'

import Settings from './sections/settings/Settings'

// MULTILENGUAJE
import multiStrings from './commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

let offset = (Platform.OS === 'ios') ? 20 : 0 //56-and, 74-ios
let getNavBarOffset = Navigator.NavigationBar.Styles.General.NavBarHeight + offset

class Routes extends Component {
  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.error && this.props.error){
      this.showError()
    }
  }

  showError() {
    if(this.props.error){
      if(Constants.LOG_ENABLED) {
        console.log("error error: ", this.props.error)
        console.log("error label: ", this.props.label)
        console.log("error url: ", this.props.url)
        console.log("error func: ", this.props.func)
      }
      Alert.alert(null, this.props.label, [
        { text: multiStrings.accept, onPress: () => this.props.removeError() },
      ])
    }
  }

  render() {
    return (
      <Router sceneStyle={Styles.mainScene} >
        <Scene key="root" >
          <Scene key='Splash' component={Splash} hideNavBar={true} initial={true} />
          <Scene key='Tutorial' component={Tutorial} hideNavBar={true} />
          <Scene key='CompanySelection' component={CompanySelection} hideNavBar={true} />
          <Scene key='Login' component={Login} hideNavBar={true} />
          <Scene key='LoginToken' component={LoginToken} hideNavBar={true} />

          <Scene key="TabBar" tabs={true} tabBarStyle={Styles.tabBarStyle} >
            <Scene
              key="ChatTab"
              title={multiStrings.conversations}
              icon={TabIcon}
              onPress={ ()=> Actions.Conversations({type: ActionConst.REFRESH})}
            >
              <Scene key="Conversations" component={Conversations} navBar={CustomNavBar} title={multiStrings.conversations} titleStyle={{color: Colors.white, fontSize: 16*widthScale}} sceneStyle={{paddingTop: getNavBarOffset}}/>
              <Scene key="Chat" duration={1} component={Chat} navBar={ConversationNavBar} sceneStyle={{paddingTop: 100*heightScale+offset}} hideTabBar />
            </Scene>

            <Scene
              key="SettingsTab"
              title={multiStrings.settings}
              icon={TabIcon}
              onPress={ ()=> Actions.Settings({type: ActionConst.REFRESH})}
            >
              <Scene key="Settings" component={Settings} navBar={CustomNavBar} title={multiStrings.settings} titleStyle={{color: Colors.white, fontSize: 16*widthScale}} sceneStyle={{paddingTop: getNavBarOffset}}/>
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

let mapStateToProps = (state) => {
  return {
    error: state.error.error,
    label: state.error.label,
    url: state.error.url,
    func: state.error.func,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    removeError: () => {
      dispatch({type: 'REMOVE_ERROR'});
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
