import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, TextInput, Platform, Alert, BackAndroid} from 'react-native'
import React, {Component} from 'react'
import {Actions, NavBar} from 'react-native-router-flux'
import moment from 'moment';

import {Colors, Utils} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class ConversationNavBar extends Component {
  onBackPress() {
    this.props.updateIsTutorial(false)
    this.props.getConversationsList()
    Actions.pop({type: 'reset'})
  }

  renderBackButton(main_color){
    if(!this.props.isTutorial || this.props.chatFinished) {
      return(
        <TouchableOpacity style={{height: 50*heightScale, width: 50*widthScale, justifyContent: 'center', paddingLeft: 15*widthScale}}
          onPress={() =>  this.onBackPress()} >
          <Image source={require('keynos_app/src/resources/arrowback.png')} style={{height: 22*heightScale, width: 18*widthScale, tintColor: main_color}} resizeMode={'contain'} />
        </TouchableOpacity>
      )
    }
  }

  enableAndroidBack(){
    let disableButton = this.props.isTutorial
  	BackAndroid.addEventListener('hardwareBackPress', function() {
  		let time = null
  		try {
        if(!disableButton) {
          Actions.pop();
        }
  			return true;
  		}
  		catch (err) {
  			console.warn('error backbutton fisico: ', err)
  			return false;
  		}
  	});
  }

  render() {
    {this.enableAndroidBack()}
    let main_color = this.props.main_color ? this.props.main_color.toString() : Colors.green_light
    let data = this.props.selected ? this.props.selected : {}
    let offset = (Platform.OS === 'ios') ? 20 : 0 //56-and, 74-ios
    return(
      <View style={{backgroundColor: "snow", position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', height: 100*heightScale, alignItems: 'center', justifyContent: 'center', marginTop: offset, borderBottomWidth: 1, borderBottomColor: "gainsboro"}}>
        {this.renderBackButton(main_color)}
        <Image source={{uri: data.bot_image}} style={{height: 58*heightScale, width: 54*widthScale, marginHorizontal: 10*widthScale, borderRadius: 10}} resizeMode={'cover'} />
        <View style={{flex: 1, marginRight: 10*widthScale}}>
          <Text style={{color: Colors.gray_info, fontSize: 17*widthScale, fontWeight: 'bold'}} numberOfLines={1}>{data.interlocutor}</Text>
          <Text style={{color: "darkgrey", fontSize: 12*widthScale, marginVertical: 8*heightScale}} numberOfLines={1}>{data.conversation_title}</Text>
        </View>
        {/*
        <TouchableOpacity style={{marginRight: 10}}>
          <Text style={{color: main_color, fontSize: 15}}>{multiStrings.edit}</Text>
        </TouchableOpacity>
        */}
      </View>
    )
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    getConversationsList: () => {
      dispatch(ConversationsActions.getConversationsList())
    },

    updateIsTutorial: (value) => {
      dispatch(ConversationsActions.updateIsTutorial(value))
    }
  }
};

let mapStateToProps = (state) => {
	return {
    selected: state.conversations.selected,
    isTutorial: state.conversations.isTutorial,
    chatFinished: state.conversations.chatFinished,
    main_color: state.company.main_color,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationNavBar)
