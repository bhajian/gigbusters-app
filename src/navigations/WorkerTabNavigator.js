import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import {Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {ProfileNavigation} from "./ProfileNavigation";
import MatchingCards from "../screens/MatchingScreen/matchingCards";
import WorkerMessageListScreen from "../screens/WorkerMessageScreen/WorkerMessageListScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";

const Tab = createBottomTabNavigator();

const WorkerTabNavigator = props => {

    return (
        <Tab.Navigator screenOptions={{}}>
            <Tab.Screen
                name={'Home'}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: true,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="cards" size={25} color={color}/>
                    ),
                }}
            >
                {screenProps => (
                    <MatchingCards
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                        appState={props.appState}
                    />

                )}
            </Tab.Screen>
            <Tab.Screen
                name={'Messages'}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="message" size={25} color={color}/>
                    )
                }}
            >
                {screenProps => (
                    <WorkerMessageListScreen
                        {...screenProps}
                        updateAccountType={props.updateAccountType}
                        updateAuthState={props.updateAuthState}
                        appState={props.appState}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name={'Notifications'}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: true,
                    tabBarIcon: ({color}) => (
                        <Ionicons name="notifications-sharp" size={25} color={color}/>
                    ),
                }}
            >
                {screenProps => (
                    <NotificationScreen
                        {...screenProps}
                        updateAccountType={props.updateAccountType}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </Tab.Screen>
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

export default WorkerTabNavigator;
