import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, TextInput, ListView, Alert} from 'react-native'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import moment from 'moment';

import {Colors, Utils} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';

class ConversationCell extends Component {
  render() {
    let bubleColor = this.props.main_color ? this.props.main_color.toString() : Colors.green_light
    let data = this.props.data ? this.props.data : {}
    let lastQuestion = 'pendiente'

		return(
			<TouchableOpacity style={{flex: 1, flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 5, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.gray_placeholder}}
        onPress={this.props.onPress}>
        <Image source={{uri: data.bot_image}} style={{height: 58, width: 54, marginRight: 10, borderRadius: 10}} resizeMode={'cover'} />
        <View style={{flex: 1}} >
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}} >
            <Text style={{color: Colors.black, fontSize: 17, marginRight: 13}}>{data.interlocutor}</Text>
            <Text style={{color: Colors.gray_chat, fontSize: 11, flex: 1}} numberOfLines={1}>{data.conversation_title}</Text>
          </View>
          <View style={{marginRight: 15, marginTop: 10}} >
            <Text style={{color: Colors.gray_chat, fontSize: 10}} numberOfLines={1}>{lastQuestion}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}} >
          <Text style={{color: Colors.gray_chat, fontSize: 17}}>{'Ayer'}</Text>
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
