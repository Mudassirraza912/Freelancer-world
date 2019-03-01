import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import firebase from '../../config/firebase'
import {SocialIcon} from 'react-native-elements'


export default class LoginWithGoogle extends React.Component {
  constructor(props) {
    super(props)


    this.login = this.login.bind(this)
  }


  async login() {
    const { data, user } = this.props

    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "584873749915-q4mbop51p9bvuivvr4qhnhg034e53a3j.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            // user res, create your user, do whatever you want
            data(res.user)
            firebase.database().ref('/' + firebase.auth().currentUser.uid + '/').on("child_added", userSnap => {
              // console.log(userSnap)
              user(userSnap)
            })
            // console.log("GOGOGOGOgogogogogo", res)
          })
          .catch(error => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  }

  render() {
    // console.log(firebase.auth().currentUser.uid)
    return (
      // <View>
      //   <Button onPress={this.login} title="Login With Google"/>
      // </View>\

      <View>
        <SocialIcon
          title='Sign In With Google'
          button
          type='google'
          onPress={this.login}
          style={{ width: 600, backgroundColor: "black" }}
        />
      </View>
    );
  }
}






