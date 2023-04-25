import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome, FontAwesome5, Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {ReviewNavigation} from "./ReviewNavigation";
import {ProfileNavigation} from "./ProfileNavigation";
import {ConsumerActivityNavigation} from "./ConsumerActivityNavigation";
import {ReferralFeedNavigation} from "./ReferralFeedNavigation";
import {MessageNavigation} from "./MessageNavigation";
import ReviewScreen from "../screens/ReviewScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import RequestActivityScreen from "../screens/RequestActivityScreen";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {ProfileService} from "../backend/ProfileService";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <TopTab.Navigator>
            <TopTab.Screen
                name="Post a Task"
                component={RequestActivityScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: false,
                    headerShown: false,
                }}
            />
            <TopTab.Screen
                name={'Worker Pool'}
                component={ReviewScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                }}
            />
        </TopTab.Navigator>
    );
};

const ConsumerTabNavigator = props => {
    // const profileService = new ProfileService()
    // const [profileName, setProfileName] = useState('')
    // const [profileImage, setProfileImage] = useState(null)
    //
    // useEffect(() => {
    //     loadData().then().catch(e => console.log(e))
    // }, [])
    //
    // async function loadData() {
    //     const profile = profileService.getProfile()
    //     if(profile && profile.name){
    //         setProfileName(profile.name)
    //     }
    //     if(profile && profile.photos){
    //         const url = profile.mainPhotoUrl
    //         setProfileImage(url)
    //     }
    // }

    return (
        <Tab.Navigator screenOptions={{}}>
            <TopTab.Screen
                name="Home"
                component={TopTabNavigator}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: false,
                    headerShown: true,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={25} color={color}/>
                    ),
                    headerLeftType: {
                        marginHeight: 10
                    }
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
                name={'Notifications'}
                component={NotificationScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: true,
                    tabBarIcon: ({color}) => (
                        <Ionicons name="notifications-sharp" size={25} color={color}/>
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
    avatar: {
        marginLeft: 10,
    }
});
