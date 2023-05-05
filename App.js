import {AppState, Linking, Platform, StyleSheet} from 'react-native'
import awsconfig from './src/backend/aws-exports'
import {Amplify, Auth, Hub} from "aws-amplify"
import React, {useEffect, useRef, useState} from "react"
import {NavigationContainer} from "@react-navigation/native"
import RootRouter from "./src/navigations/RootRouter"
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator"
import ProfileCreationNavigator from "./src/navigations/ProfileCreationNavigator"
import {ProfileService} from "./src/backend/ProfileService"
import Initializing from "./src/components/Initializing"
import * as WebBrowser from "expo-web-browser"
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

async function urlOpener(url, redirectUrl) {
    try {
        if(redirectUrl?.endsWith('signout'))
            return
        const {type, url: newUrl} = await WebBrowser.openAuthSessionAsync(
            url,
            redirectUrl
        )
        if (type === "success" && Platform.OS === "ios") {
            WebBrowser.dismissBrowser()
            return Linking.openURL(newUrl)
        }
    }catch (e) {
        console.log(e)
    }
}
awsconfig.Auth.oauth.urlOpener = urlOpener

Amplify.configure(awsconfig)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
})
export default function App() {
    const profileService = new ProfileService()
    const appState = useRef(AppState.currentState)
    const notificationListener = useRef()
    const responseListener = useRef()

    const [notification, setNotification] = useState(false)
    const [userStatus, setUserStatus] = useState('initializing')

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkAuthState()
                    .then(() => {
                    })
                    .catch(e => {
                        console.error(e)
                    })
            }
            appState.current = nextAppState
        })
        return () => {
            subscription.remove()
        }
    }, [])

    useEffect(() => {
        const unsubscribe = Hub.listen("auth",
            ({ payload: { event, data } }) => {
            if(event === 'parsingCallbackUrl'){
                setUserStatus('initializing')
            }
            checkAuthState()
                .then(() => {
                })
                .catch(e => {
                    console.error(e)
                })
        })
        checkAuthState()
            .then(() => {
            })
            .catch(e => {
                console.error(e)
            })
        return unsubscribe
    }, [])

    async function checkAuthState() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            const profile = await profileService.fetchProfile({
                userId: currentUser.sub
            })
            if(currentUser) {
                if (profile && profile.userId &&
                    (profile.accountType === 'CONSUMER' || profile.accountType === 'WORKER')
                    && profile.active) {
                    setUserStatus('loggedIn')
                    return await setPushNotificationsAsync(profile)
                } else {
                    setUserStatus('profileCreation')
                }
            } else{
                setUserStatus('loggedOut')
            }
        } catch (err) {
            // console.error(err)
            setUserStatus('loggedOut')
        }
    }

    async function setPushNotificationsAsync(profile) {
        const token = await registerForPushNotificationsAsync()
        if(token){
            profile.notificationToken = token
            await profileService.updateProfile(profile)

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                // setNotification(notification)
            })
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                // console.log(response)
            })
            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current)
                Notifications.removeNotificationSubscription(responseListener.current)
            }
        }
        return undefined
    }

    async function registerForPushNotificationsAsync() {
        let token
        if (Device.modelName === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            token = (await Notifications.getExpoPushTokenAsync()).data
            console.log(token)
        } else {
            return undefined
        }
        return token
    }

    function updateAuthState(userStatus) {
        setUserStatus(userStatus)
    }

    return (
        <NavigationContainer>
            {userStatus === 'initializing' && <Initializing/>}
            {userStatus === 'loggedIn' && (
                <RootRouter updateAuthState={updateAuthState}/>
            )}
            {userStatus === 'loggedOut' && (
                <AuthenticationNavigator
                    updateAuthState={updateAuthState}
                />
            )}
            {userStatus === 'profileCreation' && (
                <ProfileCreationNavigator
                    updateAuthState={updateAuthState}
                />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
