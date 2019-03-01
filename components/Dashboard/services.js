// import React from 'react';
// import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
// import { Avatar, Header, Card, Icon, Image, Button  } from 'react-native-elements'
// import firebase from '../../config/firebase'

// export default class Services extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             services: []
//         }
//     }

    // componentWillMount() {
    //     const {services} = this.state
    //     firebase.database().ref('/' + firebase.auth().currentUser.uid + '/myGigs/').on("child_added", (snap) => {
    //         var servic = snap.val()
    //         var data1 = {key:snap.key, ...servic}
    //         services.push(data1)
    //         // data.push(services)
    //         this.setState({
    //             services
    //         })
    //     })
    // }

    // static navigationOptions = {
    //     drawerLabel: 'Services',
    //     drawerIcon: ({ tintColor }) => {
    //         return <Avatar icon={{ name: 'Services', type: 'font-awesome' }} />
    //     }
    // }


//     render() {
//         const { services } = this.state
//         const { toggle } = this.props
//         console.log("services servicesv services ",services)
//         return (
//             <View>
//                 {/* <View>
//                    <Button title= {"Projects"} onPress={() => {toggle(false)}}/>
//                 </View > */}
//                 <View >
//                     {services.length > 0 ? <View>
//                         {services.map((value) => {
//                                 return(
//                                 <View>
//                                     {/* <Text style={{fontWeight:"bold", alignItems: "center", justifyContent: "center" }}>{value.title}</Text> */}
//                                     <Card
//                                     title={`${value.title} (${value.category})`}
//                                     image={value.urls}>
//                                     <Text style={{ marginBottom: 10 }}>
//                                         {value.detail}
//                                     </Text>
//                                 </Card>
//                                     <Button title="Send Proposals" onPress={() => {console.log("jdfkdjbvhdbhs")}}/>
//                                 </View>  
//                                 )
//                             })}
//                     </View>
//                         :
//                         <View>
//                             <Text>No services Found</Text>
//                         </View>}
//                 </View>


//             </View>
//         )
//     }
// render() {
//     const {services} = this.state
//   return (
//       <ScrollView>
//           <Text>asjgdaskjdkjasdj</Text>
//       </ScrollView>
//   )
// }


// }