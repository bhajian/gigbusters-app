import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import {FontAwesome, Ionicons, Octicons} from "@expo/vector-icons";
import {ReviewNavigation} from "./ReviewNavigation";
import {ProfileNavigation} from "./ProfileNavigation";
import RequestActivityScreen from "../screens/RequestActivityScreen";
import MatchingCards from "../screens/MatchingScreen/matchingCards";
import {ReferralFeedNavigation} from "./ReferralFeedNavigation";
import WorkerActivityLogScreen from "../screens/WorkerActivityLogScreen";

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
                        <Octicons name="stack" size={25} color={color}/>
                    ),
                }}
            >
                {screenProps => (
                    <MatchingCards
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />

                )}
            </Tab.Screen>
            <Tab.Screen
                name={'Neighbor Requests'}
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
                name={'Activity Log'}
                component={WorkerActivityLogScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: true,
                    headerShown: true,
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

export default WorkerTabNavigator;
