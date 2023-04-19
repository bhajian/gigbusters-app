import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Pressable,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import loading2 from "../../../assets/images/loading2.gif";
import MessageItem from "../../components/MessageItem";
import tipoffs from "../../../assets/data/tipoffs";
import Colors from "../../constants/Colors";
import {ProfileService} from "../../backend/ProfileService";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {TaskService} from "../../backend/TaskService";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import NotificationItem from "../../components/NotificationItem";

export default function NotificationScreen() {
    const [profileName, setProfileName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const navigation = useNavigation()

    const profileService = new ProfileService()
    const taskService = new TaskService()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Ionicons name="notifications-sharp" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Notifications</Text>
            ),
        })
    }, [navigation])

    async function loadData() {
        setDataBeingLoaded(true)

        setDataBeingLoaded(false)
    }

    async function onChatPressed(params) {
        navigation.navigate('ConsumerChatScreen', params)
    }

    async function onProfilePressed(params) {
        navigation.navigate('ReviewableProfileScreen', {reviewable: tipoffs[0]})
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={tipoffs}
                        renderItem={({item}) => {
                            return(
                                <NotificationItem
                                    notification={item}
                                    accountType={"WORKER"}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.id}
                    />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        alignItems: "stretch",
        height: '100%'
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        margin: 30
    },
    logo: {
        width: '100%',
        height: 500,
    },
    text:{
        textAlign: "center",
    },
    textLogo: {
        textAlign: "center",
        fontSize: 41,
        color: "#5B67CA"
    },
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
    loading2: {
        width: 100,
        height: 100,
        top: 150,
        alignSelf: 'center'
    },
})
