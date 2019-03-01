import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, Icon, Avatar, Card, Button, Image, ListItem, Input} from 'react-native-elements';
import firebase from "../../config/firebase"


export default class Offers extends React.Component {
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

    componentWillMount() {
        const { offers } = this.state
        firebase.database().ref("/Proposals/").on("child_added", snap => {
            var offer = snap.val()
            if (offer.revieverId == firebase.auth().currentUser.uid) {
                var data1 = { key: snap.key, ...offer }
                offers.push(data1)
                this.setState({
                    offers
                })
            }

        })
    }

    sendMessage() {
        const { selectedObj, msgText } = this.state
        var obj = {
            senderId: selectedObj.revieverId,
            revieverId: selectedObj.senderId,
            text: msgText,
            postKey: selectedObj.key,
            senderPhotoUrl: selectedObj.revieverPhotoUrl,
            revieverPhotoUrl: selectedObj.photoUrl,
            senderName: selectedObj.revieverName,
            revieverName: selectedObj.name
        }
        // console.log("sendMessage sendMessagesendMessage sendMessage", obj)
        firebase.database().ref("/Chatroom/").push(obj)
        this.setState({
            sendMsg: false,
            text: ''
        })
    }


    AccEpt(e, index) {
        const { offers } = this.state
        console.log(e.key, index)
        firebase.database().ref('/Proposals/' + e.key + '/').update({ status: 'Accept ' })
        offers[index].status = 'Accept'
        this.setState({
            offers,
        })

        var obj = {
            senderId: e.revieverId,
            revieverId: e.senderId,
            text:'',
            postKey: e.key,
            senderPhotoUrl: e.revieverPhotoUrl,
            revieverPhotoUrl: e.photoUrl,
            senderName: e.revieverName,
            revieverName: e.name
        }

        firebase.database().ref('/Chatroom/').push(obj)

    }


    Reject(e, index) {
        const { offers } = this.state
        console.log(e, index)
        firebase.database().ref('/Proposals/' + e.key + '/').update({ status: 'Reject' })
        offers[index].status = 'Reject'
        this.setState({
            offers,
        })

    }


    static navigationOptions = {
        drawerLabel: 'Offers',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: 'buysellads',color: "black", type: 'font-awesome' }} />
        }
    }

    render() {
        const { offers, sendMsg } = this.state
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
                                    console.log(value)
                                    return <Card>
                                        <ListItem
                                            key={index}
                                            leftAvatar={{ source: { uri: value.photoURL } }}
                                            title={value.name}
                                            subtitle={value.name}
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
                                        {/* <Image source={{ uri: value.urls }} style={{ width: 350, height: 200 }} /> */}

                                        {value.status == "Pending" &&
                                            <View>
                                                <Button
                                                    // icon={<Icon name='profile' color='#ffffff' />}
                                                    onPress={this.AccEpt.bind(this, value, index)}
                                                    backgroundColor='#03A9F4'
                                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                                    title='Accept' />
                                                <Button
                                                    // icon={<Icon name='profile' color='#ffffff' />}
                                                    onPress={this.Reject.bind(this, value, index)}
                                                    backgroundColor='#03A9F4'
                                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                                    title='Reject' />
                                            </View>}
                                           
                                    </Card>
                                })}
                            </View>
                            :
                            <View style={styles.container}>
                                <Text>No Offers yet.....</Text>
                            </View>}

                    </View> :
                    <View style={styles.container}>
                        <Input
                            placeholder='write a message.....'
                            shake={true}
                            label="Message"
                            onChange={(e) => { this.setState({ msgText: e.nativeEvent.text }) }}
                        />
                        <Button icon={<Icon name='send' color="white" type='font-awesome' />} style={{ marginTop: 90 }} onPress={this.sendMessage} />
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