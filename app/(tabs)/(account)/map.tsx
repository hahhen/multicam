import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Platform, Text } from 'react-native';
import * as Location from 'expo-location';
import { Colors } from '@/constants/Colors';

export default function Map() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <View style={styles.container}>
            {location &&
                <MapView style={styles.map}

                    initialRegion={{
                        latitude: location?.coords?.latitude,
                        longitude: location?.coords?.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location?.coords?.latitude,
                            longitude: location?.coords?.longitude,
                        }}
                    />
                </MapView>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});