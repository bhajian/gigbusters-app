import React from "react";
import {Image, StyleSheet, View} from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import PhotoContainer from "../Reviewable/PhotoContainer";
import IdContainer from "../Reviewable/IdContainer";

export default function Review({review}) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <LeftContainer
                    user={review}
                />
            </View>
            <View style={styles.mainContainer}>
                <MainContainer
                    review={review}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        width: '100%',
        padding: 5,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    mainContainer: {
        width: '100%',
        padding: 5,
        borderColor: 'grey'
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderColor: 'grey'
    }
});
