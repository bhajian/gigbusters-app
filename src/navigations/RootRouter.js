import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConsumerTabNavigator from './ConsumerTabNavigator';
import WorkerTabNavigator from "./WorkerTabNavigator";
import {ProfileService} from "../backend/ProfileService";
import LocationSelectorScreen from "../components/LocationSearch/LocationSelectorScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import RequestGigScreen from "../screens/RequestGigScreen/MainScreen";
import RequestCompletedScreen from "../screens/RequestGigScreen/RequestCompletedScreen";
import ReviewableProfileScreen from "../screens/ReviewableProfileScreen";

const Stack = createNativeStackNavigator()

const RootRouter = props => {
    const profileService = new ProfileService()
    const [accountType, setAccountType] = useState('CONSUMER')

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, []);

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        setAccountType(profile.accountType)
    }
    function updateAccountType(type) {
        setAccountType(type)
    }

    return (
        <Stack.Navigator>
            {accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'Consumer'}
                    options={{
                        headerShown: false,
                    }}>
                    {screenProps => (
                        <ConsumerTabNavigator
                            {...screenProps}
                            updateAuthState={props.updateAuthState}
                            updateAccountType={updateAccountType}
                        />
                    )}
                </Stack.Screen>
            )}
            {accountType === 'WORKER' && (
                <Stack.Screen
                    name={'Worker'}
                    options={{
                        headerShown: false,
                    }}>
                    {screenProps => (
                        <WorkerTabNavigator
                            {...screenProps}
                            updateAuthState={props.updateAuthState}
                            updateAccountType={updateAccountType}
                        />
                    )}
                </Stack.Screen>
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'LocationSelectorScreen'}
                    component={LocationSelectorScreen}
                    options={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'SearchCategory'}
                    component={SearchCategory}
                    options={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'ChatScreen'}
                    component={ChatScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'RequestGigScreen'}
                    component={RequestGigScreen}
                    options={{
                        headerShown: true,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'RequestCompletedScreen'}
                    component={RequestCompletedScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'ReviewableProfileScreen'}
                    component={ReviewableProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>

    );
};

export default RootRouter;
