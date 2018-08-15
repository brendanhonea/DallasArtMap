 import React, { Component } from 'react'
 import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
 import { View, StyleSheet } from 'react-native'

export default class App extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 4,
//     borderWidth: 0.5,
//     borderColor: '#d6d7da',
//   },
//   title: {
//     fontSize: 19,
//     fontWeight: 'bold',
//   },
//   activeTitle: {
//     color: 'red',
//   },
// });
