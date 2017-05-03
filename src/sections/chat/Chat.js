import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'
import {CustomBubble} from 'keynos_app/src/widgets'


class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      responseType: 'text',
      minInputToolbarHeight: 300,
    }
  }

  onSend(messages = []) {

  }

  renderBubble(props) {
    return (
      <CustomBubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: this.props.main_color },
          left: { backgroundColor: Colors.white }
        }}
      />
    )
  }

  renderInputToolbar(props) {
    let question = this.props.question
    if(question && question.type == "text") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }}>
          <InputToolbar {...props} />
        </View>
      )
    } else if(question && question.type == "options") {
      return (
        <View onLayout={(e) => { this.calculateMinInputToolbarHeight(e.nativeEvent.layout) }}>
          <AnswerMultipleOptions
            options={question.options}
            onPress={ (opt) => console.log("selected opt: ", opt) }
          />
        </View>
      )
    }
  }

  calculateMinInputToolbarHeight(layout) {
    if(layout && layout.height){
      console.log("layout.height: ", layout.height)
      this.setState({minInputToolbarHeight: layout.height})
    }
  }

  render() {
    let bgImage = this.props.bg_image ? { uri: this.props.bg_image } : null
    let messages = this.props.messagesList

    return (
      <Image style={{flex: 1, backgroundColor: 'gray'}} source={bgImage} resizeMode={'cover'} >

        <GiftedChat
          messages={messages}
          loadEarlier={false}
          onSend={this.onSend.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
