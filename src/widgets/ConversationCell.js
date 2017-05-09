import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, TextInput, ListView, Alert} from 'react-native'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import moment from 'moment'
import _ from 'lodash'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class ConversationCell extends Component {
  render() {
    let bubleColor = this.props.main_color ? this.props.main_color.toString() : Colors.green_light
    let data = this.props.data ? this.props.data : {}
    let tree = data.conversation_tree ? data.conversation_tree.history : [] // Array

    let lastBubble = tree.length ? _.last(tree) : null
    let lastNode = lastBubble && lastBubble.nodes && lastBubble.nodes.length ? _.last(lastBubble.nodes) : null
    let lastQuestion = ''
    let colorLastQuestion = Colors.gray_chat
    if(lastNode) {
      if(lastNode.nodeable_type=="App\\NodeText") {
        lastQuestion = lastNode.text
      } else if(lastNode.nodeable_type=="App\\NodeImage") {
        lastQuestion = multiStrings.image
      }
    } else {
      lastQuestion = multiStrings.newConversation
      colorLastQuestion = this.props.main_color
    }

    let timeAdded = ''
    let yesterday = moment().add(-1, 'days')
    let date = ''
    if(lastBubble && lastBubble.read_on) {
      date = moment(lastBubble.read_on)
      if(date.dayOfYear() < yesterday.dayOfYear()) {
        timeAdded = moment(lastBubble.read_on).format('L')
      } else if(date.dayOfYear() == yesterday.dayOfYear()) {
        timeAdded = multiStrings.yesterday
      } else {
        timeAdded = moment(lastBubble.read_on).format('HH:mm')
      }
    }


		return(
			<TouchableOpacity style={{flex: 1, flexDirection: 'row', paddingHorizontal: 12*widthScale, paddingVertical: 5*heightScale, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.gray_placeholder}}
        onPress={this.props.onPress}>
        <Image source={{uri: data.bot_image}} style={{height: 58*heightScale, width: 54*widthScale, marginRight: 10*widthScale, borderRadius: 10}} resizeMode={'cover'} />
        <View style={{flex: 1}} >
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15*widthScale}} >
            <Text style={{color: Colors.black, fontSize: 17*widthScale, marginRight: 13*widthScale}}>{data.interlocutor}</Text>
            <Text style={{color: Colors.gray_chat, fontSize: 11*widthScale, flex: 1}} numberOfLines={1}>{data.conversation_title}</Text>
          </View>
          <View style={{marginRight: 15*widthScale, marginTop: 10*heightScale}} >
            <Text style={{color: colorLastQuestion, fontSize: 10}} numberOfLines={1}>{lastQuestion}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}} >
          <Text style={{color: Colors.gray_chat, fontSize: 14*widthScale}}>{timeAdded}</Text>
          {/*
            <View style={{backgroundColor: bubleColor, marginTop: 5, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 11}} >
              <Text style={{color: Colors.white, fontSize: 11}}>{'1'}</Text>
            </View>
            */}
        </View>
      </TouchableOpacity>
		)
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
};

let mapStateToProps = (state) => {
	return {
    main_color: state.company.main_color
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCell)
