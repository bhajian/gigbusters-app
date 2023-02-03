import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PhoneBookScreen from '../screens/PhoneBookScreen';
import Colors from '../constants/Colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ProfilePicture from '../components/ProfilePicture';
import ReviewScreen from '../screens/ReviewScreen';
import HomeScreen from '../screens/HomeScreen';
import PhoneBook from '../components/PhoneBook';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PhonebookModal from '../components/PhonebookModal';
import {FontAwesome5, MaterialIcons, Octicons} from "@expo/vector-icons";
import {ReviewNavigation} from "./ReviewNavigation";
import {HomeNavigation} from "./HomeNavigation";

const Tab = createBottomTabNavigator();

const TabNavigator = props => {

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
                name={'Match'}
                component={PhoneBookScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerLargeTitle: true,
                    tabBarIcon: ({color}) => (
                        <Octicons name="stack" size={25} color={color}/>
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
                    <ProfileScreen
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    closeButton: {
        paddingEnd: 10,
        paddingTop: 10,
    },
});
