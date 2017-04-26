import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'


import {Colors, Fonts} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';
import * as LoginActions from 'keynos_app/src/redux/actions/Login';

const IPHONE6_WIDTH = 375;
var initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class Splash extends Component {

	static propTypes = {
		dispatch: React.PropTypes.func
	};

	componentDidMount(){
		//this.props.dispatch(LoginActions.restoreUserDefault())
    let timer = setTimeout(() => {
      Actions.Tutorial({type: 'reset'})
    }, 2000);
	}

	render() {
		return(
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
				<Image source={require('keynos_app/src/resources/keynos_logo.png')} style={{}} resizeMode={'cover'} />
      </View>
		)
	}
}

export default connect()(Splash)
