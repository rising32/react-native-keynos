// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView} from 'react-native'
import {Colors} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import AppIntro from 'react-native-app-intro';
import Swiper from 'react-native-swiper'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';

class Tutorial extends Component {

  render() {
    return (
      <View style={{flex: 1}} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80, marginBottom: 50}} >
            <Text style={{color: Colors.green_light, fontSize: 20, marginBottom: 5}} >{multiStrings.tutorialTitle}</Text>
            <Text style={{color: Colors.gray_info, fontSize: 17, textAlign: 'center'}} >{multiStrings.tutorialSubtitle}</Text>
          </View>
          <Swiper height={240} dotColor={Colors.green_light} activeDotColor={Colors.green_active} >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow'}} >
              <Text style={{color: Colors.black, fontSize: 20, marginBottom: 5}} >{'tutorial 1'}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue'}} >
              <Text style={{color: Colors.black, fontSize: 20, marginBottom: 5}} >{'tutorial 2'}</Text>
            </View>
          </Swiper>
          <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
    				onPress={() => Actions.CompanySelection()}>
    				<Text style={{color: Colors.white, fontSize: 17}}>{multiStrings.accessToCompany}</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center', justifyContent: 'center', margin: 20}} >
            <Image source={require('keynos_app/src/resources/logo.png')} style={{height: 30, width: 136}} resizeMode={'contain'} />
          </View>
      </View>
    );
  }
}

export default connect()(Tutorial)
