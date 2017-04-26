import React from 'react';
import {StyleSheet, View} from 'react-native';

import CorporateButton from 'keynos_app/src/widgets/CorporateButton'
import _ from 'lodash'

export default class AnswerMultipleOptions extends React.Component {

  render() {
    return(
      <View >
        { _.map(this.props.options, (opt) => {
          return <CorporateButton label={"Opción"} onPress={() => console.log("tapped opt: ", opt)} />
        }) }
      </View>
    )
  }
}
