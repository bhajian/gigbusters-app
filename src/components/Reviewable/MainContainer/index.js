import React from "react";
import {Image, Text, View, StyleSheet, Pressable} from "react-native";
import Footer from "./Footer";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Colors from "../../../constants/Colors";
import RatingStack from "../../RatingStack";
import {FontAwesome5} from "@expo/vector-icons";

export default function MainContainer({tipoff}) {
    async function onItemPressed() {
        console.log('Iam pressed!')
    }

    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={onItemPressed}>
                <View style={styles.userIdContainer}>
                    <Text style={styles.toName} >{tipoff.to.name}</Text>
                    <View style={styles.iconContainer}>
                        <EvilIcons name={"share-google"} size={28} color={Colors.light.tabIconSelected}/>
                    </View>
                </View>
                <View style={styles.userIdContainer}>
                    <FontAwesome5
                        style={styles.contentContainer}
                        name={"tiktok"}
                    />
                    <Text style={styles.fromName}>ID: {tipoff.from.id}</Text>
                </View>


                <View style={styles.contentContainer}>
                    <RatingStack ratings={tipoff.id}/>
                </View>

            </Pressable>
            <Footer tweet={tipoff} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width: '80%',
        // flex: 1,
    },
    userIdContainer: {
        flexDirection: 'row',
        // justifyContent: "space-between",
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
});
