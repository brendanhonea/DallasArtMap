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

    navigateToCreateUser() {
        this.props.navigation.navigate('CreateUser');
    }

    async _login() {
        if (this.state.username.length > 3 && this.state.password.length > 3) {
            try {
                let authRes = await fetch("http://192.168.0.159:3001/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": this.state.username,
                        "password": this.state.password
                    })
                });

                if (authRes.status !== 200) {
                    this.setState({
                        password: '',
                        errorText: 'Invalid username or password'
                    });

                    return;
                }

                const token = await authRes.json();
                
                await AsyncStorage.setItem('userToken', token.token);
                
                this.props.navigation.navigate('ArtMap');
            } catch (err) {
                console.error(err);
            }
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
                        secureTextEntry={true}
                    />
                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                    <TouchableHighlight
                        style={styles.loginButton}
                        onPress={this._login}
                    >
                        <Text style={styles.loginBtnText}> LOGIN </Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.authText} onPress={this.navigateToCreateUser()}>Not a member? Sign Up!</Text>

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
    errorText: {
        color: '#4B88A2',
        fontSize: 14
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
        height: dims.height * .075,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    loginBtnText: {
        color: '#4B88A2',
        fontSize: 16,
        letterSpacing: 5
    }
});

AppRegistry.registerComponent("Login", () => Login)