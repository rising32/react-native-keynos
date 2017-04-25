import {View, TextInput, StyleSheet, Text, Image, Dimensions} from 'react-native'
import React, {Component} from 'react'

import {Colors} from 'keynos_app/src/commons/Commons'

export default class InputValidate extends Component {
	renderCorrection() {
		let imageSource=require('keynos_app/src/resources/correctionnook.png')
		if (!this.props.incorrect) {
			imageSource=require('keynos_app/src/resources/correctionok.png')
		}
		if (this.props.needCorrection) {
			return(
				<Image style={{height: 9, width: 9}} source={imageSource} />
			)
		} else {
			return null
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
					<Image source={this.props.icon} style={{height: 24, width: 24, marginRight: 10}} resizeMode={'contain'} />
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
  					onChangeText={this.props.onChangeText} />
				<View />
				<View style={{marginLeft: 5}} />
					{this.renderCorrection()}
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
    height: 40,
    alignItems: 'center',
		paddingHorizontal: 15
  },
	inputStyle: {
    color: Colors.gray_info,
    fontSize: 12,
    flex: 1,
    flexDirection: 'column',
  },
	placeholderStyle: {
    color: Colors.gray_placeholder,
    fontSize: 12,
    flex: 1,
    flexDirection: 'column',
  },
  labelStyle: {
		color: Colors.black,
    fontSize: 12,
		marginBottom: 5
  },
	errorStyle: {
		color: Colors.red_error,
    fontSize: 10,
		textAlign: 'right',
  },
})
