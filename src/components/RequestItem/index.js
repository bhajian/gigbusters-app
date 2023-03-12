import React from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";
import PhotoContainer from "./PhotoContainer";
import IdContainer from "./IdContainer";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import {useNavigation} from "@react-navigation/native";

export default function RequestItem({request}) {

    return (
        <View style={styles.container}>
            <Pressable >
                <View style={styles.topContainer}>
                    <PhotoContainer
                        user={request.userId}
                    />
                    <IdContainer
                        review={request}
                    />
                </View>
                <View style={styles.mainContainer}>
                    <MainContainer
                        request={request}
                    />
                </View>
            </Pressable>
            <Footer
                review={request}
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
        padding: 5,
        borderColor: 'grey'
    }
});
