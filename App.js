import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import awsconfig from './src/backend/aws-exports';
import {Amplify, Auth} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import RootRouter from "./src/navigations/RootRouter";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import Lottie from 'lottie-react-native';
import loadingAnim from './assets/animations/135788-happy-delivery.json'
import ProfileCreationNavigator from "./src/navigations/ProfileCreationNavigator";

Amplify.configure(awsconfig);

export default function App() {
    const [userStatus, setUserStatus] = useState('initializing')

    useEffect(() => {
        checkAuthState()
            .then(() => {
            })
            .catch(e => {
                console.error(e);
            });
    }, [])

    async function checkAuthState() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            setUserStatus('loggedIn')
        } catch (err) {
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
