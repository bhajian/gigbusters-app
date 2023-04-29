import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Pressable} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Lottie from "lottie-react-native";
import jobAnim from "../../../assets/animations/107800-login-leady.json";
import MatchingCard from "../../components/MatchingCard";
import WorkerTask from "../../components/WorkerTask";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Entypo from "react-native-vector-icons/Entypo";

export default function TaskWorkerScreen({navigation, route}) {
    const {task} = (route.params ? route.params : '')

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text style={styles.name}>Task Details</Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <WorkerTask
                task={task}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        height: 800,
    },

});
