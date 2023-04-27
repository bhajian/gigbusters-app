import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Colors from "../../../constants/Colors";

export default function PhotoContainer({user}) {
    return (
        <View style={styles.container}>
            <UserAvatar
                size={40}
                fontSize={20}
                backgroundColor={Colors.light.turquoise}
                userName={user?.profile?.name}
                src={user?.profile?.profilePhotoURL}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '20%',
        // padding: 15,
    },
    info: {
        marginTop: 5,
        color: '#fff',
        borderRadius: 50,
        textAlign: 'center',
        backgroundColor: '#ababab'
    }
});
