// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'

// REDUX
import { connect } from 'react-redux'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Conversations extends Component {

  componentWillMount() {
    //this.props.getConversationsList()
  }

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

let mapStateToProps = (state) => {
  return {

  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    getConversationsList: () => {
      dispatch(ConversationsActions.getConversationsList());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
