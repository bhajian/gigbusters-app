import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, StyleSheet, Animated} from 'react-native';
import styles from './styles';
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import PhonebookModal from "../../components/PhonebookModal";
import ProfilePicture from "../../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";
import {SearchCategory} from "../../components/SearchCategory";
import {Slider} from "react-native-elements";
import ChoiceSelector from "../../components/ChoiceSelector";

const HomeScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
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
                    // onPress={toggleModal}
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
                        // onClose={toggleModal}
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
            <SearchCategory navigation={navigation} />
            <SearchCategory navigation={navigation} />
            <Slider
                // value={this.state.value}
                // onValueChange={(value) => this.setState({value})}
                thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.light.tint }}
                trackStyle={{ height: 5, backgroundColor: 'transparent' }}
            />
            <ChoiceSelector/>
        </View>
    );
};

export default HomeScreen;
