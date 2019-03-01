import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import firebase from '../../config/firebase'
import { SocialIcon, Header } from "react-native-elements";

export default class LoginWithFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.login = this.login.bind(this)
  }

  async login() {
    const { data, user } = this.props
    // console.log(this.props)
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('345818649362013', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
          .then((succes) => {
            data(succes)
            firebase.database().ref('/' + firebase.auth().currentUser.uid + '/').on("child_added", userSnap => {
              console.log(userSnap)
              user(userSnap)
            })
            // console.log('success', succes)
          })
          .catch((error) => {
            // Handle Errors here.
          });

        const response = await fetch(`https://graph.facebook.com/me?feilds=id,name,email,birthday&access_token=${token}`);
        const userObj = await response.json()
        Alert.alert('Logged in!', `Hi ${userObj.name}!`);
        // console.log("NEWWW", userObj)
        // console.log("UIUIUIUIUIUIUIUIIUD",firebase.auth().currentUser.uid)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }



  render() {
    // console.log(firebase.auth().currentUser.uid)
    return (
      <View>
        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          onPress={this.login}
          style = {{width : 600}}
        />
      </View>
    );
  }
}