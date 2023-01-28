import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, StyleSheet} from 'react-native';
import styles from './styles';
import Feed from '../../components/Feed';
import NewReviewButton from '../../components/NewReviewButton';
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import PhonebookModal from "../../components/PhonebookModal";
import ProfilePicture from "../../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: true,
            headerLeftContainerStyle: {
                left: 10,
            },
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <MaterialIcons
                    name="rate-review"
                    size={25}
                    color={Colors.light.tint}
                    style={{marginRight: 15}}
                />
            ),
            headerRight: () => (
                <Pressable
                    onPress={toggleModal}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <FontAwesome5
                        name="plus"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                    <PhonebookModal
                        visibility={isModalVisible}
                        onClose={toggleModal}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <ProfilePicture
                    size={30}
                    image={
                        'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250'
                    }
                />
            ),
        })
    }, [navigation]);

    return (
        <View style={styles.container}>

        </View>
    );
};

export default HomeScreen;
