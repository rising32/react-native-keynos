// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView, Platform} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate} from 'keynos_app/src/widgets/'
import SvgUri from 'react-native-svg-uri'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

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

  onPressLogin() {
		if(this.state.email=='' || this.state.password=='') {
			Alert.alert(null, multiStrings.enterFields)
		} else if(!this.state.emailIncorrect && !this.state.passwordIncorrect){
			this.props.login(this.state.email, this.state.password)
		}
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
    let companyName = this.props.name
    let main_color = this.props.main_color
    let offset = (Platform.OS === 'ios') ? 20 : 0
    return (
      <View style={{flex: 1}} >
        <ScrollView bounces={false} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80*heightScale, marginBottom: 30*heightScale}} >
            <Text style={{color: main_color, fontSize: 20*widthScale, marginBottom: 5*heightScale}} >{multiStrings.loginInto}</Text>
            <Text style={{color: Colors.gray_info, fontSize: 17*widthScale, textAlign: 'center'}} >{companyName + '.keynos.es'}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', margin: 20*widthScale}} >
            <SvgUri
              width="120"
              height="48"
              source={{uri: this.props.logo}}
            />
          </View>
          <View style={{margin: 20*widthScale, marginBottom: 0}} >
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
          <View style={{margin: 20*widthScale, marginTop: 0}} >
            <InputValidate
    					label={null}
    					placeholder={Utils.firstToUpperCase(multiStrings.password)}
              value={this.state.password}
              icon={require('keynos_app/src/resources/password_icon.png')}
              needCorrection={this.state.passwordNeedCorrection}
              incorrect={this.state.passwordIncorrect}
              errorlabel={this.state.passwordErrorLabel}
						  secureTextEntry={true}
    					keyboardType={'default'}
    					autoCapitalize={'none'}
              onChangeText={(value) => this.onChangePassword(value)}
    				/>
          </View>
          <TouchableOpacity style={{backgroundColor: main_color, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12*widthScale, marginHorizontal: 20*widthScale}}
    				onPress={() => this.props.login(this.state.email, this.state.password)}>
    				<Text style={{color: Colors.white, fontSize: 17*widthScale}}>{multiStrings.access}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', padding: 12*widthScale, margin: 20*widthScale, marginTop: 0}}
    				onPress={() => Utils.openUrl('https://acme.keynos.com/password-reset.php')}>
    				<Text style={{color: main_color, fontSize: 15*widthScale}}>{multiStrings.rememberPassword}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25, marginHorizontal: 40*widthScale}}
              onPress={() => Utils.openUrl('https://keynos.com/terminos-y-condiciones.php')}>
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
    logo: state.company.logo,
    main_color: state.company.main_color
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
