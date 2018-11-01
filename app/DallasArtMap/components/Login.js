import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, TouchableOpacity, Image, Text, AsyncStorage } from "react-native";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this._navigateToMap = this._navigateToMap.bind(this);
    }

    _navigateToMap = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('ArtMap');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._navigateToMap} style={styles.touchArea}>
                    <Image source={require("../assets/menu2.png")} />
                </TouchableOpacity>
                <Text>
                    Login Page
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    touchArea: {
        width: 36,
        height: 36,
        top: 15,
        left: 15
    }
});

AppRegistry.registerComponent("Login", () => Login)