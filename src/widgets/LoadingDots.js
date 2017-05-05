import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Utils } from 'keynos_app/src/commons/Commons'

export default class SpinnerCustom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      typingTextDots: '.',
      interval: null,
    }

    this.renderLoadingDots = this.renderLoadingDots.bind(this);
  }

  componentDidMount() {
    this.setState({ interval: setInterval(this.renderLoadingDots, 1000) })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  renderLoadingDots() {
    let typingTextDots = this.state.typingTextDots
    if(typingTextDots.length < 3) {
      typingTextDots = typingTextDots + '.'
    } else {
      typingTextDots = '.'
    }

    this.setState({ typingTextDots })
  }

  render() {
    return(
      <View style={{ margin: 10, alignItems: 'center' }}>
        <View style={{ backgroundColor: this.props.bgColor, paddingHorizontal: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 14, color: this.props.color, fontWeight: '600' }}>
            { this.props.label + this.state.typingTextDots }
          </Text>
        </View>
      </View>
    )
  }

}
