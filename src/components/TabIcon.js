import React, { Component } from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import { connect } from 'react-redux';

class TabIcon extends Component {

  setTabIcon(title, selected){
    if(title == "Chat") {
      if(selected) {
        return require('../resources/chat.png')
      } else {
        return require('../resources/chat.png')
      }
    } else if(title == "Settings") {
      if(selected) {
        return require('../resources/settings.png')
      } else {
        return require('../resources/settings.png')
      }
    } else if(title == "Files") {
      if(selected) {
        return require('../resources/files.png')
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
          style={{width:28, height:25}}
          />
        <Text style={{fontSize: 10}}>{this.props.title}</Text>
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
