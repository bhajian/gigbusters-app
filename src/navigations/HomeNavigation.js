import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";

const Stack = createNativeStackNavigator();

export function HomeNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={25} color={color}/>
                    )
                }}
            />
            <Stack.Screen
                name={'SearchCategory'}
                component={SearchCategory}
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
        </Stack.Navigator>
    );
};
