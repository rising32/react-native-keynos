// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate} from 'keynos_app/src/widgets/'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'acme@keynos.com',
      emailNeedCorrection: false,
      emailIncorrect: false,
      emailErrorLabel: '',

      password: 'BtgDsMxQaLmasdEmW8jAQyd_kn',
      passwordNeedCorrection: false,
      passwordIncorrect: false,
      passwordErrorLabel: '',
    };
  }

	onChangeEmail(value) {
    this.setState({email: value})
    if(value != "" && !Utils.mailValidate(value)){
      this.setState({emailNeedCorrection: true, emailIncorrect: true, emailErrorLabel: multiStrings.validationMail})
    }else if(value != "" && Utils.mailValidate(value)){
      this.setState({emailNeedCorrection: true, emailIncorrect: false, emailErrorLabel: ""})
    }else{
      this.setState({emailNeedCorrection: false, emailIncorrect: false, emailErrorLabel: ""})
    }
  }

  onChangePassword(value) {
    this.setState({password: value})
    if(value != "" && !Utils.passwordValidate(value)){
      this.setState({passwordNeedCorrection: true, passwordIncorrect: true, passwordErrorLabel: multiStrings.validationPassword})
    }else if(value != "" && Utils.passwordValidate(value)){
      this.setState({passwordNeedCorrection: true, passwordIncorrect: false, passwordErrorLabel: ""})
    }else{
      this.setState({passwordNeedCorrection: false, passwordIncorrect: false, passwordErrorLabel: ""})
    }
  }

  render() {
    let companyName = 'ibm'
    return (
      <View style={{flex: 1}} >
        <ScrollView bouncs={false} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80, marginBottom: 30}} >
            <Text style={{color: Colors.green_light, fontSize: 20, marginBottom: 5}} >{multiStrings.loginInto}</Text>
            <Text style={{color: Colors.gray_info, fontSize: 17, textAlign: 'center'}} >{companyName + '.keynos.es'}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', margin: 20}} >
            <Image source={require('keynos_app/src/resources/company_logo.png')} style={{height: 48, width: 120}} resizeMode={'contain'} />
          </View>
          <View style={{margin: 20, marginBottom: 0}} >
            <InputValidate
    					label={null}
    					placeholder={Utils.firstToUpperCase(multiStrings.mail)}
              value={this.state.email}
              icon={require('keynos_app/src/resources/mail_icon.png')}
              needCorrection={this.state.emailNeedCorrection}
              incorrect={this.state.emailIncorrect}
              errorlabel={this.state.emailErrorLabel}
    					keyboardType={'default'}
    					autoCapitalize={'none'}
              onChangeText={(value) => this.onChangeEmail(value)}
    				/>
          </View>
          <View style={{margin: 20, marginTop: 0}} >
            <InputValidate
    					label={null}
    					placeholder={Utils.firstToUpperCase(multiStrings.password)}
              value={this.state.password}
              icon={require('keynos_app/src/resources/password_icon.png')}
              needCorrection={this.state.passwordNeedCorrection}
              incorrect={this.state.passwordIncorrect}
              errorlabel={this.state.passwordErrorLabel}
    					keyboardType={'default'}
    					autoCapitalize={'none'}
              onChangeText={(value) => this.onChangePassword(value)}
    				/>
          </View>
          <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
    				onPress={() => this.props.login(this.state.email, this.state.password)}>
    				<Text style={{color: Colors.white, fontSize: 17}}>{multiStrings.access}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25, marginHorizontal: 40}}
              onPress={() => Alert.alert(null, 'open browser')}>
              <Text style={{color: Colors.black, fontSize: 15, textAlign: 'center'}} >
                {multiStrings.terms1}
                <Text style={{color: Colors.blue_link}} >{multiStrings.terms2}</Text>
                {multiStrings.terms3}
                <Text style={{color: Colors.blue_link}} >{multiStrings.terms4}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    login: (email, password) => {
      dispatch(LoginActions.login(email, password));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
