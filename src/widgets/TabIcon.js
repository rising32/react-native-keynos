import React, { Component } from 'react'
import {View, Image, Text, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from 'keynos_app/src/commons/Commons'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class TabIcon extends Component {

  setTabIcon(title, selected){
    if(title == multiStrings.conversations) {
      if(selected) {
        return require('keynos_app/src/resources/chat_active.png')
      } else {
        return require('keynos_app/src/resources/chat.png')
      }
    } else if(title == multiStrings.settings) {
      if(selected) {
        return require('keynos_app/src/resources/settings_active.png')
      } else {
        return require('keynos_app/src/resources/settings.png')
      }
    } else if(title == multiStrings.files) {
      if(selected) {
        return require('keynos_app/src/resources/files_active.png')
      } else {
        return require('keynos_app/src/resources/files.png')
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
          style={{width:28, height:25, tintColor: this.props.selected ? this.props.main_color : null}}
          />
        <Text style={{fontSize: 10, color: this.props.selected ? this.props.main_color : Colors.gray_inactive}}>{this.props.title}</Text>
      </View>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    main_color: state.company.main_color,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabIcon)
