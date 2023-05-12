import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from "../../../constants/Colors";

export default function Footer({reviewable}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer}>
                <Feather name={"message-circle"} size={25} color={Colors.light.tint}/>
                <Text style={styles.number}>{reviewable.numberOfReviews}</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.iconContainer}>*/}
            {/*    <AntDesign name="hearto" size={20} color={Colors.light.tint} />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={styles.iconContainer}>
                <EvilIcons name={"share-google"} size={35} color={Colors.light.tint}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
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

