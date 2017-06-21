// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView, AsyncStorage} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import AppIntro from 'react-native-app-intro';
import {CorporateButton} from 'keynos_app/src/widgets/'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()
const winWidth = Utils.winWidth()

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSkip: true, //Autoskipped
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
    if(index==2) {
      this.setState({enableSkip: true})
      AsyncStorage.setItem('enableSkip', JSON.stringify(true), () => {

      });
    }
  }

  renderSkipButton() {
    if(this.state.enableSkip) {
      return(
        <CorporateButton bg_image={'http://keynos.mobi/images/default/default-pattern.png'} isPublic={true} onPress={() => Actions.CompanySelection()} label={multiStrings.accessToCompany}/>
      )
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} bounces={false}>
        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80*heightScale, marginBottom: 20*heightScale}} >
            <Text style={{color: Colors.green_light, fontSize: 20*widthScale, marginBottom: 5*heightScale}} >{multiStrings.tutorialTitle}</Text>
            <Text style={{color: Colors.gray_info, fontSize: 17*widthScale, textAlign: 'center'}} >{multiStrings.tutorialSubtitle}</Text>
          </View>
          <View style={{alignItems: 'center', backgroundColor: 'white',height: 240*heightScale, marginBottom: 10*heightScale}} >
            <Image source={require('keynos_app/src/resources/bots.png')} style={{height: 240*heightScale}} resizeMode={'contain'} />
          </View>
          <View style={{width:winWidth }} >
            {this.renderSkipButton()}
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', margin: 20*widthScale, marginBottom: 60*heightScale}} >
            <Image source={require('keynos_app/src/resources/logo.png')} style={{height: 30*heightScale, width: 136*widthScale}} resizeMode={'contain'} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect()(Tutorial)
