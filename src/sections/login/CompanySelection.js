// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate, Spinner} from 'keynos_app/src/widgets/'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

class CompanySelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: 'Acme',
      companyNeedCorrection: false,
      companyIncorrect: false,
      companyErrorLabel: '',
    };
  }

  onCompanyChange(value) {
    this.setState({company: value})
    if(value != "" && !Utils.companyValidate(value)){
      this.setState({companyNeedCorrection: true, companyIncorrect: true, companyErrorLabel: multiStrings.validationCompany})
    }else if(value != "" && Utils.companyValidate(value)){
      this.setState({companyNeedCorrection: true, companyIncorrect: false, companyErrorLabel: ""})
    }else{
      this.setState({companyNeedCorrection: false, companyIncorrect: false, companyErrorLabel: ""})
    }
  }

  onSubmit() {
    if(!this.state.company) {
      Alert.alert(null, multiStrings.validationFields)
    } else if(!this.state.companyIncorrect) {
      this.props.loginCompany(this.state.company)
    }
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView bounces={false} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80, marginBottom: 30}} >
            <Text style={{color: Colors.green_light, fontSize: 20, marginBottom: 5}} >{multiStrings.accessToCompany}</Text>
          </View>
          <View style={{margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
            <View style={{flex: 1}}>
              <InputValidate
      					label={null}
      					placeholder={Utils.firstToUpperCase(multiStrings.company)}
                value={this.state.company}
                needCorrection={this.state.companyNeedCorrection}
                incorrect={this.state.companyIncorrect}
                errorlabel={this.state.companyErrorLabel}
      					keyboardType={'default'}
      					autoCapitalize={'none'}
                onChangeText={(value) => this.onCompanyChange(value)}
      				/>
            </View>
            <Text style={{color: Colors.green_light, fontSize: 20, marginLeft: 10}} >{'.keynos.es'}</Text>
          </View>
          <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
    				onPress={() => this.onSubmit()}>
    				<Text style={{color: Colors.white, fontSize: 17}}>{multiStrings.send}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25, marginHorizontal: 40}} >
              <Text style={{color: Colors.black, fontSize: 15, textAlign: 'center'}} >{multiStrings.tipCompany}</Text>
            </View>
          </View>
        </ScrollView>
				<Spinner visible={this.props.isFetching} />
      </View>
    );
  }
}

let mapStateToProps = (state) => {
	return {
    isFetching: state.login.isFetching,
	};
};

let mapDispatchToProps = (dispatch, props) => {
  return {
		loginCompany: (company) => {
      dispatch(LoginActions.loginCompany(company))
		}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelection)
