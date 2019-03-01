import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import {Header, Icon, Avatar, Card,Button, Image, ListItem} from 'react-native-elements';
import firebase from "../../config/firebase"
import Services from '../Dashboard/services'
import Projects from '../Dashboard/projects'


export default class Home extends React.Component {
    constructor(props) {
        super(props)
     this.state ={
        services:[],
        currentUser: firebase.auth().currentUser.uid
        }
        this.isShow = this.isShow.bind(this)
    }

    // static navigationOptions = {
    //     drawerLabel : 'Home',
    //     drawerIcon : ({tintcolor}) => {
    //       return  <Icon name='home' />
    //     }
    // }

    componentWillMount() {
        const {services, currentUser} = this.state
        firebase.database().ref('/Services/').on("child_added", (snap) => {
            var servic = snap.val()
            if (servic.uid == currentUser) {
                var data1 = {key:snap.key, ...servic}
            services.push(data1)
            // data.push(services)
            this.setState({
                services
            })
            }
            
        })
    }

    static navigationOptions = {
        drawerLabel: 'My Gigs',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: 'home', color: "black", type: 'font-awesome' }} />
        }
    }


    isShow(e) {
        this.setState({
            service : e
        })
    }


    render() {
        const {services} = this.state
        return (
            <ScrollView >
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { this.props.navigation.toggleDrawer() } }}
                        // centerComponent={<Button title="See Projects" onPress={() => { console.log("FORM FORM FORM FORM") }} />}
                        centerComponent={{ text: 'Freelancer World', style: { color: '#fff' } }}
                        rightComponent={<Avatar rounded
                            source={{
                                onPress: () => {this.props.navigation.navigate('Profile')},
                                uri:
                                    firebase.auth().currentUser.photoURL,
                            }} />
                        }
                    />
                </View >

                <View style={styles.container}>
                {services.length > 0 ? <View>
                            {services.map((value, index) => {
                                console.log(value)
                                return <Card>
                                  <ListItem
                                            key={index}
                                            leftAvatar={{ source: { uri: value.photoURL } }}
                                            title={value.name}
                                            subtitle={value.name}
                                        />
                                    <Text style={{ marginBottom: 10 }}>
                                        <Text style={{ fontWeight: "bold" }}>Title: </Text>
                                        {value.title}
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        <Text style={{ fontWeight: "bold" }}>Details: </Text>
                                        {value.detail}
                                    </Text>
                                    <Image source={{ uri: value.urls }} style={{ width: 350, height: 200 }} />
                                    <Button
                                        // icon={<Icon name='profile' color='#ffffff' />}
                                        onPress={() => { console.log('hasfguhfjsdghfasdghfsdgh') }}
                                        backgroundColor='#03A9F4'
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Delete Proposals' />
                                </Card>
                            })}
                        </View>
                            :
                            <View>
                                <Text>
                                    Gigs not founds please add some services
                            </Text>
                            </View>}
                </View>
            </ScrollView>
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
