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
import Entypo from "react-native-vector-icons/Entypo";
import {ProfileService} from "../../backend/ProfileService";
import ProfileSearchBottomSheet from "./ProfileSearchBottomSheet";
import Fontisto from "react-native-vector-icons/Fontisto";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {TaskService} from "../../backend/TaskService";
import {MaterialIcons} from "@expo/vector-icons";

export default function ConsumerMessageListScreen() {
    const [profileName, setProfileName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null)
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
                <MaterialIcons name="message" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Messages</Text>
            ),
            headerLeft: () => (
                <UserAvatar
                    size={30}
                    active
                    name={profileName}
                    src={profileImage}
                />
            ),
        })
    }, [navigation, profileName])

    async function loadData() {
        setDataBeingLoaded(true)
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setProfileName(profile.name)
        }
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setProfileImage(url)
        }
        const transactionsObj = await taskService.listMyTransaction({
            limit: 20,
            type: 'CONSUMER'
        })
        setTransactions(transactionsObj)
        setDataBeingLoaded(false)
    }

    const handleSheetChanges = useCallback((value) => {
    }, [])

    async function onChatPressed(params) {
        console.log(params)
        navigation.navigate('ConsumerChatScreen', params)
    }

    async function onProfilePressed(params) {
        navigation.navigate('ReviewableProfileScreen', {reviewable: tipoffs[0]})
    }

    const onNewMessagePress = () => {
        bottomSheetModalRef.current.present()
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={transactions}
                        renderItem={({item}) => {
                            return(
                                <MessageItem
                                    transaction={item}
                                    accountType={"CONSUMER"}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.transaction.id}
                    />
            }
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={onNewMessagePress}>
                <Entypo name="new-message" size={27} color="white"/>
            </TouchableOpacity>
            <ProfileSearchBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
            />
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
