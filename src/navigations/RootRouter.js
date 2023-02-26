import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConsumerTabNavigator from './ConsumerTabNavigator';
import WorkerTabNavigator from "./WorkerTabNavigator";
import {ProfileService} from "../backend/ProfileService";
import LocationSelectorScreen from "../components/LocationSearch/LocationSelectorScreen";

const Stack = createNativeStackNavigator();

const RootRouter = props => {
    const profileService = new ProfileService()
    const [accountType, setAccountType] = useState('USER')

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
            {accountType === 'USER' && (
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
            <Stack.Screen
                name={'LocationSelectorScreen'}
                component={LocationSelectorScreen}
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
        </Stack.Navigator>
    );
};

export default RootRouter;
