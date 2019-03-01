// import React from 'react';
// import { Text, View, } from 'react-native';
// import { Avatar, Header, Button } from 'react-native-elements'
// import firebase from '../../config/firebase'

// export default class ManageProjects extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             myProjects: ''
//         }
//     }
//     componentDidMount() {
//         firebase.database().ref('/' + firebase.auth().currentUser.uid + '/myGigs/').on("child_added", (snap) => {
//             var myProjects = snap.val()
//             this.setState({
//                 myProjects: myProjects
//             })
//         })
//     }

//     static navigationOptions = {
//         drawerLabel: 'Manage Projects',
//         drawerIcon: ({ tintColor }) => {
//             return <Avatar icon={{ name: 'menu', type: 'font-awesome' }} />
//         }
//     }


//     render() {
//         const { myProjects } = this.state
//         return (
//             <View>
//                 <View>
//                     <Header
//                         leftComponent={{ icon: 'menu', color: '#fff', onPress: () => { this.props.navigation.toggleDrawer() } }}
//                         centerComponent={<Button title="Add Projects" onPress={() => { console.log("FORM FORM FORM FORM") }} />}
//                         rightComponent={<Avatar rounded
//                             source={{
//                                 uri:
//                                     firebase.auth().currentUser.photoURL,
//                             }} />}
//                     />
//                 </View >
//                 <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
//                     {!myProjects ? <View><Text>No Projects Found</Text></View>
//                         :
//                         <View>
//                             <Text>
//                             Projects founds
//                             </Text>
//                         </View>}
//                 </View>


//             </View>
//         )
//     }
// }