// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

import {CorporateButton} from 'keynos_app/src/widgets/'

// REDUX
import { connect } from 'react-redux'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Settings extends Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white}}>
        <CorporateButton onPress={() => this.props.onLogOut()} label={multiStrings.logOut}/>
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    list: state.conversations.list,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOut: () => {
      dispatch(ConversationsActions.getConversationsList());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
