import React from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";
import PhotoContainer from "./PhotoContainer";
import IdContainer from "./IdContainer";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import {useNavigation} from "@react-navigation/native";

export default function Reviewable({reviewable}) {
    const navigation = useNavigation();
    async function onItemPressed() {
        navigation.navigate('ReviewableProfileScreen', {reviewable: reviewable})
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onItemPressed}>
                <View style={styles.topContainer}>
                    <PhotoContainer
                        user={reviewable}
                    />
                    <IdContainer
                        reviewable={reviewable}
                    />
                </View>
                <View style={styles.mainContainer}>
                    <MainContainer
                        reviewable={reviewable}
                    />
                </View>
            </Pressable>
            <Footer
                reviewable={reviewable}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
