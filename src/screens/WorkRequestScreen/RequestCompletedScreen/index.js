import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Image, TouchableOpacity, ScrollView,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Ionicons} from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import workingAnim from '../../../../assets/animations/135788-happy-delivery.json'
import waitAnim from '../../../../assets/animations/135948-high-striker.json'
import celebrationAnim from '../../../../assets/animations/112134-fireworks-teal-and-red.json'

export default function RequestCompletedScreen({route}) {
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

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
                    style={{height: 350, width: 350, alignSelf: 'center', marginTop: 5}}
                    source={celebrationAnim}
                    autoPlay
                    loop
                />

                <Text style={styles.informationText}>You have now submitted your request.
                    Please sit tight, someone will respond
                    to your request shortly.</Text>

                <Lottie
                    style={{height: 150, width: 150, alignSelf: 'center', marginTop: 5}}
                    source={waitAnim}
                    autoPlay
                    loop
                />
            </ScrollView>

        </View>
    )
};

