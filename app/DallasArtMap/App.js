import React, { Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Image,
  Text
} from "react-native";

export default class App extends Component<Props> {
  _onPressButton() {
    Alert.alert("works");
  }

  render() {
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
          <TouchableHighlight
            onPress={this._onPressButton}
            underlayColor="white"
          >
            <Image source={require("./assets/menu2.png")} />
          </TouchableHighlight>
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
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  menuView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  menuButton: {
    // backgroundColor: "black",
    // flexDirection: "row",
    // flex: 1
    // paddingTop: 10,
    // paddingLeft: 10
    // width: '60px',
    // marginLeft: 15,
  }
});
