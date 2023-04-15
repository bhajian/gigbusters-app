import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome, FontAwesome5, Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {ReviewNavigation} from "./ReviewNavigation";
import {ProfileNavigation} from "./ProfileNavigation";
import {ConsumerActivityNavigation} from "./ConsumerActivityNavigation";
import {ReferralFeedNavigation} from "./ReferralFeedNavigation";
import {MessageNavigation} from "./MessageNavigation";

const Tab = createBottomTabNavigator();

const ConsumerTabNavigator = props => {

    return (
        <Tab.Navigator screenOptions={{}}>
            <Tab.Screen
                name={'Home'}
                component={ConsumerActivityNavigation}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: false,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={25} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name={'Neighborhood'}
                component={ReferralFeedNavigation}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: false,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <FontAwesome name="feed" size={25} color={color}/>
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
                name={'Messages'}
                component={MessageNavigation}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="message" size={25} color={color}/>
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
