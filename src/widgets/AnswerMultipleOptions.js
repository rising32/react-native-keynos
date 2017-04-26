import React from 'react';
import {StyleSheet, View} from 'react-native';

import CorporateButton from 'keynos_app/src/widgets/CorporateButton'
import _ from 'lodash'

export default class AnswerMultipleOptions extends React.Component {

  _onPress(opt) {
    this.props.onPress && this.props.onPress(opt)
  }

  render() {
    return(
      <View style={{backgroundColor: 'red'}}>
        { _.map(this.props.options, (opt, i) => {
            return <CorporateButton key={i} label={"Opción"} onPress={() => _onPress(opt)} />
        }) }
      </View>
    )
  }
}
