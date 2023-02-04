import React, {useState} from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import styles from './styles.js';
import {useNavigation} from '@react-navigation/native';
import SuggestionRow from "./SuggestionRow";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {Input} from "react-native-elements";


const DestinationSearchScreen = (props) => {

    // const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Location..'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data, details);
                    // navigation.navigate('Guests', { viewport: details.geometry.viewport });
                }}
                fetchDetails
                styles={{
                    textInputContainer: styles.searchButton,
                    textInput: styles.searchButtonText,
                }}
                query={{
                    key: 'AIzaSyBPwz2HLlWGxU6vZrGNcFiyD23-tawiH0s',
                    language: 'en',
                    types: '(cities)',
                }}
                textInputProps={{
                    InputComp: Input,
                    leftIcon: { type: 'MaterialIcons', name: 'place' },
                    errorStyle: { color: 'red' },
                }}
                suppressDefaultStyles
                renderRow={(item) => <SuggestionRow item={item} />}
                currentLocation={true}
                currentLocationLabel='Current location'
            />
        </View>
    );
};

export default DestinationSearchScreen;
