// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert, AsyncStorage} from 'react-native'

// REDUX COMPONENTS
import { createStore, applyMiddleware, compose, } from 'redux'
import { Provider, connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'
import thunk from 'redux-thunk'

// ROUTER FLUX
import { Router, Actions } from 'react-native-router-flux';
import Routes from 'keynos_app/src/Routes'

// REDUCERS
const RouterWithRedux = connect()(Router);
import reducers from 'keynos_app/src/redux/reducers/Index'

// INITIALIZE REDUX STORE
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducers);

// COMPONENTS
import * as Webservices from 'keynos_app/src/webservices/Webservices'


export default class Index extends Component {

  componentWillMount() {
    Webservices.configureAxios(null)
  }

	// Managinig back Android button behaviour
	enableAndroidBack(){
		BackAndroid.addEventListener('hardwareBackPress', function() {
			try {
				Actions.pop();
				return true;
			}
			catch (err) {
				console.warn('Error back Android: ', err)
				return false;
			}
		});
	}

	render() {
		console.disableYellowBox = true;

    { this.enableAndroidBack() }

		return (
      <Provider store={store}>
        <Routes />
      </Provider>
		)
	}
}
