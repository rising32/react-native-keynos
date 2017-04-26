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
      <View style={{backgroundColor: 'transparent', borderTopWidth: 1, borderTopColor: 'black'}}>
        { _.map(this.props.options, (opt, i) => {
            return <CorporateButton key={i} label={"Option"} onPress={() => this._onPress(opt)} />
        }) }
      </View>
    )
  }
}
