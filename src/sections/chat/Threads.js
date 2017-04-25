// BASIC COMPONENTS
import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, ListView} from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'
import {ConversationCell} from 'keynos_app/src/widgets/'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Threads extends Component {
  renderRow(rowData: object, sectionID: number, rowID: number) {
		return(
			<ConversationCell data={rowData} onPress={() => Actions.Chat()}/>
		)
	}

  render() {
    let list = this.props.list ? this.props.list : [{}, {}, {}]
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(list);

    return (
      <View style={{flex: 1}}>
        <ListView
					style={{flex: 1}}
					bounces={false}
					contentContainerStyle={{}}
					dataSource={dataSource}
					enableEmptySections={true}
					renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    id: state.company.id,
    name: state.company.name,
    logo: state.company.logo,
    main_color: state.company.main_color
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    login: (email, password) => {
      dispatch(LoginActions.login(email, password));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Threads)
