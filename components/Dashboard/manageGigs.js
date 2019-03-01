import React from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, StyleSheet, Picker } from 'react-native';
import { Avatar, Header, Button, Input, Card, Icon, Image, ListItem, Rating, AirbnbRating } from 'react-native-elements'
import { ImagePicker, MapView } from 'expo'
import firebase from '../../config/firebase'
import Bids from './bids'
import Form from './proposalForm'
// import { Select, Option, OptionList } from 'react-native-dropdown'
var url
var urlarr

export default class Gigs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myGigs: [],
            form: '',
            title: '',
            detail: '',
            category: 'frontend developer',
            location: '',
            url: '',
            propos: false,
            recieverId: '',
            gigObj: ''

        }
        this.hideForm = this.hideForm.bind(this)
        this._getLocationAsync = this._getLocationAsync.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentWillMount() {
        const { myGigs } = this.state
        firebase.database().ref('/Services/').on("child_added", (snap) => {
            var myGig = snap.val()
            var data1 = { key: snap.key, ...myGig }
            myGigs.push(data1)
            // data = [...snap.key]
            this.setState({
                myGigs
            })
        })

        this._getLocationAsync()
    }

    static navigationOptions = {
        drawerLabel: 'Services',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: 'server', color: "black", type: 'font-awesome' }} />
        }
    }

    ratingCompleted(e, rating) {
        console.log("Rating is: " + rating, e)
        firebase.database().ref('/Services/' + e + '/').update({ rating: rating })
    }

    hideForm() {
        this.setState({
            propos: false
        })
    }


    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };

    submit() {
        const { title, location, detail, category } = this.state
        var obj = {
            title: title,
            detail: detail,
            lat: location.coords.latitude,
            category: category,
            long: location.coords.longitude,
            urls: urlarr,
            photoURL: firebase.auth().currentUser.photoURL,
            uid: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.displayName,
            rating: 0
        }
        firebase.database().ref('/' + firebase.auth().currentUser.uid + '/myGigs/').push(obj)
        firebase.database().ref('/Services/').push(obj)
        this.setState({
            // step2: false,
            form: false
        })
        urlarr = ""
    }



    _getLocationAsync = async () => {
        let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Expo.Location.getCurrentPositionAsync({});
        this.setState({ location: location });
        // console.log(" this._getLocationAsync", location)
    };

    render() {
        const { myGigs, form, category, title, detail, location, url, propos, gigObj } = this.state
        // console.log("daddad", category, detail, title, location, url)
        // console.log("daddad", myGigs)
        return (
            <ScrollView>
                <View>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { this.props.navigation.toggleDrawer() } }}
                        centerComponent={<Button title="Add Services" onPress={() => { this.setState({ form: true }) }} />}
                        rightComponent={<Avatar rounded
                            source={{
                                uri:
                                    firebase.auth().currentUser.photoURL,
                            }} />}
                    />
                </View >
                {!propos &&
                    <View>
                        {!form ? <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                            {myGigs.length > 0 ? <View>
                                {myGigs.map((value, index) => {
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
                                            <Text style={{ fontWeight: "bold" }}>Category: </Text>
                                            {value.category}
                                        </Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>Details: </Text>
                                            {value.detail}
                                        </Text>
                                        <Image source={{ uri: value.urls }} style={{ width: 350, height: 200 }} />
                                        <Button
                                            // icon={<Icon name='profile' color='#ffffff' />}
                                            onPress={() => { this.setState({ propos: true, gigObj: value }), console.log(value.key, value) }}
                                            backgroundColor='#03A9F4'
                                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                            title='Send Proposals' />

                                        <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                                            Last Rating:
                                        </Text>
                                        <AirbnbRating
                                            count={5}
                                            reviews={["Terrible", "Bad", "Very Good", "Amazing", "Unbelievable"]}
                                            defaultRating={value.rating}
                                            onFinishRating={this.ratingCompleted.bind(this, value.key)}
                                            size={20}
                                        />

                                    </Card>
                                })}
                            </View>
                                :
                                <View>
                                    <Text>
                                        Gigs not founds please add some services
                            </Text>
                                </View>}
                        </View> :

                            <ScrollView>
                                {/* <KeyboardAvoidingView behavior="position" enabled> */}
                                <Button style={{ marginTop: 20 }} icon={<Icon color= "white" name="keyboard-arrow-left" />} title="Back" onPress={() => { this.setState({ form: false }) }} />
                                <View style={{ alignItems: "center", justifyContent: "center", padding: 40 }} >
                                    <Input
                                        placeholder='I can do something for you.....'
                                        shake={true}
                                        label="Title"
                                        onChange={(e) => { this.setState({ title: e.nativeEvent.text }) }}
                                    />
                                    <Input
                                        placeholder='Describe your service.....'
                                        shake={true}
                                        label="Detail"
                                        onChange={(e) => { this.setState({ detail: e.nativeEvent.text }) }}
                                    />

                                    <Picker
                                        selectedValue={this.state.category}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ category: itemValue })
                                        }>
                                        <Picker.Item label="frontend developer" value="frontend developer" />
                                        <Picker.Item label="backend developer" value="backend developer" />
                                        <Picker.Item label="Graphic Designer" value="Graphic Designer" />
                                        <Picker.Item label="Plumber" value="Plumber" />
                                        <Picker.Item label="Electrician" value="Electrician" />
                                        <Picker.Item label="Driver" value="Driver" />
                                    </Picker>

                                    <MapView
                                        // style={{ flex: 1 }}
                                        initialRegion={{
                                            latitude: this.state.location.coords.latitude,
                                            longitude: this.state.location.coords.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    />

                                    {urlarr ? <Image source={{ uri: urlarr }} style={{ width: 200, height: 200 }} /> :
                                        <Button
                                            title="Upload Cover Photo"
                                            onPress={this._pickImage}
                                        />
                                    }

                                    {urlarr ? <Button
                                        title="Submit"
                                        onPress={this.submit}
                                    /> : <Button
                                            title="Submit"
                                            onPress={this.submit}
                                            disabled
                                        />}



                                </View>
                                {/* </KeyboardAvoidingView> */}

                            </ScrollView>}
                    </View>}

                {!!propos &&
                    <View>
                        <Form hide={this.hideForm} obj={gigObj} />
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



async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(firebase.auth().currentUser.uid);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();
    url = await snapshot.ref.getDownloadURL()
    urlarr = url
    console.log(url)
    return await snapshot.ref.getDownloadURL();

}