// BASIC COMPONENTS
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, ListView, AsyncStorage } from 'react-native'

// COMPONENTS
import { Actions } from 'react-native-router-flux'
import { Colors, Utils } from 'keynos_app/src/commons/Commons'
import { ConversationCell } from 'keynos_app/src/widgets/'
import Spinner from 'react-native-spinkit'

// REDUX
import { connect } from 'react-redux'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'
import * as ConversationsActions from 'keynos_app/src/redux/actions/Conversations'

// MULTILENGUAJE
import multiStrings from 'keynos_app/src/commons/Multistrings'

const widthScale = Utils.widthScale()
const heightScale = Utils.heightScale()

class Conversations extends Component {

  componentWillMount() {
    this.props.getConversationsList()
  }

  renderRow(rowData: object, sectionID: number, rowID: number) {
    let onPressCell = this.props.isFetching ? null : () => this.props.onConversationPress(rowData)
		return(
			<ConversationCell data={rowData} onPress={ onPressCell }/>
		)
	}

  renderHeader() {
    if(this.props.isFetching) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.gray_placeholder}} >
          <Spinner type={'ThreeBounce'} size={40} color={this.props.main_color} />
        </View>
      )
    }
  }

  renderFooter() {
    if(this.props.list && !this.props.list.length) {
      return(
        <View style={{flex: 1, alignItems: 'center', marginHorizontal: 20*widthScale, marginVertical: 20*heightScale}} >
          <Text style={{fontSize: 20, color: this.props.main_color, textAlign: 'center'}} >{multiStrings.noConversations}</Text>
        </View>
      )
    }
  }

  render() {
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
          renderHeader={this.renderHeader.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
        />
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    list: state.conversations.conversationsList,
    isFetching: state.conversations.isFetching,
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

    onConversationPress: (conversation) => {
      dispatch(ConversationsActions.initConversation(conversation))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
