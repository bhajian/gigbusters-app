import React, {useState} from "react";
import {View, TextInput, Text, FlatList, Pressable, TouchableOpacity} from "react-native";
import styles from './styles';
import SuggestionRow from "./SuggestionRow";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from 'expo-location'

Location.installWebGeolocationPolyfill()


const LocationSelectorScreen = ({route, navigation}) => {
    const {onGoBack} = (route.params ? route.params : null);


    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Location..'
                query={{
                    key: 'AIzaSyBPwz2HLlWGxU6vZrGNcFiyD23-tawiH0s',
                    language: 'en',
                    // types: '(cities)',
                }}
                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                fetchDetails={true}
                currentLocation={true}
                currentLocationLabel='Current location'
                onPress={(data, details ) => {
                    onGoBack({
                        name: (data.description ? data.description : data.vicinity),
                        coordinates: details.geometry.location
                    })
                    navigation.goBack()
                }}
            />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.closeButton}>
                <Text style={styles.closeText}> Cancel </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LocationSelectorScreen;

