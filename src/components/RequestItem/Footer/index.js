import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from "../../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {Octicons} from "@expo/vector-icons";

export default function Footer({request, onSharePressed}) {
    const navigation = useNavigation()

    async function onMakeReferralPressed() {
        navigation.navigate('ReferralResponseScreen', {request: request})
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={onMakeReferralPressed}>
                <Octicons name={"cross-reference"} size={25} color={Colors.light.tint}/>
                <Text style={styles.number}></Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.iconContainer}>*/}
            {/*    <AntDesign name="hearto" size={20} color={Colors.light.tint} />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={styles.iconContainer} onPress={onSharePressed}>
                <EvilIcons name={"share-google"} size={35} color={Colors.light.tint}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    number: {
        marginLeft: 5,
        color: 'grey',
        textAlign: 'center'
    },
});

