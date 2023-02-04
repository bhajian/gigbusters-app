import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, } from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";

const RequestReferralScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

    return (
        <View style={styles.container}>

            Request
        </View>
    );
};

export default RequestReferralScreen;
