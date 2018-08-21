import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, AppRegistry } from "react-native";

export default class App extends Component<Props> {
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
