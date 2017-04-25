// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'
import {Colors} from '../../commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import AppIntro from 'react-native-app-intro';

// MULTILENGUAJE
import multiStrings from '../../commons/Multistrings'

export default class Login extends Component {
  onSkipBtnHandle = (index) => {
    Alert.alert('Skip');
    console.log(index);
  }
  doneBtnHandle = () => {
    //Alert.alert('Done');
    Actions.CompanySelection()
  }
  nextBtnHandle = (index) => {
    //Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    //console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: 'https://goo.gl/Bnc3XP',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <View style={{flex: 1}} >
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80}} >
          <Text style={{color: Colors.green_light, fontSize: 20}} >{multiStrings.tutorialTitle}</Text>
          <Text style={{color: Colors.gray_info, fontSize: 17}} >{multiStrings.tutorialSubtitle}</Text>
        </View>
        <View style={{}} >
          <AppIntro
            showSkipButton={false}
            showDoneButton={false}
            onNextBtnClick={this.nextBtnHandle}
            onDoneBtnClick={this.doneBtnHandle}
            onSkipBtnClick={this.onSkipBtnHandle}
            onSlideChange={this.onSlideChangeHandle}
            pageArray={pageArray}
          />
        </View>
      </View>
    );
  }
}
