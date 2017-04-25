// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ScrollView} from 'react-native'
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import {InputValidate} from 'keynos_app/src/widgets/'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

//Redux
import { connect } from 'react-redux';

class CompanySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
    };
  }

  onCompanyChange(value) {
    this.setState({company: value})
  }

  render() {
    let companyName = 'ibm'
    return (
      <View style={{flex: 1}} >
        <ScrollView bouncs={false} >
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80, marginBottom: 30}} >
            <Text style={{color: Colors.green_light, fontSize: 20, marginBottom: 5}} >{multiStrings.accessToCompany}</Text>
          </View>
          <View style={{margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
            <View style={{flex: 1}}>
              <InputValidate
      					label={null}
      					placeholder={Utils.firstToUpperCase(multiStrings.company)}
                value={this.state.company}
                needCorrection={false}
                incorrect={false}
                errorlabel={''}
      					keyboardType={'default'}
      					autoCapitalize={'none'}
                onChangeText={(value) => this.onCompanyChange(value)}
      				/>
            </View>
            <Text style={{color: Colors.green_light, fontSize: 20, marginLeft: 10}} >{'.keynos.es'}</Text>
          </View>
          <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
    				onPress={() => Actions.Login()}>
    				<Text style={{color: Colors.white, fontSize: 17}}>{multiStrings.send}</Text>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}} >
            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 25, marginHorizontal: 40}} >
              <Text style={{color: Colors.black, fontSize: 15, textAlign: 'center'}} >{multiStrings.tipCompany}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
		// onUpdateArticle: (article) => {
    //   dispatch(articlesActions.updateArticleSelected(article))
		// }
  }
};

let mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelection)
