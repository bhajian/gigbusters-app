import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView, TextInput, View,
} from 'react-native';
import styles from './styles';
import {useNavigation} from "@react-navigation/native";
import users from '../../../assets/data/users'
import ReferralRequestItem from "../../components/ReferralRequestItem";

export default function ReferralActivityScreen({route}) {
    const navigation = useNavigation();

    useEffect(() => {

    }, [navigation]);

    function referralActivityClickHandler() {
        navigation.navigate('ReferralItemScreen');
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                renderItem={({item}) => <ReferralRequestItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>

    );
};

