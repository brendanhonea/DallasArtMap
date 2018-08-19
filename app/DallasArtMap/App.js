import React, { Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import SideMenu from "./components/SideMenu.js";

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this)
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    let menu = this.menuOpen ? (
      <View style={styles.menu}>
        <Text>SOME ANNOYING TEXT ON THE SCREEN</Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 32.78428,
            longitude: -96.777388,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker coordinate={artCo} title={"Deep Ellum Art Co"} />
        </MapView>
        <TouchableOpacity
          onPress={this.toggleMenu}
          style={styles.touchArea}
        >
          <Image source={require("./assets/menu2.png")} />
        </TouchableOpacity>
        {this.state.menuOpen && <SideMenu toggleMenu = {this.toggleMenu}/>}
      </View>
    );
  }
}

const artCo = {
  latitude: 32.78428,
  longitude: -96.777388
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  menu: {
    position: "absolute",
    top: 200,
    left: 200
  },
  touchArea: {
    width: 36,
    height: 36,
    top: 15,
    left: 15
  }
});
