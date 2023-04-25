import React from "react";
import {Image, Text, View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import Colors from "../../../constants/Colors";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function IdContainer({reviewable}) {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.nameIdContainer}>
                <View>
                    <Text style={styles.toName} >{reviewable?.profile?.name}</Text>
                </View>
                <View style={styles.userIdContainer}>
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name={"orbit"}
                    />
                    <Text style={styles.fromName}>ID: {reviewable.uri}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    nameIdContainer: {

    },
    icon: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: Colors.light.tint
    },
    userIdContainer: {
        flexDirection: 'row',
    },
    toName: {
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    fromName: {
        marginHorizontal: 5,
        // color: 'grey'
    },
    sentAt: {
        marginHorizontal: 5,
    },
    contentContainer: {
        marginTop: 5,
        marginLeft: 5,
    },
    iconContainer: {
        borderWidth: 1.5,
        width: 40,
        height: 40,
        borderColor: Colors.light.tabIconSelected,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid'
    },
});
