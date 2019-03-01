import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { Permissions, Contacts } from "expo"
import { Icon, Avatar, Header, ListItem, Image,  Card, Button} from 'react-native-elements'
import firebase from "../../config/firebase"

export default class ContactList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: [],
      users: [],
      isShow: false,
      profile: false,
      profileData: ''
    }
  }

  static navigationOptions = {
    drawerLabel: 'Contact',
    drawerIcon: ({ tintColor }) => {
      return <Avatar icon={{ name: 'address-book', color: "black", type: 'font-awesome' }} />
    }
  }

  fetchProfle(uid) {
    firebase.database().ref('/' + uid + '/Profile/').on('child_added', snap => {
      var data = snap.val()
      console.log("data data datadata data data ", data)
      this.setState({
        profileData: data,
        profile: true
      })
    })
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ isShow: true }) }, 10000);
  }

  componentWillMount() {
    const { users } = this.state
    this.getCOntacts()
    firebase.database().ref("/Users/").on("child_added", snap => {
      var data = snap.val()

      // var dataArr = []
      users.push(data)
      // console.log("adnsndmdsmnmdms", users)

      this.setState({
        users
      })

    })
  }
  async getCOntacts() {
    const { contactList } = this.state
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.')
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
        Contacts.EMAILS
      ]
    })
    if (data.length > 0) {
      alert(`${data.length} no of Contact`)
      data.map((value) => {
        // console.log("nsdsnkdnksn", value.name, value.phoneNumbers[0].number)
        // var obj = {
        //   name: value.name,
        //   phoneNumber: value.phoneNumbers[0].number
        // }
        contactList.push(value.phoneNumbers[0].number)
        this.setState({
          contactList,
        })
      })

    }



  }
  render() {
    const { contactList, users, isShow, profile, profileData } = this.state
    console.log("DAADADADADADADDDA", profileData)
    return (
      <View>
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

       {!profile ?
       <View>
        {isShow ?
          <View>
            {users.map((value, index) => {
              return <View>
                <View>
                  {contactList.includes(value.phoneNo) &&
                    <View>

                      <View>
                        <ListItem onPress={this.fetchProfle.bind(this, value.uid)}
                          key={index}
                          leftAvatar={{ source: { uri: value.photoURL } }}
                          title={value.name}
                          subtitle={value.name}
                        />
                      </View>
                    </View>}
                </View>
              </View>

            })}
          </View>
          :
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/oxygen-loader.gif')}
              style={{ width: 100, height: 100, backgroundColor: "none", marginTop: 40}}
            />
          </View>}
          </View>  : 
        
        <View>
          <Button title="Back" onPress={() => {this.setState({profile: false, profileData:''})}}/>
          <Card>
                                       <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Name: </Text>
                                            {profileData.name}
                                        </Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Phone Number: </Text>
                                            {profileData.phoneNo}
                                        </Text>
                                        <Image source={{ uri: profileData.photoURL }} style={{ width: 300, height: 200 }} />
                                    </Card>
        </View>}


      </View>
    )
  }

}


// if(value.phoneNumber === val.phoneNo) {
//   return(
//     <View>
//       <Text>{value.name}</Text>
//     </View>
//   )

// }