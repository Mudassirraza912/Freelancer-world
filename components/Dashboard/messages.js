import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Header, Icon, Avatar, Card, Button, Image, ListItem, Input } from 'react-native-elements';
import firebase from "../../config/firebase"

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedId: '',
            messages: [],
            users: [],
            renderUid: [],
            currentUser: firebase.auth().currentUser.uid,
            currentUserName: firebase.auth().currentUser.displayName,
            currentUserPhotoUrl: firebase.auth().currentUser.photoURL,
            selectedName: '',
            selectedPhotoUrl: '',
            msgText: ''
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const { renderUid, currentUser, users } = this.state
        firebase.database().ref("/Chatroom/").on("child_added", snap => {
            var snapData = snap.val()

            if (snapData.revieverId == currentUser) {
                // console.log("componentWillMount componentWillMount componentWillMount", user) 
                // var data1 = { key: snap.key, ...user }
                // if(renderUid.includes(snapData.senderId) == false) {

                // renderUid.push(snapData.senderId)
                renderUid.push(snapData)
                this.setState({
                    renderUid
                })
                // }
            }

            if (snapData.senderId == currentUser) {
                // if(renderUid.includes(snapData.revieverId) == false) {

                // renderUid.push(snapData.revieverId)
                renderUid.push(snapData)
                this.setState({
                    renderUid
                })
                // }
            }



        })

    }



    sendMessage() {
        const { selectedId, msgText, selectedName, selectedPhotoUrl, currentUser, currentUserName, currentUserPhotoUrl } = this.state
        var obj = {
            senderId: currentUser,
            revieverId: selectedId,
            text: msgText,
            // postKey: selectedObj.key,
            senderPhotoUrl: currentUserPhotoUrl,
            revieverPhotoUrl: selectedPhotoUrl,
            senderName: currentUserName,
            revieverName: selectedName
        }
        // console.log("sendMessage sendMessagesendMessage sendMessage",obj)
        firebase.database().ref("/Chatroom/messages").push(obj)
        this.setState({
            sendMsg: false,
            text: '',
            msgText: ''
        })
    }


    // componentDidMount() {
    //     const { users, selectedId, currentUser, renderUid } = this.state
    //     // console.log("componentDidMount componentDidMount componentDidMount componentDidMount ",renderUid)
    //     firebase.database().ref("/Users/").on("child_added", snap => {
    //             var user = snap.val()
    //                 var data1 = { key: snap.key, ...user }
    //             users.push(data1)
    //             this.setState({
    //                 users
    //             })
    //         })




    //     // if (user.revieverId == currentUser || user.senderId == currentUser) {
    //     //     console.log("componentWillMount componentWillMount componentWillMount", user)
    //     //     var data1 = { key: snap.key, ...user }
    //     //     users.push(data1)
    //     //     this.setState({
    //     //         users
    //     //     })
    //     // }
    // }

    fetchMessage(uid, name, photoURL) {
        const { users, selectedId, currentUser, renderName, messages } = this.state
        console.log("uid uid uid uid uid uid", uid, name, photoURL)

        firebase.database().ref("/Chatroom/messages").on("child_added", snap => {
            var msg = snap.val()
            msg.key = snap.key

            console.log("Condition Condition Condition Condition ", msg.revieverId == currentUser, msg.senderId == uid, msg.revieverId == currentUser, msg.senderId == uid)

            if (msg.revieverId == currentUser && msg.senderId == uid || msg.revieverId == uid && msg.senderId == currentUser) {
                // console.log("componentWillMount componentWillMount componentWillMount", msg, uid)

                messages.push(msg)
            }
        })

        console.log("messages messages messages messages", messages)

        this.setState({
            messages,
            selectedId: uid,
            selectedName: name,
            selectedPhotoUrl: photoURL
        })

    }


    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: "inbox", color: "black", type: 'font-awesome' }} />
        }
    }


    render() {
        const { users, selectedId, currentUser, renderUid, messages } = this.state
        // console.log("renderUid renderUid renderUid renderUid",messages)
        return (
            <View>
                <View>
                    <Header style={{position:'relative'}}
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


                <ScrollView>
                

                    {selectedId ?
                    <KeyboardAvoidingView behavior="position">
                        <View>
                            <Button title="Back" onPress={() => { this.setState({ selectedId: '', messages: [], selectedName: '', selectedPhotoUrl: '' }) }} />
                            {messages.length > 0 ?
                                <View style={{ marginTop: 40 }}>
                                    {messages.map((value, index) => {
                                        return <View style={{ bottom: 30 }}>
                                            {value.senderId == currentUser ?
                                            <ListItem
                                            key={index}
                                            rightAvatar={<Avatar rounded
                                                source={{
                                                    uri:
                                                        value.senderPhotoUrl,
                                                }} />}
                                            title={<Text style={{padding:10, borderRadius:4,  backgroundColor: '#439DD5', textAlign: "right", color: "white", marginLeft:10}}>{value.text}</Text>}
                                            // subtitle={value.text}
                                        />
                                                 :
                                                <ListItem
                                                    key={index}
                                                    leftAvatar={<Avatar rounded
                                                        source={{
                                                            uri:
                                                                value.senderPhotoUrl,
                                                        }} />}
                                                    title={<Text style={{width:'80%', backgroundColor:"#D5DBDB",marginRight:10,padding:10, borderRadius:4}}>{value.text}</Text>}
                                                    // subtitle={value.text}
                                                />
                                            }
                                        </View>
                                    })}

                                </View>
                                :
                                <View style={styles.container}><Text>No Messages</Text></View>}


{/* <KeyboardAvoidingView behavior="position" enabled> */}
                            <View style={{ bottom: 30 }}>
                                <Input
                                    placeholder='write a message.....'
                                    shake={true}
                                    label="Message"
                                    onChange={(e) => { this.setState({ msgText: e.nativeEvent.text }) }}
                                />
                                <Button icon={<Icon name='send' color="white" type='font-awesome' />}  onPress={this.sendMessage} />

                            </View>
                            {/* </KeyboardAvoidingView> */}

                        </View>
                    </KeyboardAvoidingView>
                        :

                        <View>
                            {renderUid.length > 0 ?
                                <View>
                                    {renderUid.map((value, index) => {
                                        if (value.senderId === currentUser) {
                                            return (<View>

                                                <View>
                                                    <ListItem
                                                        key={index}
                                                        leftAvatar={{ source: { uri: value.revieverPhotoUrl } }}
                                                        title={value.revieverName}
                                                        subtitle={value.text}
                                                    />
                                                    <Button title="Open Chat" onPress={this.fetchMessage.bind(this, value.revieverId, value.revieverName, value.revieverPhotoUrl)} />
                                                </View>
                                            </View>)
                                        }
                                        else if (value.revieverId === currentUser) {
                                            return <View>

                                                <View>
                                                    <ListItem
                                                        key={index}
                                                        leftAvatar={{ source: { uri: value.senderPhotoUrl } }}
                                                        title={value.senderName}
                                                        subtitle={value.text}
                                                    />
                                                    <Button title="Open Chat" onPress={this.fetchMessage.bind(this, value.senderId, value.senderName, value.senderPhotoUrl)} />
                                                </View>
                                            </View>
                                        }

                                    })
                                    }

                                </View>
                                :
                                <View style={styles.container}><Text>No Messages....</Text></View>}



                        </View>}
                </ScrollView>
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