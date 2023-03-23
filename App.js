import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import awsconfig from './src/backend/aws-exports';
import {Amplify, Auth, Hub} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import RootRouter from "./src/navigations/RootRouter";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import Lottie from 'lottie-react-native';
import loadingAnim from './assets/animations/136078-feesbee-section-2.json'
import ProfileCreationNavigator from "./src/navigations/ProfileCreationNavigator";
import {ProfileService} from "./src/backend/ProfileService";
import {TaskService} from "./src/backend/TaskService";

Amplify.configure(awsconfig);

export default function App() {
    const [userStatus, setUserStatus] = useState('initializing')
    const [user, setUser] = useState('initializing')
    const [customState, setCustomStatus] = useState('initializing')
    const profileService = new ProfileService()
    const taskService = new TaskService()

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    checkAuthState()
                        .then(() => {
                        })
                        .catch(e => {
                            console.error(e);
                        })
                    break;
                case "signOut":
                    setUserStatus('loggedOut')
                    break;
                // case "customOAuthState":
                //     setCustomStatus(data);
            }
        })

        return unsubscribe

    }, [])

    async function checkAuthState() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            console.log(currentUser)
            const profile = await profileService.fetchProfile()
            await taskService.fetchMyTasks()
            if(currentUser) {
                if (profile) {
                    setUserStatus('loggedIn')
                } else {
                    setUserStatus('profileCreation')
                }
            } else{
                setUserStatus('loggedOut')
            }
        } catch (err) {
            console.log('ERRRRR')
            console.log(err)
            setUserStatus('loggedOut')
        }
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

const Initializing = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Lottie source={loadingAnim} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
