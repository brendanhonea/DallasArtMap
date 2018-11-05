import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, TouchableOpacity, Image, Text, AsyncStorage, TextInput, Dimensions, TouchableHighlight} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var dims = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this._login = this._login.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    _login() {
        if (this.state.username.length > 3 && this.state.password.length > 3) {
            fetch("http://192.168.0.159:3001/api/v1/auth/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(async authRes => {
                    await AsyncStorage.setItem('userToken', authRes.token);
                    this.props.navigation.navigate('ArtMap');
                })
                .catch(error => {
                    console.error(error);
                });
            
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            >
                <Image
                    source={require('../assets/art_co_logo.png')}
                    style={styles.logo}
                />
                <View style={styles.authInputWrapper}>
                    <Text style={styles.authText}>Username</Text>
                    <TextInput
                        style={styles.authInput}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                    <Text style={styles.authText}>Password</Text>
                    <TextInput
                        style={styles.authInput}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableHighlight
                        style={styles.loginButton}
                        onPress={this._login}
                    >
                        <Text style={styles.loginBtnText}> Login </Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.authText}>Not a member?</Text>

            </KeyboardAwareScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93A38',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    logo: {
        height: dims.width/3,
        resizeMode: 'contain',
    },
    touchArea: {
        width: 36,
        height: 36,
        top: 15,
        left: 15
    },
    authInput: {
        height: 40,
        width: dims.width * .6,
        marginVertical: 10,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1
    },
    authText: {
        color: 'white',
        fontSize: 16
    },
    authInputWrapper: {
        height: dims.width/2,
        justifyContent: 'space-evenly'
    },
    loginButton: {
        width: dims.width * .6,
        height: dims.height * .1,
        backgroundColor: '#4B88A2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    loginBtnText: {
        color: 'white',
        fontSize: 26
    }
});

AppRegistry.registerComponent("Login", () => Login)