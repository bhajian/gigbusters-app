import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text, StyleSheet, FlatList, SafeAreaView,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import loading2 from "../../../assets/images/loading2.gif";
import MessageItem from "../../components/MessageItem";
import Colors from "../../constants/Colors";
import {ProfileService} from "../../backend/ProfileService";
import ProfileSearchBottomSheet from "./ProfileSearchBottomSheet";
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
                    size={35}
                    active
                    userName={profileName}
                    src={profileImage}
                />
            ),
        })
    }, [navigation, profileName])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [])

    async function fetchData() {
        setDataBeingLoaded(true)
        const transactionsObj = await taskService.fetchMyTransaction({
            limit: 2000,
            persona: 'CONSUMER'
        })
        setTransactions(transactionsObj)
        setDataBeingLoaded(false)
    }
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
        const transactionsObj = taskService.getMyTransactions()
        setTransactions(transactionsObj)
        setDataBeingLoaded(false)
    }

    const handleSheetChanges = useCallback((value) => {
    }, [])

    async function onChatPressed(params) {
        navigation.navigate('ConsumerChatScreen', {transactionId: params?.transaction?.id})
    }

    async function onProfilePressed(params) {
        params.uri = params.accountCode
        navigation.navigate('ReviewableProfileScreen', {reviewable: params})
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
                        onRefresh={fetchData}
                        refreshing={dataBeingLoaded}
                        keyExtractor={(item) => item?.transaction?.id}
                    />
            }
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
