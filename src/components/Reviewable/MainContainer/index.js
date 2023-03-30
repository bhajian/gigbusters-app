import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";
import RatingStack from "../../RatingStack";
import Footer from "../Footer";
import Colors from "../../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function MainContainer({reviewable}) {

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.text} >{reviewable.location.locationName}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text} >10$/hr</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text} >{reviewable.categories[0]}</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.ratingStackContainer}>
                    <RatingStack reviewable={reviewable}/>
                </View>
                <View style={styles.contentContainer}>
                    <AntDesign name="right" size={20} color={Colors.light.tint} />
                </View>
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
        flexDirection: 'row',
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

});
