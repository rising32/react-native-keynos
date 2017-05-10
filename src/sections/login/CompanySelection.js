// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate, Spinner, CorporateButton} from 'keynos_app/src/widgets/'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class CompanySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //company: 'acme',
      company: '',
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
        <ScrollView bounces={false} keyboardShouldPersistTaps={'always'}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80*heightScale, marginBottom: 30*heightScale}} >
            <Text style={{color: Colors.green_light, fontSize: 20*widthScale, marginBottom: 5}} >{multiStrings.accessToCompany}</Text>
          </View>
          <View style={{margin: 20*widthScale, flexDirection: 'row', alignItems: 'center'}} >

            <View style={{flex: 1, flexDirection: 'column'}}>
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

            <Text style={{color: Colors.green_light, fontSize: 20*widthScale, marginLeft: 10*widthScale}} >{'.keynos.es'}</Text>

          </View>
          <CorporateButton bg_image={this.props.bg_image} onPress={() => this.onSubmit()} label={multiStrings.send}/>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25*heightScale, marginHorizontal: 40*widthScale}} >
              <Text style={{color: Colors.black, fontSize: 15*widthScale, textAlign: 'center'}} >{multiStrings.tipCompany}</Text>
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
