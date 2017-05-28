import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Utils} from 'keynos_app/src/commons/Commons'
import CorporateButton from 'keynos_app/src/widgets/CorporateButton'
import _ from 'lodash'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

export default class AnswerMultipleOptions extends React.Component {

  _onPress(opt) {
    this.props.onPress && this.props.onPress(opt)
  }

  render() {
    return(
      <View style={{backgroundColor: 'transparent', marginVertical: 10*heightScale}}>
        { _.map(this.props.options, (opt, i) => {
            return <CorporateButton key={i} isSolid={true} label={opt.text} onPress={() => this._onPress(opt)} />
        }) }
      </View>
    )
  }
}
