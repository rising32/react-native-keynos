// BASIC COMPONENTS
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'

// COMPONENTS
import { GiftedChat, InputToolbar, Bubble, Composer, Time, Day } from 'react-native-gifted-chat'
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'
import { CustomMessageText, CustomMessage } from 'keynos_app/src/widgets'
import * as Constants from 'keynos_app/src/webservices/Constants'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import LoadingDots from 'keynos_app/src/widgets/LoadingDots'

// REDUX
import { connect } from 'react-redux'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'


class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      responseType: 'text',
      minInputToolbarHeight: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.minInputToolbarHeight != this.state.minInputToolbarHeight){
      this.refs.chat.resetInputToolbar()
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

  onSelectImageTapped(opt) {
    let options = Constants.CAMERA_OPTIONS

    if(opt.code == "camera") {
      ImagePicker.launchCamera(options, (response)  => {
        this.onImageSelected(response, opt)
      });
    } else if(opt.code == "library") {
      ImagePicker.launchImageLibrary(options, (response)  => {
        this.onImageSelected(response, opt)
      });
    }
  }

  onImageSelected(response, opt) {
    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.error) {
      Constants.LOG_ENABLED && console.log('ImagePicker Error: ', response.error);
      Alert.alert(null, multiStrings.errorImage)
    } else if(response.data) {
      this.props.onAnswerTapped('image', opt.bubble_id, response.data)
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
      <CustomMessageText
        {...props}
        />
    )
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        placeholder={multiStrings.chatInputPlaceholder}
        />
    )
  }

  renderTime(props) {
    return (
      <Time
        {...props}
        textStyle={{
          right: { color: Colors.white },
          left: { color: Colors.black }
        }}
        />
    )
  }

  onLongPress(context) {
    //console.log("context: ", context)
    //context.actionSheet().showActionSheetWithOptions()
  }

  renderFooter(props) {
    if (this.props.typingText) {
      let interlocutor = this.props.conversation.interlocutor
      let bgColor = Utils.hexToRgbA(this.props.main_color, '0.7')

      return (
        <LoadingDots
          label={ multiStrings.formatString(multiStrings.isTyping, interlocutor) }
          bgColor={ bgColor }
          color={ Colors.white }
          />
      )
    }
    return null
  }

  renderInputToolbar(props) {
    let question = this.props.question
    let rgbaColor = Utils.hexToRgbA(this.props.main_color, '0.07')

    if(question && question.type == "text") {
      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: rgbaColor}} >
          <InputToolbar {...props} />
        </View>
      )
    } else if(question && question.type == "options") {
      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: rgbaColor}} >
          <AnswerMultipleOptions
            options={ question.options }
            onPress={ (opt) => this.props.onAnswerTapped(question.type, opt.bubble_id, opt.node_id) }
            />
        </View>
      )
    } else if(question && question.type == "image") {

      let cameraOptions = [
        { text: multiStrings.takePhoto, bubble_id: question.bubble_id, node_id: question.node_id, code: 'camera'},
        { text: multiStrings.selectPhoto, bubble_id: question.bubble_id, node_id: question.node_id, code: 'library' }
      ]

      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: rgbaColor}} >
          <AnswerMultipleOptions
            options={ cameraOptions }
            onPress={ (opt) => this.onSelectImageTapped(opt) }
            />
        </View>
      )
    } else {
      return <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{ height: 0 }} />
    }
  }

  calculateMinInputToolbarHeight(layout) {
    if(layout){
      this.setState({minInputToolbarHeight: layout.height})
    }
  }


  render() {
    let bgImage = this.props.bg_image ? { uri: this.props.bg_image } : null
    let rgbaColor = Utils.hexToRgbA(this.props.main_color, '0.1')

    let list = _.clone(this.props.messagesList)
    let messages = list.reverse()

    return (
      <Image style={{ flex: 1, backgroundColor: rgbaColor }} source={ bgImage } resizeMode={'repeat'} >
        <GiftedChat
          messages={messages}
          loadEarlier={false}
          ref="chat"
          onSend={this.onSend.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          renderMessage={this.renderMessage.bind(this)}
          renderMessageText={this.renderMessageText.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          renderComposer={this.renderComposer.bind(this)}
          renderTime={this.renderTime.bind(this)}
          onLongPress={this.onLongPress.bind(this)}
          minInputToolbarHeight={this.state.minInputToolbarHeight}
          lightboxProps={{ underlayColor: 'transparent' }}
          user={{ _id: 1 }}
          locale={ 'es' }
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
    typingText: state.conversations.typingText,
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
