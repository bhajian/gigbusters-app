import React from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";
import PhotoContainer from "./PhotoContainer";
import IdContainer from "./IdContainer";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import {useNavigation} from "@react-navigation/native";

export default function Reviewable({tipoff}) {
    const navigation = useNavigation();
    async function onItemPressed() {
        navigation.navigate('ReviewableProfileScreen', {reviewable: tipoff.to})
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onItemPressed}>
                <View style={styles.topContainer}>
                    <PhotoContainer
                        user={tipoff.to}
                    />
                    <IdContainer
                        review={tipoff}
                    />
                </View>
                <View style={styles.mainContainer}>
                    <MainContainer
                        review={tipoff}
                    />
                </View>
            </Pressable>
            <Footer
                review={tipoff}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
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
        padding: 15,
        borderColor: 'grey'
    }
});
