import React, { Component } from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useNavigation} from "@react-navigation/native";

export function SearchCategory({navigation}) {

    function onPress() {
        navigation.navigate('SearchCategory');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.searchInput} onPress={onPress}>
                <Fontisto name="search" size={17} color="grey" />
                <Text> Search </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        width: '100%'
    },
    searchBarContainer: {
        flexDirection: "row",
        borderBottomColor: 'grey',
        backgroundColor: 'white',
    },
    searchInput: {
        backgroundColor: '#eaebf6',
        width: '90%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        padding: 10,
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
