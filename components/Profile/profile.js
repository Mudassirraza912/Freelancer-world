import React from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';
import { Image, Text, Button } from 'react-native-elements';
import firebase from '../../config/firebase'
import NavHeader from '../Constant/Header'
import { Header, Icon, Avatar } from 'react-native-elements';

export default class Profile extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor}) => {
               return(
                   <Avatar icon={{name: 'user',color: "black", type: 'font-awesome'}} />
               )
        }

    }

    render() {
        return (
            <View >
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { this.props.navigation.toggleDrawer() } }}
                        // centerComponent={<Button  title="Logout" onPress={() => {firebase.auth().signOut()}}/>}
                        rightComponent={<Avatar rounded
                            source={{
                                uri:
                                    firebase.auth().currentUser.photoURL,
                            }} />}
                    />
                </View >
                <View style={styles.container}>
                    <Image
                        source={{ uri: firebase.auth().currentUser.photoURL }}
                        style={{ width: 200, height: 200 }}
                    />
                    <Text h4 style={{top:200}}>{firebase.auth().currentUser.displayName}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});