import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {Button} from "react-native-paper";
import RatingStack from "../../RatingStack";
import Footer from "../Footer";

export default function MainContainer({review}) {
    async function onItemPressed() {
        console.log('Iam pressed!')
    }
    return (
        <Pressable onPress={onItemPressed}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.text} >Toronto</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.text} >10$/hr</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.text} >Personal Trainer</Text>
                    </View>

                </View>
                <View style={styles.contentContainer}>
                    <RatingStack ratings={review}/>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    info: {
        borderRadius: 50,
        backgroundColor: '#afafaf',
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#fff',
    }
});
