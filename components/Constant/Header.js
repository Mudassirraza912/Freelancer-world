import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import {Header, Icon, Avatar} from 'react-native-elements';
import firebase from "firebase"

export default class NavHeader extends React.Component{
render() {
    return(
        <View>
            <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => {this.props.navigation.toggleDrawer()} }}
          centerComponent={{ text: 'Freelancer World', style: { color: '#fff' } }}
          rightComponent= { <Avatar rounded
            source={{
              uri:
                firebase.auth().currentUser.photoURL,
            }} /> }
        />
        </View>
    )
}
}