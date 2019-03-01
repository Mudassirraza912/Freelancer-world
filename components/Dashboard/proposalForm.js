import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Avatar, Header, Button, Input, Card, Icon, Image, ListItem } from 'react-native-elements'
import firebase from '../../config/firebase'

export default class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            coversLetter: '',
            price: ''
        }
        this.submit = this.submit.bind(this)
    }

    submit() {
        const { hide, obj } = this.props
        const {price, coversLetter} = this.state
        var object = {
            postKey : obj.key,
            revieverId:obj.uid,
            senderId: firebase.auth().currentUser.uid,
            photoUrl: firebase.auth().currentUser.photoURL,
            revieverPhotoUrl: obj.photoURL,
            name: firebase.auth().currentUser.displayName,
            revieverName: obj.name,
            coversLetter : coversLetter,
            price : price,
            status: "Pending"
        }
        firebase.database().ref("/Proposals/").push(object)
        hide()
    }


    render() {
        const { hide, obj } = this.props
        return (
            <View style={styles.container}>
                <Button style={{ marginTop: 20 }} icon={<Icon name="keyboard-arrow-left" />} title="Back" onPress={() => { hide() }} />
                <Input
                    placeholder='Covers letter.....'
                    shake={true}
                    label="Covers Letter"
                    onChange={(e) => { this.setState({ coversLetter: e.nativeEvent.text }) }}
                />
                <Input
                    placeholder='Enter Suitable rate.....'
                    shake={true}
                    keyboardType="phone-pad"
                    label="Price"
                    onChange={(e) => { this.setState({ price: e.nativeEvent.text }) }}
                />
                <Button title="Submit" onPress={this.submit} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
});
