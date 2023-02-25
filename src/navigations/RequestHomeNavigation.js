import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkRequestScreen from "../screens/WorkRequestScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import WorkerRequestCompletionScreen from "../screens/WorkRequestScreen/WorkerRequestCompletionScreen";
import RequestCompletedScreen from "../screens/WorkRequestScreen/RequestCompletedScreen";
import RequestActivityScreen from "../screens/RequestActivityScreen";

const Stack = createNativeStackNavigator();

export function RequestHomeNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={WorkRequestScreen}
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

            <Stack.Screen
                name={'RequestReferralScreen'}
                component={WorkerRequestCompletionScreen}
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
            <Stack.Screen
                name={'RequestCompletedScreen'}
                component={RequestCompletedScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'RequestActivityScreen'}
                component={RequestActivityScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
