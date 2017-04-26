// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// COMPONENTS
import TabIcon from './components/TabIcon';
import { Colors } from './commons/Commons'
import { connect } from 'react-redux'
import * as Constants from 'keynos_app/src/webservices/Constants'

// NAVIGATION COMPONENTS (ROUTER FLUX)
import {Modal, Actions, Scene, Router, TabBar, ActionConst} from 'react-native-router-flux'

// SCENES
import Tutorial from './sections/login/Tutorial'
import CompanySelection from './sections/login/CompanySelection'
import Login from './sections/login/Login'
import LoginToken from './sections/login/LoginToken'

import Chat from './sections/chat/Chat'
import Conversations from './sections/chat/Conversations'

import Settings from './sections/settings/Settings'

// MULTILENGUAJE
import multiStrings from './commons/Multistrings'


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
          <Scene key='Tutorial' component={Tutorial} hideNavBar={true} initial={true} />
          <Scene key='CompanySelection' component={CompanySelection} hideNavBar={true} />
          <Scene key='Login' component={Login} hideNavBar={true} />
          <Scene key='LoginToken' component={LoginToken} hideNavBar={true} />

          <Scene key="TabBar" tabs={true} tabBarStyle={Styles.tabBarStyle} >
            <Scene
              key="ChatTab"
              title={multiStrings.chat}
              icon={TabIcon}
              onPress={ ()=> {
                Actions.Conversations({type: ActionConst.REFRESH});
              }}
             >
                <Scene key="Conversations" component={Conversations} />
                <Scene key="Chat" component={Chat} hideTabBar/>
            </Scene>

            <Scene
              key="SettingsTab"
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
