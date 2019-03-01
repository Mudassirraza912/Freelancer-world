import * as Screens from '../Screens/screen'


import { createDrawerNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
const drawerNavigator = createDrawerNavigator({
    Profile: {
        screen : Screens.Profile
    },
    Home: {
        screen: Screens.Home,
        // screen: TabNavigator
    },
    Contact: {
        screen: Screens.ContactList
    },
    ManageGigs: {
        screen: Screens.Gigs
    },
    Bids: {
        screen: Screens.Bids
        
    },
    Offers: {
        screen: Screens.Offers
        
    },
    Messages : {
        screen: Screens.Messages
    }
},
{
    initialRouteName: 'Profile'
}
)



// StackNavigator.navigationOptions = ({ navigation }) => {
//     console.log(navigation)
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//       tabBarVisible = false;
//     }

//     return {
//       tabBarVisible,
//     };
//   };

// StackNavigator.navigationOptions = ({ navigation }) => {
//     console.log(navigation)
// }
const Navigator = createAppContainer(drawerNavigator)

export default Navigator