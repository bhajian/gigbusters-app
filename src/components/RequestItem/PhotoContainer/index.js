import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";

export default function PhotoContainer({profile}) {
    return (
        <View style={styles.container}>
            <ProfilePicture image={profile.profilePhotoURL} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '20%',
    },
    info: {
        marginTop: 5,
        color: '#fff',
        borderRadius: 50,
        textAlign: 'center',
        backgroundColor: '#ababab'
    }
});
