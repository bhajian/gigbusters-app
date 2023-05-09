import React, {useState} from "react"
import {View, TextInput, Text, FlatList, Pressable, TouchableOpacity, StyleSheet} from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import * as Location from 'expo-location'
import {ScreenWidth} from "react-native-elements/dist/helpers"
import Colors from "../../../constants/Colors"

Location.installWebGeolocationPolyfill()

const LocationSelectorScreen = ({route, navigation}) => {
    const {onGoBack} = (route && route.params ? route.params : null)

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search Your City ..'
                query={{
                    key: 'AIzaSyBPwz2HLlWGxU6vZrGNcFiyD23-tawiH0s',
                    language: 'en',
                    types: '(cities)',
                }}
                GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                fetchDetails={true}
                currentLocation={false}
                // currentLocationLabel='Current location'
                onPress={(data, details ) => {
                    if(onGoBack){
                        onGoBack({
                            locationName: (data.description ? data.description : data.vicinity),
                            coordinates: details.geometry.location
                        })
                        navigation.goBack()
                    }
                }}
                styles={{
                    textInput: styles.textInput,
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

export default LocationSelectorScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 10,
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    textInputContainer:{
        width: ScreenWidth - 100,
        height: 40,
        borderRadius: 5,
        paddingStart: 5,
        backgroundColor: '#eaebf6',
    },
    closeButton: {
        width: '18%',
        marginTop: 10,
        alignItems: 'center',
    },
    closeText: {
        color: Colors.light.tint,
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: Colors.light.grey,
        fontWeight: '600',
        borderRadius: 10,
        height: 40
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    iconContainer: {
        backgroundColor: '#e7e7e7',
        padding: 7,
        borderRadius: 10,
        marginRight: 15,
    },
    locationText: {
        backgroundColor: Colors.light.grey
    }
})
