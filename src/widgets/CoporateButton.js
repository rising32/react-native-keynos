import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors} from 'keynos_app/src/commons/Commons'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class CorporateButton extends React.Component {

  _onPress() {
    this.props.onClick && this.props.onPress()
  }

  render() {
    return(
      <TouchableOpacity
        style={{backgroundColor: this.props.main_color, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12, margin: 20}}
        onPress={() => this._onPress()}
      >
        <Text style={{color: this.props.color ? this.props.color : Colors.white, fontSize: 17}}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    main_color: state.company.main_color
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateButton)
