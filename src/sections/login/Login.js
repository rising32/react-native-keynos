// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Login extends Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}}>
        <Text>{multiStrings.login}</Text>
        <TouchableOpacity onPress={ () => this.props.loginCompany() } style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 50 }} >
          <Text>Test Company Login</Text>
        </TouchableOpacity>
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
    loginCompany: () => {
      dispatch(LoginActions.loginCompany('Acme'));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
