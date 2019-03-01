import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import LoginWithFacebook from './components/Login/LoginwithFacebook'
import LoginWithGoogle from './components/Login/LoginwithGoogle'
import Phone from './components/Login/phone'
import Navigator from './components/Navigator/navigator'
import firebase from './config/firebase'
import { Header, Icon, Avatar } from 'react-native-elements'
import { Permissions, Contacts } from "expo"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: '',
      currentUsers: '',
      contactList: '',
      isUser: false
    }
    this.userData = this.userData.bind(this)
    this.users = this.users.bind(this)
    this.logOut = this.logOut.bind(this)

  }

  componentWillMount() {
  }

  componentDidMount() {
    // console.log(firebase.auth().currentUser.uid)
    firebase.auth().onAuthStateChanged((use) => {
      // console.log("USERUSERUERUSERUR+E", use)
      this.setState({
        isUser: use
      })
    })
  }

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='home' />
    ),
  };

  userData(e) {
    this.setState({
      userData: e
    })
  }


  users(e) {
    this.setState({
      currentUsers: e
    })
  }

  logOut() {
    this.setState({
      currentUsers: "",
      userData: ""
    })
  }

  render() {
    const { userData,currentUsers, isUser, } = this.state
    return (
      <View style={{ flex: 1 }}>
        { !currentUsers && <View>
          <Header
            centerComponent={{ text: 'Freelancer World', style: { color: '#fff', fontWeight: "bold" } }}
          />
        </View >}
        { !currentUsers && <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {!userData && <LoginWithGoogle data={this.userData} user={this.users}/>}
          {!userData && <LoginWithFacebook data={this.userData} user={this.users} contact={this.state.contactList} />}
          {!!userData &&  <Phone data={userData} currentUsers={this.users} />}
        </View>}
        {!!currentUsers && <Navigator out={this.logOut} />}
      </View>
    );
  }
}


