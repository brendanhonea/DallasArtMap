import React, { Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  AppRegistry
} from "react-native";
import SideMenu from "./components/SideMenu.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleAddModeOn = this.toggleAddModeOn.bind(this);
    this.handleMapPress = this.handleMapPress.bind(this);
    this.initMap = this.initMap.bind(this);

    this.state = {
      menuOpen: false,
      addMode: false,
      muralMarkers: []
    };

    this.initMap();
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  toggleAddModeOn() {
    this.toggleMenu();
    this.setState({ addMode: true });
  }

  initMap() {
    fetch('http://10.0.2.2:8080/api/murals')
      .then((response) => response.json())
      .then((muralResponse) => {
        this.setState({
          muralMarkers: [...muralResponse]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleMapPress(event) {
    if (this.state.addMode) {
      //Adding new marker and turning off addMode

      var newMural = {
        coordinate: event.nativeEvent.coordinate,
        title: "new mural",
        description: "new artist"
      };

      fetch("http://10.0.2.2:8080/api/murals", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMural)
      })
        .then(response => response.json())
        .then(muralResponse => {
          this.setState({
            muralMarkers: [...this.state.muralMarkers, muralResponse],
            addMode: false
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={artCo}
          onPress={this.handleMapPress}
        >
          <Marker
            coordinate={artCo}
            title={"Deep Ellum Art Co"}
            description={"this is art co"}
          />
          {this.state.muralMarkers.map(marker => {
            return <Marker {...marker} />;
          })}
        </MapView>
        <TouchableOpacity onPress={this.toggleMenu} style={styles.touchArea}>
          <Image source={require("./assets/menu2.png")} />
        </TouchableOpacity>
        {this.state.menuOpen && (
          <SideMenu
            toggleMenu={this.toggleMenu}
            toggleAddModeOn={this.toggleAddModeOn}
          />
        )}
      </View>
    );
  }
}

const artCo = {
  latitude: 32.78428,
  longitude: -96.777388,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
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

AppRegistry.registerComponent("App", () => App);
