import React, {useEffect, useState} from "react";
import {Image, Text, View, StyleSheet, Pressable} from "react-native";
import Colors from "../../constants/Colors";
import {ProgressBar} from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";


export default function RatingStack({reviewable}) {

    const [oneStar, setOneStar] = useState(reviewable && reviewable.numberOfReviews > 0
    && reviewable.oneStar > 0 ?
        reviewable.oneStar/reviewable.numberOfReviews : 0)
    const [twoStar, setTwoStar] = useState(reviewable && reviewable.numberOfReviews > 0
    && reviewable.twoStar > 0 ?
        reviewable.twoStar/reviewable.numberOfReviews : 0)
    const [threeStar, setThreeStar] = useState(reviewable && reviewable.numberOfReviews > 0
    && reviewable.threeStar > 0 ?
        reviewable.threeStar/reviewable.numberOfReviews : 0)
    const [fourStar, setFourStar] = useState(reviewable && reviewable.numberOfReviews > 0
    && reviewable.fourStar > 0 ?
        reviewable.fourStar/reviewable.numberOfReviews : 0)
    const [fiveStar, setFiveStar] = useState(reviewable && reviewable.numberOfReviews > 0
    && reviewable.fiveStar > 0 ?
        reviewable.fiveStar/reviewable.numberOfReviews : 0)

    return (
        <View style={styles.mainContainer}>
            <View style={styles.starColContainer}>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={fiveStar} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={fourStar} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={threeStar} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={twoStar} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"}  color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={oneStar} color={Colors.light.tint} />
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        marginRight: 5,
        flexDirection: 'row',
        width: '100%',
    },
    ratingStackContainer: {
        width: '60%'
    },
    starRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 2,
        marginLeft: 2,
        paddingEnd: 2,
    },
    starColContainer: {
        // flexDirection: 'column',
        width: '80%',
        padding: 8,
    },
    text: {
        // color: Colors.light.tint,
        marginTop: 5,
        fontSize: 15,
        textAlign: 'left',
        // fontWeight: 'bold'
    },
    progressBar: {
        width: '75%',
        marginTop: 5,
        paddingLeft: 5,
        // paddingRight: 10,
    },
    stackStarsBar: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    contentContainer: {
        marginTop: 5,
        marginLeft: 5,
    }
});
