// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert} from 'react-native'
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

  render() {
    let companyName = 'ibm'
    return (
      <View style={{flex: 1}} >
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 80, marginBottom: 30}} >
          <Text style={{color: Colors.green_light, fontSize: 20, marginBottom: 5}} >{multiStrings.loginInto}</Text>
          <Text style={{color: Colors.gray_info, fontSize: 17, textAlign: 'center'}} >{companyName + '.keynos.es'}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', margin: 20}} >
          <Image source={require('keynos_app/src/resources/company_logo.png')} style={{height: 48, width: 120}} resizeMode={'contain'} />
        </View>
        <View style={{margin: 20}} >
          <InputValidate
  					label={null}
  					placeholder={Utils.firstToUpperCase(multiStrings.company)}
            value={this.state.company}
            needCorrection={false}
            incorrect={false}
            errorlabel={''}
  					keyboardType={'default'}
  					autoCapitalize={'none'}
            onChangeText={(value) => this.setState({company: value})}
  				/>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.green_light, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
  				onPress={() => Actions.CompanySelection()}>
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
