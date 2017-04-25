import React, { Component } from 'react'
import {View, Image, Text, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../commons/Commons'

// MULTILENGUAJE
import multiStrings from '../commons/Multistrings'

class TabIcon extends Component {

  setTabIcon(title, selected){
    if(title == multiStrings.chat) {
      if(selected) {
        return require('../resources/chat_active.png')
      } else {
        return require('../resources/chat.png')
      }
    } else if(title == multiStrings.settings) {
      if(selected) {
        return require('../resources/settings_active.png')
      } else {
        return require('../resources/settings.png')
      }
    } else if(title == multiStrings.files) {
      if(selected) {
        return require('../resources/files_active.png')
      } else {
        return require('../resources/files.png')
      }
    }
  }

  render(){
    let image = this.setTabIcon(this.props.title, this.props.selected)

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{width:28, height:25, tintColor: this.props.selected ? Colors.green_light : null}}
          />
        <Text style={{fontSize: 10, color: this.props.selected ? Colors.green_light : Colors.gray_inactive}}>{this.props.title}</Text>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TabIcon)
