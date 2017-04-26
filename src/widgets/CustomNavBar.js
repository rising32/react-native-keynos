import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, TextInput, ListView, Alert} from 'react-native'
import React, {Component} from 'react'
import {Actions, NavBar} from 'react-native-router-flux'
import moment from 'moment';

import {Colors, Utils} from 'keynos_app/src/commons/Commons'

//Redux
import { connect } from 'react-redux';

class CustomNavBar extends Component {
  render() {
    //console.log("CustomNavBar props: ", this.props)
    let main_color = this.props.main_color ? this.props.main_color.toString() : Colors.green_light
    return(
      <NavBar {...this.props} navigationBarStyle={{ backgroundColor: main_color }} />
    )
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
};

let mapStateToProps = (state) => {
	return {
    main_color: state.company.main_color,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBar)
