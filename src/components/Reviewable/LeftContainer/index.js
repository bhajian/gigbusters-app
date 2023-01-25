import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";

export default function LeftContainer({user}) {
    return (
        <View style={styles.container}>
            <ProfilePicture image={user.image} />
            <Text style={styles.info} >Toronto</Text>
            <Text style={styles.info} >Personal Trainer</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        // flexDirection: 'row',
        width: '20%',
        // padding: 15,
    },
    info: {
        marginTop: 5,
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#ababab'
    }
});
