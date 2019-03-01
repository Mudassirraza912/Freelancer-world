// // import * as Screens from '../Screens/screen'
// import { StyleSheet, Text, TouchableHighlight } from 'react-native';
// import React from 'react';
// import App from '../../App'

// import { createDrawerNavigator,createStackNavigator , createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
// const drawerNavigator = createDrawerNavigator({
//     Profile: {
//         screen : Screens.Profile
//     },
//     Home: {
//         screen: StackNav
//     },
//     Contact: {
//         screen: Screens.ContactList
//     },
// },
// {
//     initialRouteName: 'Profile'
// }
// )

// const TabNavigator = createMaterialTopTabNavigator({

//     Phone: {
//         screen: Screens.Phone
//     },
//     Location: {
//         screen: Screens.Location
//     },
//         initialRouteName: 'Phone'
//     }

// )

// const StackNav = createStackNavigator({

//     Home: {
//         screen: Screens.Home
//     },
//     TabNav: {
//         screen: TabNavigator
//     },
//         initialRouteName: 'Home'
//     }

// )
















// {users.map((value, index) => {
                            
//     return <Card>

//         {value.revieverId == currentUser ? 
//         <View>
//        {     <Card>
//                 <ListItem
//                     key={index}
//                     leftAvatar={<Avatar rounded
//                         source={{
//                             onPress: () => { this.props.navigation.navigate('Profile') },
//                             uri:
//                                 value.senderPhotoUrl,
//                         }} />}
//                     title={value.senderName}
//                     subtitle={value.senderName}
//                 />
//                 <Button
//                     // icon={<Icon name='profile' color='#ffffff' />}
//                     onPress={() => { this.setState({ sendMsg: true, selectedObj: value }) }}
//                     backgroundColor='#03A9F4'
//                     buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
//                     title='Open Message' />
//             </Card>}
//          </View>
//             :
//             <Card>
//                 <ListItem
//                     key={index}
//                     leftAvatar={<Avatar rounded
//                         source={{
//                             onPress: () => { this.props.navigation.navigate('Profile') },
//                             uri:
//                                 value.revieverPhotoUrl,
//                         }} />}
//                     title={value.revieverName}
//                     subtitle={value.revieverName}
//                 />
//                 <Button
//                     // icon={<Icon name='profile' color='#ffffff' />}
//                     onPress={() => { this.setState({ sendMsg: true, selectedObj: value }) }}
//                     backgroundColor='#03A9F4'
//                     buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
//                     title='Open Message' />
//             </Card>
//         }
//     </Card>


// })

// }
