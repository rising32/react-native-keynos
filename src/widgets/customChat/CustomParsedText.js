import React from 'react';
import ReactNative from 'react-native';

import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import CustomTextExtraction from './CustomTextExtraction';
import HTMLView from 'react-native-htmlview';

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
  email: /\S+@\S+\.\S+/,
};

const defaultParseShape = React.PropTypes.shape({
  ...ReactNative.Text.propTypes,
  type: React.PropTypes.oneOf(Object.keys(PATTERNS)).isRequired,
});

const customParseShape = React.PropTypes.shape({
  ...ReactNative.Text.propTypes,
  pattern: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(RegExp)]).isRequired,
});

class CustomParsedText extends React.Component {

  static displayName = 'ParsedText';

  static propTypes = {
    ...ReactNative.Text.propTypes,
    parse: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([defaultParseShape, customParseShape]),
    ),
  };

  static defaultProps = {
    parse: null,
  };

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  getPatterns() {
    return this.props.parse.map((option) => {
      const {type, ...patternOption} = option;
      if (type) {
        if (!PATTERNS[type]) {
          throw new Error(`${option.type} is not a supported type`);
        }
        patternOption.pattern = PATTERNS[type];
      }

      return patternOption;
    });
  }

  getParsedText() {
    if (!this.props.parse)                       { return this.props.children; }
    if (typeof this.props.children !== 'string') { return this.props.children; }

    const textExtraction = new CustomTextExtraction(this.props.children, this.getPatterns());

    return textExtraction.parse().map((props, index) => {
      return (
        <ReactNative.Text
          key={`parsedText-${index}`}
          {...props}
        />
      );
    });
  }

  render() {
    let htmlText = '<p>' + this.props.children + '</p>'
    return (
      <HTMLView
        ref={ref => this._root = ref}
        value={htmlText}
        stylesheet={baseStyles}
        {...this.props}
      />
    );
  }
}

const baseStyles = ReactNative.StyleSheet.create({
  b: {fontWeight: '500', fontSize: 17*widthScale},
  strong: {fontWeight: '500', fontSize: 17*widthScale},
  i: {fontStyle: 'italic', fontSize: 17*widthScale},
  em: {fontStyle: 'italic', fontSize: 17*widthScale},
  pre: {fontFamily: 'Menlo', fontSize: 17*widthScale},
  code: {fontFamily: 'Menlo', fontSize: 17*widthScale},
  a: {fontWeight: '500',color: Colors.blue_link, fontSize: 17*widthScale},
  p: {color: Colors.black, fontSize: 17*widthScale},
  h1: {fontWeight: '500', fontSize: 36*widthScale},
  h2: {fontWeight: '500', fontSize: 30*widthScale},
  h3: {fontWeight: '500', fontSize: 24*widthScale},
  h4: {fontWeight: '500', fontSize: 18*widthScale},
  h5: {fontWeight: '500', fontSize: 14*widthScale},
  h6: {fontWeight: '500', fontSize: 12*widthScale},
})
export default CustomParsedText;
