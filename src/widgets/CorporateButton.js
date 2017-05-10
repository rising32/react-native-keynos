import React from 'react';
import {TouchableOpacity, Text, Platform, Dimensions, Image, View} from 'react-native';
import {Colors, Utils} from 'keynos_app/src/commons/Commons'

import _ from 'lodash'

// REDUX
import { connect } from 'react-redux'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class CorporateButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      androidBgImagesArray: [],
    }
  }

  componentWillMount() {
    if(Platform.OS !== 'ios') {
      this.getAndroidBgImages(this.props.bg_image)
    }
  }

  _onPress() {
    this.props.onPress && this.props.onPress()
  }

  getAndroidBgImages(bgImage) {
    // For background image repeat on android
    let images = []
    let verticalViews = []

    let totalWidth = Dimensions.get('window').width
    let totalHeight = Dimensions.get('window').height

    Image.getSize(bgImage, (width, height) => {

      let imageWidth = Math.ceil(height * 120 / width)

      for(var i=0; i < Math.ceil(totalWidth/imageWidth); i++){
        images.push((
           <Image key={'i'+i} source={{uri: bgImage}} style={{width: imageWidth, height: imageWidth, backgroundColor: this.props.main_color, opacity: 0.2}} />
        ))
      }

      for(var i=0; i < Math.ceil(totalHeight/imageWidth); i++){
        verticalViews.push((
          <View key={'v'+i} style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            { _.map(images, img => {
             return img;
            })}
          </View>
        ))
      }

      this.setState({androidBgImagesArray: verticalViews})
    })
  }

  render() {
    if(this.props.bg_image) {
      if(Platform.OS === 'ios') {
        return(
          <TouchableOpacity
            style={{backgroundColor: this.props.main_color, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12*widthScale, marginHorizontal: 20*widthScale, marginVertical: 10*heightScale}}
            onPress={() => this._onPress()}
          >
            <Image style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: this.props.main_color, opacity: 0.2 }} source={ bgImage } resizeMode={'repeat'} />
            <Text style={{color: this.props.color ? this.props.color : Colors.white, fontSize: 17*widthScale}}>{ this.props.label }</Text>
          </TouchableOpacity>
        )
      } else {
        return(
          <TouchableOpacity
            style={{backgroundColor: this.props.main_color, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12*widthScale, marginHorizontal: 20*widthScale, marginVertical: 10*heightScale}}
            onPress={() => this._onPress()}
          >
            <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'transparent'}}>
              { _.map(this.state.androidBgImagesArray, img => {
               return img;
              })}
            </View>
            <Text style={{color: this.props.color ? this.props.color : Colors.white, fontSize: 17*widthScale}}>{ this.props.label }</Text>
          </TouchableOpacity>
        )
      }
    } else {
      return(
        <TouchableOpacity
          style={{backgroundColor: this.props.main_color, alignItems: 'center', justifyContent: 'center', borderRadius: 3, padding: 12*widthScale, marginHorizontal: 20*widthScale, marginVertical: 10*heightScale}}
          onPress={() => this._onPress()}
        >
          <Text style={{color: this.props.color ? this.props.color : Colors.white, fontSize: 17*widthScale}}>{ this.props.label }</Text>
        </TouchableOpacity>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return {
    main_color: state.company.main_color,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateButton)
