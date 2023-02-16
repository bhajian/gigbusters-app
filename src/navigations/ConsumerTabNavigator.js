import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome5, Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {ReviewNavigation} from "./ReviewNavigation";
import {HomeNavigation} from "./HomeNavigation";
import MatchingScreen from "../screens/MatchingScreen";
import {ProfileNavigation} from "./ProfileNavigation";
import ReferralActivityScreen from "../screens/ReferralActivityScreen";

const Tab = createBottomTabNavigator();

const ConsumerTabNavigator = props => {

    return (
        <Tab.Navigator screenOptions={{}}>
            <Tab.Screen
                name={'Home'}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={25} color={color}/>
                    ),
                }}
            >
                {screenProps => (
                    <HomeNavigation
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />

                )}
            </Tab.Screen>
            <Tab.Screen
                name={'Activity'}
                component={ReferralActivityScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: true,
                    tabBarIcon: ({color}) => (
                        <Ionicons name="file-tray-full" size={25} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name={'Review'}
                component={ReviewNavigation}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="react" size={25} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name={'Profile'}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="person" size={25} color={color}/>
                    ),
                }}>
                {screenProps => (
                    <ProfileNavigation
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                        updateAccountType={props.updateAccountType}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ConsumerTabNavigator;

const styles = StyleSheet.create({
    closeButton: {
        paddingEnd: 10,
        paddingTop: 10,
    },
});
