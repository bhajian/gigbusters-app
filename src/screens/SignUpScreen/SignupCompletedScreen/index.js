import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Lottie from "lottie-react-native";
import waitAnim from '../../../../assets/animations/135948-high-striker.json'
import celebrationAnim from '../../../../assets/animations/112134-fireworks-teal-and-red.json'
import Colors from "../../../constants/Colors";
import CustomButton from "../../../components/CustomButton";

export default function SignupCompletedScreen({route}) {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            headerTitle: () => (
                <Text style={{fontWeight: 'bold'}}> Profile Details</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    function closeWindow() {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>

                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeWindow}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <Lottie
                    style={{height: 350, width: 350, alignSelf: 'center', marginTop: 20}}
                    source={celebrationAnim}
                    autoPlay
                    loop
                />

                <Text style={styles.informationText}>You have now submitted your request.
                    Please sit tight, someone will respond
                    to your request shortly.</Text>


                <CustomButton
                    text="Close & Continue"
                    style={styles.component}
                    // onPress={onNextPressed}
                />
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: 40,
    },
    headerExtensionContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
        // zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        paddingStart: 10,
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    inputsContainer: {
        backgroundColor: Colors.light.grey,
        margin: 10,
    },
    reviewInput: {
        height: 200,
        maxHeight: 300,
        fontSize: 20,
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10
    },
    tadaPhoto: {
        width: 200,
        height: 200,
        borderRadius: 5,
        margin: 15,
        alignSelf: 'center'
    },
    waitPhoto: {
        width: 150,
        height: 150,
        borderRadius: 5,
        margin: 10,
        alignSelf: 'center'
    },
    informationText:{
        margin: 15,
        fontWeight: '600'
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    closeButton: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: Colors.light.tint,
        fontSize: 17,
        fontWeight: '400'
    }
});
