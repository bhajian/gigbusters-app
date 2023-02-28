import React, {Component, useEffect, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useNavigation} from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import Colors from "../../constants/Colors";

export function LocationSelector({style, locationNameParam, onLocationChangePressed}) {
    const [locationName, setLocationName] = useState(locationNameParam
        ? locationNameParam : 'Select a Location ..')
    const [coordinates, setCoordinates] = useState({
        latitude: 0, logitude: 0})
    const navigation = useNavigation()

    function setLocationHook(location){
        setLocationName(location.name)
        setCoordinates(location.coordinates)
        onLocationChangePressed(location)
    }
    function onPress() {
        navigation.navigate('LocationSelectorScreen', {
            onGoBack: setLocationHook
        });
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData]);

    async function getCurrentUserData() {
        setLocationName(locationNameParam)
    }

    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={styles.searchInput} onPress={onPress}>
                <View style={styles.searchTextIcon}>
                    <MaterialIcons name="place" size={17} color="grey" />
                    <Text> {locationName} </Text>
                </View>
                <CountryFlag isoCode="ca" size={15} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        // marginHorizontal: 10,
        width: '100%'
    },
    searchBarContainer: {
        flexDirection: "row",
        borderBottomColor: 'grey',
        backgroundColor: 'white',
    },
    searchTextIcon: {
        width: '90%',
        flexDirection: "row",
    },
    searchInput: {
        width: '100%',
        backgroundColor: Colors.light.grey,
        borderColor: '#c9c6c6',
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        padding: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        marginTop: 10,
        marginLeft: 5,
        maxWidth: '12%'
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    iconContainer: {
        // marginTop: 1,
        borderWidth: 1,
        width: 30,
        height: 30,
        borderColor: "grey",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid'
    },
});
