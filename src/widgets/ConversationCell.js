import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, TextInput, ListView, Alert} from 'react-native'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import moment from 'moment';

import {Colors, Fonts, Utils} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';

class ConversationCell extends Component {
  render() {
    let image = null
		return(
			<TouchableOpacity style={{flex: 1, flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 5, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.gray_placeholder}}
        onPress={this.props.onPress}>
        <Image source={image} style={{height: 58, width: 54}} resizeMode={'contain'} />
        <View style={{flex: 1}} >
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}} >
            <Text style={{color: Colors.black, fontSize: 17, marginRight: 13}}>{'nombre bot'}</Text>
            <Text style={{color: Colors.gray_chat, fontSize: 11, flex: 1}}>{'subtitulo'}</Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 15}} >
            <Text style={{color: Colors.gray_chat, fontSize: 10}} numberOfLines={1}>{'texto con la primera frase de la conversación con el bot de la'}</Text>
          </View>
        </View>
        <View style={{marginLeft: 10, alignItems: 'center'}} >
          <Text style={{color: Colors.gray_chat, fontSize: 17}}>{'hora'}</Text>
            <View style={{backgroundColor: Colors.blue_link, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 11}} >
              <Text style={{color: Colors.white, fontSize: 11}}>{'1'}</Text>
            </View>
        </View>
      </TouchableOpacity>
		)
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    // updateArticleSelected: (value) => {
    //   dispatch(articlesActions.updateArticleSelected(value));
    // }
  }
};

let mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationCell)
