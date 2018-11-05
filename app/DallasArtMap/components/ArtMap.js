import React, { Component } from "react";
import { AppRegistry, Image, StyleSheet, TouchableOpacity, View, AsyncStorage } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SideMenu from "./SideMenu.js";

export default class ArtMap extends Component {
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

    async initMap() {
        var AUTH_TOKEN = await AsyncStorage.getItem('userToken')
        fetch('http://192.168.0.159:3001/api/v1/murals', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + AUTH_TOKEN
            }
        })
            .then((response) => response.json())
            .then((muralResponse) => {
                this.setState({
                    muralMarkers: [...muralResponse.data]
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async handleMapPress(event) {
        if (this.state.addMode) {
            //Adding new marker and turning off addMode

            var newMural = {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
                title: "new mural" + Math.random() * 10000,
                description: "new artist"
            };

            var AUTH_TOKEN = await AsyncStorage.getItem('userToken')
            fetch("http://192.168.0.159:3001/api/v1/murals", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + AUTH_TOKEN
                },
                body: JSON.stringify(newMural)
            })
                .then(response => response.json())
                .then(muralResponse => {
                    console.log('Mural created: ' + muralResponse);

                    this.setState({
                        muralMarkers: [...this.state.muralMarkers, muralResponse.mural],
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
                    region={{
                        latitude: 32.78428,
                        longitude: -96.777388,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }}
                    onPress={this.handleMapPress}
                >
                    {this.state.muralMarkers.map(marker => {
                        if (!marker) {
                            return null;
                        }

                        let coord = {
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }
                        return <Marker key={marker.id} {
                            ...{
                                title: marker.title,
                                description: marker.description,
                                coordinate: coord
                            }
                        } />;
                    })}
                </MapView>
                <TouchableOpacity onPress={this.toggleMenu} style={styles.touchArea}>
                    <Image source={require("../assets/menu2.png")} />
                </TouchableOpacity>
                {this.state.menuOpen && (
                    <SideMenu
                        toggleMenu={this.toggleMenu}
                        toggleAddModeOn={this.toggleAddModeOn}
                        navigation={this.props.navigation}
                    />
                )}
            </View>
        );
    }
}

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

AppRegistry.registerComponent('ArtMap', () => ArtMap);
