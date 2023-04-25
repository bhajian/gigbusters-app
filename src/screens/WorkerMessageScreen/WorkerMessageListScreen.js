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
import {MaterialIcons} from "@expo/vector-icons";

export default function WorkerMessageListScreen() {
    const navigation = useNavigation()
    const profileService = new ProfileService()
    const taskService = new TaskService()
    const profile = profileService.getProfile()

    const [profileName, setProfileName] = useState(profile?.name)
    const [profileImage, setProfileImage] = useState(profile?.mainPhotoUrl)
    const [transactions, setTransactions] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            // headerLargeTitle: true,
            tabBarIcon: ({color}) => (
                <MaterialIcons name="message" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Messages</Text>
            ),
            headerLeft: () => (
                <UserAvatar
                    size={35}
                    userName={profileName}
                    src={profileImage}
                />
            ),
        })
    }, [navigation, profileName])

    async function fetchData() {
        setDataBeingLoaded(true)
        const transactionsObj = await taskService.fetchMyTransaction({
            limit: 2000,
            persona: 'WORKER'
        })
        setTransactions(transactionsObj)
        setDataBeingLoaded(false)
    }

    async function loadData() {
        setDataBeingLoaded(true)
        const transactionsObj = taskService.getMyTransactions()
        setTransactions(transactionsObj)
        setDataBeingLoaded(false)
    }

    async function onChatPressed(params) {
        navigation.navigate('WorkerChatScreen', {transactionId: params?.transaction?.id})
    }

    async function onProfilePressed(params) {
        params.uri = params.accountCode
        navigation.navigate('ReviewableProfileScreen', {reviewable: params})
    }

    const onButtomSheetPressed = () => {
        bottomSheetModalRef.current.present()
    }

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
                                    accountType={"WORKER"}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            )
                        }}
                        onRefresh={fetchData}
                        refreshing={dataBeingLoaded}
                        keyExtractor={(item) => item.transaction.id}
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
