import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'


class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      responseType: 'text',
      minInputToolbarHeight: 44.5,
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 2,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 3,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 4,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 5,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 6,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 7,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 8,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 9,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 10,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },

      ],
    });
  }

  onSend(messages = []) {
    this.setState({responseType: 'options'})
  }

  renderInputToolbar(props) {
    if(this.state.responseType == "text") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }}>
          <InputToolbar {...props} />
        </View>
      )
    } else if(this.state.responseType == "options") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }}>
          <AnswerMultipleOptions options={[1,2,3]} onPress={(opt) => this.setState({responseType: 'text'})} />
        </View>
      )
    }
  }

  calculateMinInputToolbarHeight(layout) {
    if(layout && layout.height){
      this.setState({minInputToolbarHeight: layout.height})
    }
  }

  render() {
    console.log("this.state.minInputToolbarHeight: ", this.state.minInputToolbarHeight)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <GiftedChat
            messages={this.state.messages}
            loadEarlier={false}
            onSend={this.onSend.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            minInputToolbarHeight={this.state.minInputToolbarHeight}
            user={{
              _id: 1,
            }}
          />
        </View>

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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
