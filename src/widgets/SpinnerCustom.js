import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

export default class SpinnerCustom extends React.Component {

  render() {
    if(this.props.visible) {
      return(
        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)'}} >
          <ActivityIndicator color={'white'} size={'large'} />
        </View>
      )
    } else {
      return null
    }
  }
}
