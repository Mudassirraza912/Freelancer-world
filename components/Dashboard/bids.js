import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, Icon, Avatar, Card, Button, Image, ListItem, Input } from 'react-native-elements';
import firebase from "../../config/firebase"


export default class Bids extends React.Component {
    constructor() {
        super()
        this.state = {
            offers: [],
            sendMsg: false,
            msgText: '',
            selectedObj: ''
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    static navigationOptions = {
        drawerLabel: 'Bids',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: 'send',color: "black", type: 'font-awesome' }} />
        }
    }

    sendMessage() {
        const {selectedObj, msgText} = this.state
        var obj = {
            senderId: selectedObj.senderId,
            revieverId: selectedObj.revieverId,
            text: msgText,
            postKey: selectedObj.key,
            senderPhotoUrl : selectedObj.photoUrl,
            revieverPhotoUrl:selectedObj.revieverPhotoUrl,
            senderName: selectedObj.name,
            revieverName : selectedObj.revieverName
        }
        // console.log("sendMessage sendMessagesendMessage sendMessage",obj)
        firebase.database().ref("/Chatroom/").push(obj)
        this.setState({
            sendMsg:false,
            text:''
        })
    }

    componentWillMount() {
        const { offers } = this.state
        firebase.database().ref("/Proposals/").on("child_added", snap => {
            var offer = snap.val()
            if (offer.senderId == firebase.auth().currentUser.uid) {
                console.log("componentWillMount componentWillMount componentWillMount", snap)
                var data1 = { key: snap.key, ...offer }
                offers.push(data1)
                this.setState({
                    offers
                })
            }

        })
    }

    render() {
        const { offers, sendMsg } = this.state
        console.log("sendMsg sendMsg sendMsg  sendMsg",sendMsg)
        return (
            <ScrollView>
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { this.props.navigation.toggleDrawer() } }}
                        // centerComponent={<Button title="See Projects" onPress={() => { console.log("FORM FORM FORM FORM") }} />}
                        centerComponent={{ text: 'Freelancer World', style: { color: '#fff' } }}
                        rightComponent={<Avatar rounded
                            source={{
                                onPress: () => { this.props.navigation.navigate('Profile') },
                                uri:
                                    firebase.auth().currentUser.photoURL,
                            }} />
                        }
                    />
                </View >
                {!sendMsg ?
                    <View>
                        {offers.length > 0 ?
                            <View>
                                {offers.map((value, index) => {
                                    // console.log("value value value value", value)
                                    return <Card>
                                        <ListItem
                                            key={index}
                                            leftAvatar={{ source: { uri: value.photoURL } }}
                                            title={value.revieverName}
                                            subtitle={value.revieverName}
                                        />
                                        <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Job Description: </Text>
                                            {value.coversLetter}
                                        </Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Price: </Text>
                                            {value.price}
                                        </Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Status: </Text>
                                            {value.status}
                                        </Text>
                                        {/* {value.status === "Accept" && */}
                                        {/* <Button
                                            // icon={<Icon name='profile' color='#ffffff' />}
                                            onPress={() => {this.setState({sendMsg: true, selectedObj: value })}}
                                            backgroundColor='#03A9F4'
                                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                            title='Send Message' /> */}
                                        {/* } */}
                                    </Card>
                                })}
                            </View>
                            :
                            <View style={styles.container}>
                                <Text>You Have'nt send any Proposals.....</Text>
                            </View>}
                    </View> :
                    <View style={styles.container}>
                        <Input
                            placeholder='write a message.....'
                            shake={true}
                            label="Message"
                            onChange={(e) => { this.setState({ msgText: e.nativeEvent.text }) }}
                        />
                        <Button icon={<Icon name= 'send' color = "white" type= 'font-awesome' />} style={{marginTop: 90}} onPress={this.sendMessage}/>
                        {/* <Text>ksdfhisdghisdaf</Text> */}
                    </View>}
            </ScrollView>
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