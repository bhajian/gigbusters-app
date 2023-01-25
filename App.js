import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import awsconfig from './src/backend/aws-exports';
import {Amplify, Auth} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import Router from "./src/navigations/Router";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import NewTipoffButton from "./src/components/NewTipoffButton";
Amplify.configure(awsconfig);

export default function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  useEffect(() => {
    checkAuthState()
        .then()
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
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && (
            <Router updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === 'loggedOut' && (
            <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
  );
}

const Initializing = () => {
  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="tomato" />
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
