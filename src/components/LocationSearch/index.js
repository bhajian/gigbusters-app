import React, {Component, useEffect, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import Colors from "../../constants/Colors";
import loading from "../../../assets/images/loading2.gif";
import * as Location from 'expo-location'

export function LocationSelector({style, initialLocation, onLocationChangePressed}) {

    const [locationName, setLocationName] = useState(initialLocation
        ? initialLocation?.locationName : 'Select a Location ..')
    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const [coordinates, setCoordinates] = useState({
        latitude: initialLocation?.latitude, longitude: initialLocation?.longitude})
    const [myLocation, setMylocation] = useState({
        latitude: 0, longitude: 0})
    const navigation = useNavigation()

    function setLocationHook(location){

        setDataBeingSaved(true)
        setLocationName(location.locationName)
        setCoordinates(location.coordinates)
        if(onLocationChangePressed){
            onLocationChangePressed({
                locationName: location?.locationName,
                latitude: location?.coordinates?.lat,
                longitude: location?.coordinates?.lng,
                myLatitude: myLocation?.coords?.latitude,
                myLongitude: myLocation?.coords?.longitude,
            }).then(e=>{
                setDataBeingSaved(false)
            })
        }
    }
    function onPress() {
        navigation.navigate('LocationSelectorScreen', {
            onGoBack: setLocationHook
        })
    }

    useEffect(() => {
        getCurrentLocation().then(r => {})
    }, [])

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission to access location was denied')
            return
        }
        let location = await Location.getCurrentPositionAsync({})
        setMylocation(location)
    }

    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={styles.searchInput} onPress={onPress}>
                <View style={styles.searchTextIcon}>
                    {
                        dataBeingSaved ?
                            <Image source={loading} style={{width: 30, height: 30}} />
                            :
                            <MaterialIcons name="place" size={17} color="grey" />
                    }

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
        borderRadius: 10,
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
