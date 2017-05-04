// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

import {CorporateButton} from 'keynos_app/src/widgets/'
import {Colors} from 'keynos_app/src/commons/Commons'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Settings extends Component {
  onLogoutPress() {
    Alert.alert(null, multiStrings.confirmLogOut, [
      { text: multiStrings.cancel, onPress: () => {} },
      { text: multiStrings.accept, onPress: () => this.props.onLogOut() }
    ])
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: Colors.white}} >
        <CorporateButton onPress={() => this.onLogoutPress()} label={multiStrings.logOut}/>
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {

  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOut: () => {
      dispatch(LoginActions.setLogOut());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
