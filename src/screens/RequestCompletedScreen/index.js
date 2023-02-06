import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, Image,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import Tada from "../../../assets/images/tada.png"

const RequestCompletedScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={Tada}
                style={[styles.logo]}
                resizeMode="contain"
            />
            <Text>Request</Text>
        </View>
    );
};

export default RequestCompletedScreen;
