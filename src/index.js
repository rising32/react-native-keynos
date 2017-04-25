// BASIC COMPONENTS
import React, { Component } from 'react'
import {View,	Navigator, StyleSheet, TouchableOpacity, Image, Dimensions, BackAndroid, Platform, Text, Alert} from 'react-native'

// REDUX COMPONENTS
import { createStore, applyMiddleware, compose, } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

// ROUTER FLUX
import { Router } from 'react-native-router-flux';
import Routes from './Routes'


// REDUCERS
const RouterWithRedux = connect()(Router);
import reducers from './redux/reducers/Index'

// INITIALIZE REDUX STORE
const store = compose(
  applyMiddleware(thunk)
)(createStore)(reducers);


export default class Index extends Component {

	// Managinig back Android button behaviour
	enableAndroidBack(){
		BackAndroid.addEventListener('hardwareBackPress', function() {
			try {
				Actions.pop();
				return true;
			}
			catch (err) {
				console.warn('error backbutton fisico: ', err)
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
