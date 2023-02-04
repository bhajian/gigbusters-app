import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default function ReferralReviewItem({item}) {
    return (
        <View style={styles.container}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text>
                {item.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    }
});
