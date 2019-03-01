import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import firebase from '../../config/firebase'
import { SocialIcon, Header, Image } from "react-native-elements";


export default class Phone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: '',
            currentLocation:'',
            isShow: ''
        }
        this.submitData = this.submitData.bind(this)
        this._getLocationAsync = this._getLocationAsync.bind(this)
    }

    componentWillMount() {
        this._getLocationAsync()
    }

    componentDidMount() {
        setTimeout(() => {this.setState({isShow:true})}, 10000);
      }

    _getLocationAsync = async () => {
        let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Expo.Location.getCurrentPositionAsync({});
        this.setState({ currentLocation : location });
        console.log("phppoppj", location)
      }; 

    submitData() {
        const { data, currentUsers } = this.props
        const { number, currentLocation } = this.state
        // console.log("DATAAAAAA",data.providerData,"klsdjdf", data.user.providerData[0],"klsdjdf")

        var Obj = {
            phoneNo: number,
            lat : currentLocation.coords.latitude,
            lang: currentLocation.coords.longitude,
            uid: firebase.auth().currentUser.uid,
            name: data.providerData[0].displayName,
            photoURL: data.providerData[0].photoURL,
            email: data.providerData[0].email

        }
        // console.log("OBJBJOBJOBJ",Obj)

        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/Profile/').push(Obj)
        firebase.database().ref('/Users/').push(Obj)
       currentUsers(Obj)
    }

    render() {
        const { number, isShow } = this.state
        return (
            <View>
                {isShow ? <View>
                <Text>Your Phone Number</Text>
                <TextInput
                    style={{ height: 40, borderColor: '#3b5998', borderWidth: 1, borderRadius: 10 }}
                    placeholder="Enter Your Phone Number"
                    keyboardType = "phone-pad"
                    onChangeText={(text) => this.setState({ number: text })}
                />
                {number ? <Button title="Submit" onPress={this.submitData} /> :
                    <Button title="Submit" disabled onPress={this.submitData} />
                }
                </View> :  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../assets/oxygen-loader.gif')}
              style={{ width: 100, height: 100, backgroundColor: "none", marginTop: 40}}
            />
          </View>}
            </View>
        )
    }
}