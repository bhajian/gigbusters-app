import {AppState, StyleSheet, Text, View} from 'react-native';
import awsconfig from './src/backend/aws-exports';
import {Amplify, Auth, Hub} from "aws-amplify";
import React, {useEffect, useRef, useState} from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import RootRouter from "./src/navigations/RootRouter";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import Lottie from 'lottie-react-native';
import loadingAnim from './assets/animations/136078-feesbee-section-2.json'
import ProfileCreationNavigator from "./src/navigations/ProfileCreationNavigator";
import {ProfileService} from "./src/backend/ProfileService";
import Initializing from "./src/components/Initializing";

Amplify.configure(awsconfig);

export default function App() {
    const profileService = new ProfileService()
    const appState = useRef(AppState.currentState)

    const [userStatus, setUserStatus] = useState('initializing')


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
