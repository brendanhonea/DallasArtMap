import { AppRegistry, View , Text, StyleSheet, TextInput, Dimensions, TouchableHighlight} from 'react-native'
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var dims = Dimensions.get('window');

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            passwordVerify: ''
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
                <View style={styles.userInputWrapper}>
                    <Text style={styles.labelText}>Username</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Text style={styles.labelText}>Verify Password</Text>
                    <TextInput
                        style={styles.userInput}
                        onChangeText={(passwordVerify) => this.setState({ passwordVerify })}
                        value={this.state.passwordVerify}
                        secureTextEntry={true}
                    />
                    <TouchableHighlight
                        style={styles.createUserButton}
                    >
                        <Text style={styles.createBtnText}> Create User </Text>
                    </TouchableHighlight>
                </View>
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
    userInput: {
        height: 40,
        width: dims.width * .6,
        marginVertical: 10,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1
    },
    labelText: {
        color: 'white',
        fontSize: 16
    },
    userInputWrapper: {
        height: dims.height/2,
        justifyContent: 'space-evenly'
    },
    createUserButton: {
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
    createBtnText: {
        color: '#4B88A2',
        fontSize: 16,
        letterSpacing: 5
    }
})

AppRegistry.registerComponent("CreateUser", () => CreateUser);