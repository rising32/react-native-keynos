// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView, Platform} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate, CorporateButton} from 'keynos_app/src/widgets/'
import SvgUri from 'react-native-svg-uri'

import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class LoginToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tokenNeedCorrection: false,
      tokenIncorrect: false,
      tokenErrorLabel: '',
    };
  }

  onChangeToken(value) {
    this.setState({token: value})
    // if(value != "" && !Utils.tokenValidate(value)){
    //   this.setState({tokenNeedCorrection: true, tokenIncorrect: true, tokenErrorLabel: multiStrings.validationToken})
    // }else if(value != "" && Utils.tokenValidate(value)){
    //   this.setState({tokenNeedCorrection: true, tokenIncorrect: false, tokenErrorLabel: ""})
    // }else{
    //   this.setState({tokenNeedCorrection: false, tokenIncorrect: false, tokenErrorLabel: ""})
    // }
  }

  renderCompanyImage(){
    console.log('logo',this.props.logo)
    if(this.props.logo) {
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', margin: 20*widthScale}} >
          <Image source={{uri: this.props.logo}} style={{width: 120*widthScale, height: 48*heightScale}} />
        </View>
      )
    }
  }

  render() {
    let companyName = this.props.loginName ? this.props.loginName : ''
    let main_color = this.props.main_color
    let offset = (Platform.OS === 'ios') ? 20 : 0
    return (
      <View style={{flex: 1}} >
        <ScrollView bounces={false} keyboardShouldPersistTaps={'always'}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80*heightScale, marginBottom: 30*heightScale}} >
            <Text style={{color: main_color, fontSize: 20*widthScale, marginBottom: 5*heightScale}} >{multiStrings.loginInto}</Text>
            <Text style={{color: Colors.gray_info, fontSize: 17*widthScale, textAlign: 'center'}} >{companyName + '.keynos.es'}</Text>
          </View>
          {this.renderCompanyImage()}
          <View style={{margin: 20*widthScale, marginTop: 0}} >
            <InputValidate
    					label={null}
    					placeholder={Utils.firstToUpperCase(multiStrings.token)}
              value={this.state.token}
              icon={require('keynos_app/src/resources/password_icon.png')}
              needCorrection={this.state.tokenNeedCorrection}
              incorrect={this.state.tokenIncorrect}
              errorlabel={this.state.tokenErrorLabel}
    					keyboardType={'default'}
    					autoCapitalize={'none'}
              onChangeText={(value) => this.onChangeToken(value)}
    				/>
          </View>
          <CorporateButton bg_image={this.props.bg_image} onPress={() => this.props.loginToken(this.state.token)} label={multiStrings.access}/>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25*heightScale, marginHorizontal: 40*widthScale}}
              onPress={() => Alert.alert(null, 'open browser')}>
              <Text style={{color: Colors.black, fontSize: 15*widthScale, textAlign: 'center'}} >
                {multiStrings.terms1}
                <Text style={{color: Colors.blue_link}} >{multiStrings.terms2}</Text>
                {multiStrings.terms3}
                <Text style={{color: Colors.blue_link}} >{multiStrings.terms4}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
  			<TouchableOpacity style={{position: 'absolute', top: offset, left: 0, height: 50*heightScale, width: 50*widthScale, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => Actions.CompanySelection()} >
  				<Image source={require('keynos_app/src/resources/arrowback.png')} style={{height: 22*heightScale, width: 13*widthScale, tintColor: main_color}} resizeMode={'contain'} />
  			</TouchableOpacity>
      </View>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    id: state.company.id,
    name: state.company.name,
    loginName: state.company.loginName,
    logo: state.company.logo,
    main_color: state.company.main_color
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    loginToken: (token) => {
      dispatch(LoginActions.loginToken(token));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginToken)
