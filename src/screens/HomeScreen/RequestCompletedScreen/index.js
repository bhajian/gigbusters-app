import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Image, TouchableOpacity,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import Tada from "../../../../assets/images/tada.png"
import Wait from "../../../../assets/images/wait.png"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Ionicons} from "@expo/vector-icons";

export default function RequestCompletedScreen({route}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
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
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <FontAwesome name="chevron-left" style={styles.backIcon}/>
                            <Text style={styles.backIcon}>  Back </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeWindow}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                source={Tada}
                style={styles.tadaPhoto}
                resizeMode="contain"
            />
            <Text style={styles.informationText}>You have now submitted your request.
                Please sit tight, someone will respond
                to your request shortly.</Text>
            <Image
                source={Wait}
                style={styles.waitPhoto}
                resizeMode="contain"
            />
        </View>
    )
};

