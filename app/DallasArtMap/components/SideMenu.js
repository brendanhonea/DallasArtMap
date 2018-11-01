import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, AppRegistry, AsyncStorage } from "react-native";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  
  render() {
    return (
      <View style={styles.sideDrawerContainer}>
        <View style={styles.sideDrawer}>
          <TouchableOpacity
            onPress={this.props.toggleAddModeOn}
            style={styles.addButton}
            >
            <Text style={styles.muralButton}>Add A Mural</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._logOut}
            style={styles.addButton}
            >
            <Text style={styles.muralButton}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.props.toggleMenu}
          style={styles.mapTouch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideDrawerContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  },
  sideDrawer: {
    flex: 0.7,
    backgroundColor: "white"
  },
  mapTouch: {
    flex: 0.3
  },
  addButton: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  muralButton: {
  }
});

AppRegistry.registerComponent('SideMenu', () => SideMenu);
