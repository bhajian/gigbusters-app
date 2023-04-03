import React from "react";
import {Image, StyleSheet, View} from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";

export default function Review({review}) {
    return (
        <View style={styles.container}>
            <LeftContainer
                user={review}
            />
            <MainContainer
                review={review}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    }
});
