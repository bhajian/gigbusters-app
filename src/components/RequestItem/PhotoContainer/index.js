import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Colors from "../../../constants/Colors";

export default function PhotoContainer({profile}) {
    return (
        <View style={styles.container}>
            <UserAvatar
                size={40}
                userName={profile.name}
                style={styles.avatar}
                src={profile.profilePhotoURL}
                backgroundColor={Colors.light.turquoise}
                fontSize={25}
            />

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
