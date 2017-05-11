// BASIC COMPONENTS
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, Platform, Dimensions } from 'react-native'

// COMPONENTS
import { GiftedChat, InputToolbar, Bubble, Composer, Time } from 'react-native-gifted-chat'
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import AnswerMultipleOptions from 'keynos_app/src/widgets/AnswerMultipleOptions'
import { CustomMessageText, CustomMessage } from 'keynos_app/src/widgets'
import * as Constants from 'keynos_app/src/webservices/Constants'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import LoadingDots from 'keynos_app/src/widgets/LoadingDots'
import Triangle from 'react-native-triangle';

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
      androidBgImagesArray: [],
    }
  }

  componentWillMount() {
    if(Platform.OS !== 'ios') {
      this.getAndroidBgImages(this.props.bg_image ? this.props.bg_image : 'http://keynos.mobi/images/default/default-pattern.png')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.minInputToolbarHeight != this.state.minInputToolbarHeight){
      // Update listView height with new inputToolbarHeight
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

  getBubbleStyle(props) {
    let userID = props.currentMessage.user ? props.currentMessage.user._id : null
    let nextUserID = props.nextMessage && props.nextMessage.user ? props.nextMessage.user._id : null
    if(props.position=='left') {
      return {
        renderTriangle: nextUserID ? userID!=nextUserID : true,
        direction: 'down-right',
        position: {left: -5},
        triangleColor: Colors.white
      }
    } else if(props.position=='right'){
      return {
        renderTriangle: nextUserID ? userID!=nextUserID : true,
        direction: 'down-left',
        position: {right: -5},
        triangleColor: this.props.main_color
      }
    }
  }

  renderBubble(props) {
    let bubleStyle = this.getBubbleStyle(props)
    return (
      <View style={{marginHorizontal: 5}} >
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: this.props.main_color, borderBottomRightRadius: bubleStyle.renderTriangle ? 0 : 15 },
            left: { backgroundColor: Colors.white, borderBottomLeftRadius: bubleStyle.renderTriangle ? 0 : 15 }
          }}
        />
      {bubleStyle.renderTriangle ?
        <View style={[bubleStyle.position, {position: 'absolute', bottom: 0}]} >
          <Triangle
            width={5}
            height={10}
            color={bubleStyle.triangleColor}
            direction={bubleStyle.direction}
          />
        </View> : null
      }
      </View>
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
    let bgColor = Utils.hexToRgbA(this.props.main_color, '0.7')

    if(this.props.typingText) {
      let interlocutor = this.props.conversation.interlocutor

      return (
        <LoadingDots
          label={ multiStrings.formatString(multiStrings.isTyping, interlocutor) }
          bgColor={ bgColor }
          color={ Colors.white }
          />
      )
    }
    else if(this.props.chatFinished) {
      return (
        <View style={{ margin: 10, marginBottom: 30, alignItems: 'center' }}>
          <View style={{ backgroundColor: bgColor, paddingHorizontal: 10, borderRadius: 5 }}>
            <Text style={{ fontSize: 14, color: Colors.white, fontWeight: '600' }}>
              { multiStrings.chatFinishedLabel }
            </Text>
          </View>
        </View>
      )
    }
  }

  renderInputToolbar(props) {
    let question = this.props.question
    let rgbaColor = Utils.hexToRgbA(this.props.main_color, '0.4')

    if(!this.props.typingText && question && question.type == "text") {
      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: rgbaColor}} >
          <InputToolbar {...props} label={multiStrings.send} />
        </View>
      )
    } else if(!this.props.typingText && question && question.type == "options") {
      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: Colors.white}} >
          <View style={{backgroundColor: rgbaColor}}>
            <AnswerMultipleOptions
              options={ question.options }
              onPress={ (opt) => this.props.onAnswerTapped(question.type, opt.bubble_id, opt.node_id) }
              />
          </View>
        </View>
      )
    } else if(!this.props.typingText && question && question.type == "image") {

      let cameraOptions = [
        { text: multiStrings.takePhoto, bubble_id: question.bubble_id, node_id: question.node_id, code: 'camera'},
        { text: multiStrings.selectPhoto, bubble_id: question.bubble_id, node_id: question.node_id, code: 'library' }
      ]

      return (
        <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{backgroundColor: Colors.white}} >
          <View style={{backgroundColor: rgbaColor}}>
            <AnswerMultipleOptions
              options={ cameraOptions }
              onPress={ (opt) => this.onSelectImageTapped(opt) }
              />
          </View>
        </View>
      )
    } else {
      return <View onLayout={ (e) => this.calculateMinInputToolbarHeight(e.nativeEvent.layout) } style={{ height: 0 }} />
    }
  }

  calculateMinInputToolbarHeight(layout) {
    // Update inputToolBar height
    if(layout) this.setState({minInputToolbarHeight: layout.height})
  }

  getAndroidBgImages(bgImage) {
    // For background image repeat on android
    let images = []
    let verticalViews = []

    let totalWidth = Dimensions.get('window').width
    let totalHeight = Dimensions.get('window').height

    Image.getSize(bgImage, (width, height) => {

      let imageWidth = Math.ceil(height * 120 / width)

      for(var i=0; i < Math.ceil(totalWidth/imageWidth); i++){
        images.push((
           <Image key={'i'+i} source={{uri: bgImage}} style={{width: imageWidth, height: imageWidth, backgroundColor: this.props.main_color, opacity: 0.2}} />
        ))
      }

      for(var i=0; i < Math.ceil(totalHeight/imageWidth); i++){
        verticalViews.push((
          <View key={'v'+i} style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            { _.map(images, img => {
             return img;
            })}
          </View>
        ))
      }

      this.setState({androidBgImagesArray: verticalViews})
    })
  }

  renderChat() {

    let list = _.clone(this.props.messagesList)
    let messages = list.reverse()

    return (
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
    )
  }


  render() {
    let bgImage = this.props.bg_image ? { uri: this.props.bg_image } : {uri: 'http://keynos.mobi/images/default/default-pattern.png'}

    if(Platform.OS === 'ios') {
      return (
        <View style={{flex: 1}} >
          <Image style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: this.props.main_color, opacity: 0.2 }} source={ bgImage } resizeMode={'repeat'} />
          { this.renderChat() }
        </View>
      )
    } else {

      return (
        <View style={{ flex: 1}} >

          <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'transparent'}}>
            { _.map(this.state.androidBgImagesArray, img => {
             return img;
            })}
          </View>

          { this.renderChat() }

        </View>
      )
    }
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
    chatFinished: state.conversations.chatFinished,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    onAnswerTapped: (type, bubble_id, answer) => {
      if(type && bubble_id && answer) {
        dispatch(ConversationsActions.setTypingText(true))
        dispatch(ConversationsActions.onAnswerTapped(type, bubble_id, answer))
      }
    },
    getConversationsList: () => {
      dispatch(ConversationsActions.getConversationsList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
