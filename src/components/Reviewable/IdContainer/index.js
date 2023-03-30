import React from "react";
import {Image, Text, View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import Colors from "../../../constants/Colors";
import {FontAwesome5} from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function IdContainer({reviewable}) {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.nameIdContainer}>
                <View>
                    <Text style={styles.toName} >{reviewable.name}</Text>
                </View>
                <View style={styles.userIdContainer}>
                    <FontAwesome5
                        style={styles.contentContainer}
                        name={"tiktok"}
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
        justifyContent: 'space-between'
    },
    nameIdContainer: {

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
