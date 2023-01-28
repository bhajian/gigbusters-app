import React, {useEffect, useState} from "react";
import {View, Text, ImageBackground, Pressable, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feed from "../../components/Feed";
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import NewReviewButton from "../../components/NewReviewButton";


export default function SearchScreen(props) {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            // headerLargeTitle: true,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <View style={styles.searchBarContainer}>
                    <TouchableOpacity style={styles.searchInput}>
                        <Fontisto name="search" size={17} color="grey" />
                        <Text> Search </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <MaterialCommunityIcons name="tune" size={20} color="grey" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation]);

    return (
        <View style={styles.contentContainer}>
            <Feed/>
            <NewReviewButton/>
        </View>
    )
};

