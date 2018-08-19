import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.sideDrawerContainer}>
        <View style={styles.sideDrawer} />
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
  }
});
