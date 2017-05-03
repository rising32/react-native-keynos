// BASIC COMPONENTS
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, ListView, AsyncStorage } from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import { ConversationCell } from 'keynos_app/src/widgets/'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

class Conversations extends Component {
  componentWillMount() {
    this.props.getConversationsList()
  }

  renderRow(rowData: object, sectionID: number, rowID: number) {
		return(
			<ConversationCell data={rowData} onPress={ () => this.props.onConversationPress(rowData) }/>
		)
	}

  render() {
    //console.log('list',this.props.list)
    let list = this.props.list ? this.props.list : []
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
					renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    list: state.conversations.conversationsList,
    token: state.login.token,
    company: state.company,
    id: state.company.id,
    name: state.company.name,
    logo: state.company.logo,
    login_type: state.company.login_type,
    main_color: state.company.main_color,
    bg_image: state.company.bg_image,
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    getConversationsList: () => {
      dispatch(ConversationsActions.getConversationsList())
    },

    setUserDefault: () => {
      dispatch(LoginActions.setUserDefault())
    },

    onConversationPress: (conversation) => {
      dispatch(ConversationsActions.initConversation(conversation))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
