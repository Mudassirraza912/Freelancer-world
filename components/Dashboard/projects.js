import React from 'react';
import { Text, View, } from 'react-native';
import { Avatar, Header, Button } from 'react-native-elements'
import firebase from '../../config/firebase'

export default class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: ''
        }
    }

    componentDidMount() {
        firebase.database().ref('/Projects/').on("child_added", (snap) => {
            var projects = snap.val()
            this.setState({
                projects: projects
            })
        })
    }

    static navigationOptions = {
        drawerLabel: 'Projects',
        drawerIcon: ({ tintColor }) => {
            return <Avatar icon={{ name: 'projects', type: 'font-awesome' }} />
        }
    }


    render() {
        const { projects } = this.state
        const { toggle } = this.props
        return (
            <View>
                <View>
                <Button title= {"Service"} onPress={() => {toggle(true)}}/>
                </View >
                <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                    {!projects ? <View><Text>No projects Found</Text></View>
                        :
                        <View>
                            <Text>
                            projects founds
                            </Text>
                        </View>}
                </View>


            </View>
        )
    }
}