import React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import Footer from "./Footer";
import STAR_IMAGE from "../../../../assets/images/star.png";
import Colors from "../../../constants/Colors";
import {AirbnbRating} from "react-native-ratings";

export default function MainContainer({tipoff}) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.tipoffHeaderContainer}>
                <Text style={styles.reviewerName} >{tipoff.to.name}</Text>
                <AirbnbRating
                    type='custom'
                    starImage={STAR_IMAGE}
                    showRating={false}
                    selectedColor={Colors.light.tint}
                    ratingBackgroundColor={Colors.light.grey}
                    ratingCount={5}
                    size={15}
                    isDisabled={true}
                    ratingContainerStyle={styles.rating}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text>{tipoff.content}</Text>
                {!!tipoff.image && <Image source={{uri: tipoff.image}} style={styles.image} />}
            </View>
            <Footer tweet={tipoff} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    tipoffHeaderContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    reviewerName: {
        margin: 10,
        fontWeight: 'bold'
    },
    fromName: {
        marginHorizontal: 5,
        color: 'grey'
    },
    sentAt: {
        marginHorizontal: 5,
    },
    contentContainer: {
        marginTop: 5,
        marginLeft: 5,
    },
    image: {
        marginVertical: 10,
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    }
});
