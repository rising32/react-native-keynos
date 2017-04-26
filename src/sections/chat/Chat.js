import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'

import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'


class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      responseType: 'text',
      minInputToolbarHeight: 44.5,
    }
  }

  onSend(messages = []) {
    this.setState({responseType: 'options'})
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
    let bgImage = this.props.bg_image ? { uri: this.props.bg_image } : null
    let messages = Utils.formatConversationMessages(this.props.conversation)

    return (
      <Image style={{flex: 1}} source={bgImage} resizeMode={'cover'} >

        <GiftedChat
          messages={messages}
          loadEarlier={false}
          onSend={this.onSend.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          minInputToolbarHeight={this.state.minInputToolbarHeight}
          renderAvatar={ () => null }
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
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
