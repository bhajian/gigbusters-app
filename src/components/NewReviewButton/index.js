import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import PhonebookModal from '../PhonebookModal';
import {AntDesign} from "@expo/vector-icons";

export default function NewReviewButton() {

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('NewReviewScreen', {navigation: navigation});
    };

    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onPress}>
            <AntDesign name="plus" size={27} color="white"/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
