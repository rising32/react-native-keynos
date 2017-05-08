import {View, TextInput, StyleSheet, Text, Image, Dimensions} from 'react-native'
import React, {Component} from 'react'

import {Colors, Utils} from 'keynos_app/src/commons/Commons'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

export default class InputValidate extends Component {

	renderCorrection() {
		if (this.props.needCorrection) {
			return(
				<View style={{ marginHorizontal: 5*widthScale, height: 12*widthScale, width: 12*widthScale, borderRadius: 6*widthScale, backgroundColor: this.props.incorrect ? Colors.red_error : Colors.green_light }} />
			)
		} else {
			return null
		}
	}

	renderImage() {
		if(this.props.icon) {
			return(
				<Image source={this.props.icon} style={{height: 24*widthScale, width: 24*widthScale, marginRight: 10*widthScale}} resizeMode={'contain'} />
			)
		}
	}

	render(){
		let colorTextCorrection=Colors.red_error
		let colorBorderCorrection=Colors.red_error
		if (!this.props.incorrect) {
			colorTextCorrection=Colors.black
			colorBorderCorrection=Colors.gray_placeholder
		}

	  return (
      <View style={{}}>
        <Text style={[Styles.labelStyle, {color: colorTextCorrection}]}>{this.props.label}</Text>
  			<View style={[Styles.viewInputStyle, {borderColor: colorBorderCorrection}]}>

					{ this.renderImage() }

					<TextInput
  					style={Styles.inputStyle}
  					value={this.props.value}
						editable = {this.props.editable}
						autoCorrect={false}
						keyboardType={this.props.keyboardType}
						autoCapitalize={this.props.autoCapitalize}
  					underlineColorAndroid={'transparent'}
						placeholder={this.props.placeholder}
  					placeholderStyle={Styles.placeholderStyle}
  					secureTextEntry={this.props.secureTextEntry}
  					keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
  					onChangeText={this.props.onChangeText}
					/>

					{ this.renderCorrection() }

  			</View>
				<Text style={Styles.errorStyle}>{this.props.errorlabel}</Text>
      </View>
		)
	}
}

const Styles = StyleSheet.create({
	viewInputStyle: {
		flexDirection: 'row',
    borderColor: Colors.gray_placeholder,
    borderWidth: 1,
		borderRadius: 5,
    alignItems: 'center',
		paddingHorizontal: 15*widthScale,
		height: 50*heightScale,
  },
	inputStyle: {
    color: Colors.gray_info,
    fontSize: 17*widthScale,
    flex: 1,
    flexDirection: 'column',
  },
	placeholderStyle: {
    color: Colors.gray_placeholder,
    fontSize: 17*widthScale,
    flex: 1,
    flexDirection: 'column',
  },
  labelStyle: {
		color: Colors.black,
    fontSize: 12*widthScale,
		marginBottom: 5*heightScale
  },
	errorStyle: {
		color: Colors.red_error,
    fontSize: 12*widthScale,
		textAlign: 'right',
  },
})
