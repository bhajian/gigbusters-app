import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, TouchableOpacity, Image, TextInput, FlatList,} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import users from '../../../assets/data/users'
import tipoffs from "../../../assets/data/tipoffs";
import Reviewable from "../../components/Reviewable";
import ReferralRequestItem from "../../components/ReferralRequestItem";
import ReferralItemTopContainer from "./ReferralItemScreen/ReferralItemTopContainer";
export default function ReferralActivityScreen({route}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

    function referralActivityClickHandler() {
        navigation.navigate('ReferralItemScreen');
    }

    return (
        <View style={styles.container}>
            {/*<View style={styles.topContainer}>*/}
                {/*<View style={styles.headerContainer}>*/}
                {/*    <View style={styles.headerLeft}>*/}
                {/*        <TouchableOpacity*/}
                {/*            onPress={() => navigation.goBack()}*/}
                {/*            style={styles.backButton}>*/}
                {/*            <FontAwesome name="chevron-left" style={styles.backIcon}/>*/}
                {/*            <Text style={styles.backIcon}>  Back </Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*</View>*/}
            {/*</View>*/}
            <FlatList
                data={users}
                renderItem={({item}) => <ReferralRequestItem handler={referralActivityClickHandler} item={item} />}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
};

