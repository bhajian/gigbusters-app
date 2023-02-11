import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, TouchableOpacity, Image, TextInput, FlatList,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import people from "../../../../assets/data/tipoffs";
import ReferralRequestItem from "../../../components/ReferralRequestItem";
import ReferralItemTopContainer from "./ReferralItemTopContainer";
export default function ReferralItemScreen({route, item}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.navigate('')
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ReferralItemTopContainer item = {item} />
            </View>
            <FlatList
                data={people}
                renderItem={({item}) => <ReferralRequestItem item={item.to} />}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
};

