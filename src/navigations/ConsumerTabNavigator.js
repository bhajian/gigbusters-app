import React, {useEffect, useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Colors from '../constants/Colors'
import {StyleSheet, View} from 'react-native'
import {FontAwesome, FontAwesome5, Ionicons, MaterialIcons, Octicons} from "@expo/vector-icons"
import {ProfileNavigation} from "./ProfileNavigation"
import {ReferralFeedNavigation} from "./ReferralFeedNavigation"
import ReviewScreen from "../screens/ReviewScreen"
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen"
import RequestActivityScreen from "../screens/RequestActivityScreen"
import UserAvatar from "@muhzi/react-native-user-avatar"
import {ProfileService} from "../backend/ProfileService"
import ConsumerMessageListScreen from "../screens/ConsumerMessageScreen/ConsumerMessageListScreen";

const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

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
                name={'Worker Reviews'}
                component={ReviewScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                }}
            />
        </TopTab.Navigator>
    )
}

const ConsumerTabNavigator = props => {
    const profileService = new ProfileService()
    const profile = profileService.getProfile()

    const [profileName, setProfileName] = useState(profile.name)
    const [profileImage, setProfileImage] = useState(profile.mainPhotoUrl)

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
                    headerLeft: () => (
                        <View style={{marginLeft: 5}}>
                            <UserAvatar
                                size={35}
                                active
                                fontSize={20}
                                backgroundColor={Colors.light.turquoise}
                                userName={profileName}
                                src={profileImage}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Messages'}
                // component={ConsumerMessageListScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="message" size={25} color={color}/>
                    )
                }}
            >
                {screenProps => (
                    <ConsumerMessageListScreen
                        {...screenProps}
                        updateAccountType={props.updateAccountType}
                        updateAuthState={props.updateAuthState}
                        appState={props.appState}
                        notification={props.notification}
                    />
                )}
            </Tab.Screen>
            {/*<Tab.Screen*/}
            {/*    name={'Messages'}*/}
            {/*    component={MessageNavigation}*/}
            {/*    options={{*/}
            {/*        tabBarActiveTintColor: Colors.light.tint,*/}
            {/*        headerShown: false,*/}
            {/*        tabBarIcon: ({color}) => (*/}
            {/*            <MaterialIcons name="message" size={25} color={color}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
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
