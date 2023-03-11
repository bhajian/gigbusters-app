import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";
import RatingStack from "../../RatingStack";
import Footer from "../Footer";
import Colors from "../../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function MainContainer({request}) {


    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.text} >{request.country}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text} >{request.price}$/hr</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text} >{request.category}</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.text} >{request.description}</Text>
                <Image source={{uri: request.mainPhotoURL}} style={styles.image} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // flexDirection: 'columns'
    },
    mainContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingStackContainer: {
        width: '90%'
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    info: {
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#000',
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 50,
        // width: 50,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    }
});
