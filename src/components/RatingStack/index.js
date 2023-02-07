import React from "react";
import {Image, Text, View, StyleSheet, Pressable} from "react-native";
import Colors from "../../constants/Colors";
import {ProgressBar} from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {FontAwesome} from "@expo/vector-icons";
import {Icon} from "react-native-elements";
import {RatingBar} from "@aashu-dubey/react-native-rating-bar";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function RatingStack({ratings}) {
    async function onItemPressed() {
        console.log('Iam !')
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.numberContainer}>
                <Text style={styles.text}>Rating:</Text>
                <Text style={styles.average}>{ratings.id}/5 </Text>
            </View>
            <View style={styles.starColContainer}>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"}  color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={0.75} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={0.25} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={0.25} color={Colors.light.tint} />
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
                        <ProgressBar  progress={0.55} color={Colors.light.tint} />
                    </View>
                </View>
                <View style={styles.starRowContainer}>
                    <View style={styles.stackStarsBar}>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                        <FontAwesome name={"star"} color={Colors.dark.grey}/>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar  progress={0.25} color={Colors.light.tint} />
                    </View>
                </View>
                <Text style={styles.text}> {ratings.numberOfReplies} reviews</Text>
            </View>
            <View style={styles.contentContainer}>
                <AntDesign name="right" size={20} color={Colors.light.tint} />
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
    numberContainer: {
        paddingTop: 5,
        flexDirection: 'column',
    },
    starRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 2,
        marginLeft: 2,
        paddingEnd: 2,
    },
    starColContainer: {
        flexDirection: 'column',
        width: '80%',
        padding: 8,
    },
    average: {
        color: Colors.light.tint,
        marginTop: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
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
