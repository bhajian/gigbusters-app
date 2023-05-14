import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Image,
    Text, StyleSheet, FlatList, SafeAreaView,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import loading2 from "../../../assets/images/loading2.gif";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import NotificationItem from "../../components/NotificationItem";
import {NotificationService} from "../../backend/NotificationService";
import * as Notifications from 'expo-notifications'
import {ProfileService} from "../../backend/ProfileService";

export default function NotificationScreen({updateAccountType, updateAuthState}) {

    const profileService = new ProfileService()
    const [notifications, setNotifications] = useState([])
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined)
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const navigation = useNavigation()

    const notificationService = new NotificationService()

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
        const notificationsObj = await notificationService.fetchNotifications({
            limit: 100,
            lastEvaluatedKey: lastEvaluatedKey
        })
        setNotifications(notificationsObj)
        await Notifications.setBadgeCountAsync(0)
        setDataBeingLoaded(false)
    }

    async function switchAccountType () {
        const profile = profileService.getProfile()
        navigation.navigate('SwitchRoleScreen', {
            accountType: profile.accountType
        })
    }

    async function onPressed(params) {
        const profile = profileService.getProfile()
        if(params?.notification?.type === 'APPLICATION_ACCEPTED'){
            if(profile.accountType === 'CONSUMER'){
                await switchAccountType()
            } else{
                navigation.navigate('WorkerChatScreen', {
                    transactionId: params?.notification?.transactionId
                })
            }
        }
        if(params?.notification?.type === 'NEW_APPLICATION' ||
            params?.notification?.type === 'NEW_REFERRAL'){
            if(profile.accountType === 'WORKER'){
                await switchAccountType()
            } else{
                navigation.navigate('ConsumerChatScreen', {
                    transactionId: params?.notification?.transactionId
                })
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={notifications}
                        renderItem={({item}) => {
                            return(
                                <NotificationItem
                                    notification={item}
                                    accountType={"WORKER"}
                                    onPressed={onPressed}
                                />
                            )
                        }}
                        keyExtractor={(item) => item?.notification?.id}
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
