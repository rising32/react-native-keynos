// BASIC COMPONENTS
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'

// COMPONENTS
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'
import { CustomMessageText, CustomMessage } from 'keynos_app/src/widgets'
import _ from 'lodash'

// REDUX
import { connect } from 'react-redux'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'


class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      responseType: 'text',
      minInputToolbarHeight: 194.5,
    }
  }

  componentWillUnmount() {
    this.props.getConversationsList()
  }

  onSend(messages = []) {
    if(messages.length) {
      let message = messages[0]
      this.props.onAnswerTapped(this.props.question.type, this.props.question.bubble_id, message.text)
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: this.props.main_color },
          left: { backgroundColor: Colors.white }
        }}
      />
    )
  }

  renderMessage(props) {
    return (
      <CustomMessage
        {...props}
      />
    )
  }

  renderMessageText(props) {
    return (
      <CustomMessageText {...props}/>
    )
  }

  renderInputToolbar(props) {
    let question = this.props.question
    if(question && question.type == "text") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }} style={{backgroundColor: Colors.chatInputBg}} >
          <InputToolbar {...props} />
        </View>
      )
    } else if(question && question.type == "options") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }} style={{backgroundColor: Colors.chatInputBg}} >
          <AnswerMultipleOptions
            options={question.options}
            onPress={ (opt) => this.props.onAnswerTapped(question.type, opt.bubble_id, opt.node_id) }
          />
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
    let bgImage = this.props.bg_image ? { uri: this.props.bg_image } : null
    let list = _.clone(this.props.messagesList)
    let messages = list.reverse()

    return (
      <Image style={{ flex: 1, backgroundColor: Colors.chatListBg }} source={ bgImage } resizeMode={'cover'} >

        <GiftedChat
          messages={messages}
          loadEarlier={false}
          onSend={this.onSend.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          renderMessage={this.renderMessage.bind(this)}
          renderMessageText={this.renderMessageText.bind(this)}
          minInputToolbarHeight={this.state.minInputToolbarHeight}
          user={{ _id: 1 }}
        />

      </Image>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    bg_image: state.company.bg_image,
    main_color: state.company.main_color,
    conversation: state.conversations.selected,
    messagesList: state.conversations.messagesList,
    question: state.conversations.question,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    onAnswerTapped: (type, bubble_id, answer) => {
      if(type && bubble_id && answer) {
        dispatch(ConversationsActions.onAnswerTapped(type, bubble_id, answer))
      }
    },
    getConversationsList: () => {
      dispatch(ConversationsActions.getConversationsList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
