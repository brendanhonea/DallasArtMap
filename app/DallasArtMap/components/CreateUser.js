import { AppRegistry, View , Text, StyleSheet} from 'react-native'
import React, { Component } from 'react';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Create User works</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#D93A38',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})

AppRegistry.registerComponent("CreateUser", () => CreateUser);