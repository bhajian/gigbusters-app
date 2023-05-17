import {AppState, Linking, Platform, StyleSheet} from 'react-native'
import awsconfig from './src/backend/aws-exports-prd'
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
import * as ELinking from 'expo-linking'

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

const prefix = ELinking.createURL('/')
export default function App() {
    const profileService = new ProfileService()
    const appStateRef = useRef(AppState.currentState)
    const linking = {
        prefixes: [prefix],
        async getInitialURL() {
            const url = await Linking.getInitialURL()

            if (url != null) {
                return url
            }
        },
        subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);
            // Listen to incoming links from deep linking
            const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
            // Listen to expo push notifications
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                const notificationType = response?.notification?.request?.content?.data?.extraData?.notificationType
                if(notificationType.startsWith('Worker')){
                    const profile = profileService.getProfile()
                    if(profile){
                        profile.accountType = 'WORKER'
                    }
                }
                listener(prefix + notificationType)
            })
            return () => {
                eventListenerSubscription.remove()
                subscription.remove()
            }
        },
    }

    const [notification, setNotification] = useState({})
    const [userStatus, setUserStatus] = useState('initializing')
    const [appState, setAppState] = useState('initializing')

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            setAppState(nextAppState)
            if (
                appStateRef.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkAuthState()
                    .then(() => {
                    })
                    .catch(e => {
                        console.error(e)
                    })
            }
            appStateRef.current = nextAppState
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

    useEffect(() => {
        const profile = profileService.getProfile()
        if(userStatus === 'loggedIn'){
            setPushNotificationsAsync(profile).then(r => {}).catch(e => console.log(e))
        }
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })
        return () => subscription.remove()
    }, [userStatus])

    async function checkAuthState() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            const profile = await profileService.fetchProfile()
            if(currentUser) {
                if (profile && profile.userId &&
                    (profile?.accountType === 'CONSUMER' || profile?.accountType === 'WORKER')
                    && profile?.active) {
                    setUserStatus('loggedIn')
                } else {
                    setUserStatus('profileCreation')
                }
            } else{
                setUserStatus('loggedOut')
            }
        } catch (err) {
            setUserStatus('loggedOut')
        }
    }

    async function setPushNotificationsAsync(profile) {
        const token = await registerForPushNotificationsAsync()
        if(token){
            profile.notificationToken = token
            await profileService.updateProfile(profile)
            return
        }
        return undefined
    }

    async function registerForPushNotificationsAsync() {
        let token
        if (Platform.OS === 'android') {
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
                console.log('Failed to get push token for push notification!')
                return
            }
            token = (await Notifications.getExpoPushTokenAsync()).data
        } else {
            return undefined
        }
        return token
    }

    function updateAuthState(userStatus) {
        setUserStatus(userStatus)
    }

    return (
        <NavigationContainer
            linking={linking}
        >
            {userStatus === 'initializing' && <Initializing/>}
            {userStatus === 'loggedIn' && (
                <RootRouter updateAuthState={updateAuthState} appState={appState} notification={notification}/>
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
