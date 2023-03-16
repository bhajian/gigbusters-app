import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import EditEmailScreen from '../screens/ProfileScreen/EditEmailScreen';
import UpgradePremiumScreen from '../screens/UpgradePremiumScreen';
import ProfileScreen from "../screens/ProfileScreen";
import EditPhoneScreen from "../screens/ProfileScreen/EditPhoneScreen";
import VerifyPasswordScreen from "../screens/ProfileScreen/VerifyPasswordScreen";
import VerifyCodeScreen from "../screens/ProfileScreen/VerifyCodeScreen";
import EditSettingsScreen from "../screens/ProfileScreen/EditSettingsScreen";

const Stack = createNativeStackNavigator()

export function ProfileNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'MainProfileScreen'}
                options={{
                    headerShown: false,
                }}
            >
                {screenProps => (
                    <ProfileScreen
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                        updateAccountType={props.updateAccountType}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen
                name={'EditProfile'}
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'EditEmailScreen'}
                component={EditEmailScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'EditPhoneScreen'}
                component={EditPhoneScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'VerifyPasswordScreen'}
                component={VerifyPasswordScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'VerifyCodeScreen'}
                component={VerifyCodeScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'UpgradePremium'}
                component={UpgradePremiumScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'EditSettingsScreen'}
                component={EditSettingsScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};
