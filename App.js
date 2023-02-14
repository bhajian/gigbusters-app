import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import awsconfig from './src/backend/aws-exports';
import {Amplify, Auth} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import RootRouter from "./src/navigations/RootRouter";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import Lottie from 'lottie-react-native';
import loadingAnim from './assets/animations/136078-feesbee-section-2.json'


Amplify.configure(awsconfig);

export default function App() {
    const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
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
            setUserLoggedIn('loggedIn')
        } catch (err) {
            setUserLoggedIn('loggedOut')
        }
    }

    function updateAuthState(isUserLoggedIn) {
        setUserLoggedIn(isUserLoggedIn)
    }

    return (
        <NavigationContainer>
            {isUserLoggedIn === 'initializing' && <Initializing/>}
            {isUserLoggedIn === 'loggedIn' && (
                <RootRouter updateAuthState={updateAuthState}/>
            )}
            {isUserLoggedIn === 'loggedOut' && (
                <AuthenticationNavigator updateAuthState={updateAuthState}/>
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
