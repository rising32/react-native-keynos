import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomParsedText from './CustomParsedText';
import Communications from 'react-native-communications';

export default class CustomMessageText extends React.Component {
  constructor(props) {
    super(props);
    this.onUrlPress = this.onUrlPress.bind(this);
    this.onPhonePress = this.onPhonePress.bind(this);
    this.onEmailPress = this.onEmailPress.bind(this);
  }

  onUrlPress(url) {
    Linking.openURL(url);
  }

  onPhonePress(phone) {
    const options = [
      'Text',
      'Call',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Communications.phonecall(phone, true);
          break;
        case 1:
          Communications.text(phone);
          break;
      }
    });
  }

  onEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

  render() {
    return (
      <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        <CustomParsedText
          style={[styles[this.props.position].text, this.props.textStyle[this.props.position]]}
          parse={[
            {type: 'url', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onUrlPress},
            {type: 'phone', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onPhonePress},
            {type: 'email', style: StyleSheet.flatten([styles[this.props.position].link, this.props.linkStyle[this.props.position]]), onPress: this.onEmailPress},
          ]}
          position={this.props.position}
        >
          {this.props.currentMessage.text}
        </CustomParsedText>
      </View>
    );
  }
}

const textStyle = {
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

const styles = {
  left: StyleSheet.create({
    container: {
    },
    text: {
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {
    },
    text: {
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
};

CustomMessageText.contextTypes = {
  actionSheet: React.PropTypes.func,
};

CustomMessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: '',
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {},
};

CustomMessageText.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  textStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  linkStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
};
