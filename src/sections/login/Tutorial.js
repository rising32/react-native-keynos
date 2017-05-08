// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView, AsyncStorage} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import AppIntro from 'react-native-app-intro';
import Swiper from 'react-native-swiper'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSkip: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('enableSkip', (err, enableSkip) => {
      if(JSON.parse(enableSkip)==true) {
        this.setState({enableSkip: true})
      }
    });
  }

  enableSkipTutorial(index) {
    if(index==1) {
      this.setState({enableSkip: true})
      AsyncStorage.setItem('enableSkip', JSON.stringify(true), () => {

      });
    }
  }

  renderSkipButton() {
    if(this.state.enableSkip) {
      return(
        <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
          onPress={() => Actions.CompanySelection()}>
          <Text style={{color: Colors.white, fontSize: 17}}>{multiStrings.accessToCompany}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} bounces={false}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80*heightScale, marginBottom: 50*heightScale}} >
          <Text style={{color: Colors.green_light, fontSize: 20*widthScale, marginBottom: 5*heightScale}} >{multiStrings.tutorialTitle}</Text>
          <Text style={{color: Colors.gray_info, fontSize: 17*widthScale, textAlign: 'center'}} >{multiStrings.tutorialSubtitle}</Text>
        </View>
        <Swiper height={280*heightScale} dotColor={Colors.green_light} activeDotColor={Colors.green_active}
          onMomentumScrollEnd={(e, state, context) => this.enableSkipTutorial(state.index)} >
          <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}} >
            <Image source={require('keynos_app/src/resources/tutorial.png')} style={{height: 240*heightScale}} resizeMode={'contain'} />
          </View>
          <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}} >
            <Image source={require('keynos_app/src/resources/tutorial.png')} style={{height: 240*heightScale}} resizeMode={'contain'} />
          </View>
        </Swiper>
        {this.renderSkipButton()}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', margin: 20*widthScale, marginBottom: 60*heightScale}} >
          <Image source={require('keynos_app/src/resources/logo.png')} style={{height: 30*heightScale, width: 136*widthScale}} resizeMode={'contain'} />
        </View>
      </ScrollView>
    );
  }
}

export default connect()(Tutorial)
