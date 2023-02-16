import React, {useState} from "react";
import {View, TextInput, Text, FlatList, Pressable, TouchableOpacity} from "react-native";
import styles from './styles';
import SuggestionRow from "./SuggestionRow";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {Input} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

const LocationSelectorScreen = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Location..'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data, details);
                    // navigation.navigate('Guests', { viewport: details.geometry.viewport });
                }}
                styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInputContainer,
                }}
                query={{
                    key: 'AIzaSyBPwz2HLlWGxU6vZrGNcFiyD23-tawiH0s',
                    language: 'en',
                    types: '(cities)',
                }}
                suppressDefaultStyles
                renderRow={(item) => <SuggestionRow item={item} />}
                // currentLocation={true}
                // currentLocationLabel='Current location'
                onPress={(data, details = null) => {
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

