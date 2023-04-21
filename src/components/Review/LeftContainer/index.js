import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function LeftContainer({user}) {
    return (
        <View style={styles.headerLeft}>
            <UserAvatar
                size={40}
                active
                name={user?.profile?.name}
                src={user?.profile?.profilePhotoURL}
            />
            <View style={styles.nameContainer}>
                <Text style={styles.contactName}>{user?.profile?.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // width: '100%',
        // padding: 15,
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 5,
    },
    nameContainer: {
        margin: 5
    },
    contactName: {
        fontWeight: '500',
    }
});
