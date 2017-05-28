import React from 'react';
import ReactNative from 'react-native';

import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import CustomTextExtraction from './CustomTextExtraction';
import HTMLView from 'react-native-htmlview';

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class CustomParsedText extends React.Component {

  render() {
    let htmlText = '<p>' + this.props.children + '</p>'
    let fontColor = this.props.position == "right" ? Colors.white : Colors.gray_text

    let baseStyles = ReactNative.StyleSheet.create({
      b: {fontWeight: '500', fontSize: 17*widthScale},
      strong: {fontWeight: '500', fontSize: 17*widthScale},
      i: {fontStyle: 'italic', fontSize: 17*widthScale},
      em: {fontStyle: 'italic', fontSize: 17*widthScale},
      pre: {fontFamily: 'Menlo', fontSize: 17*widthScale},
      code: {fontFamily: 'Menlo', fontSize: 17*widthScale},
      a: {fontWeight: '500', color: Colors.blue_link, fontSize: 17*widthScale},
      p: {color: Colors.black, fontSize: 17*widthScale, color: fontColor},
      h1: {fontWeight: '500', fontSize: 36*widthScale},
      h2: {fontWeight: '500', fontSize: 30*widthScale},
      h3: {fontWeight: '500', fontSize: 24*widthScale},
      h4: {fontWeight: '500', fontSize: 18*widthScale},
      h5: {fontWeight: '500', fontSize: 14*widthScale},
      h6: {fontWeight: '500', fontSize: 12*widthScale},
    })

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

export default CustomParsedText;
