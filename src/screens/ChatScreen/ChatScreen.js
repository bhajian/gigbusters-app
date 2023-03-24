import React, {useEffect, useState} from "react";
import {StyleSheet, KeyboardAvoidingView, FlatList, ImageBackground, Platform, Text, Pressable} from "react-native";
import tipoffs from "../../../assets/data/tipoffs";
import Message from "../../components/Message"
import bg from "../../../assets/images/chatbg.png"
import InputBox from "../../components/InputBox";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {useNavigation} from "@react-navigation/native";

const ChatScreen = (props) => {
    const [name, setName] = useState('John Doe')

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Pressable
                    // onPress={handlePresentPress}
                    style={[({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    }), styles.avatar]}>
                    <UserAvatar
                        size={30}
                        name={name}
                        src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                    <Text style={styles.name}>{name}</Text>
                </Pressable>

            ),
            headerRight: () => (
                <Pressable
                    // onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="account-search"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </Pressable>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
            style={styles.container}
        >
            <ImageBackground source={bg} style={styles.bg}>
                <FlatList
                    data={tipoffs}
                    renderItem={({ item }) => <Message message={item} />}
                    style={styles.list}
                    keyExtractor={(item) => item.id}
                    inverted
                />
                <InputBox />
            </ImageBackground>
        </KeyboardAvoidingView>
    )
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    bg: {
        flex: 2,
    },
    list: {
        padding: 5,
    },
    avatar: {
        flexDirection: 'row'
    },
    name: {
        alignSelf: 'center',
        marginLeft: 10
    }
});
