import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestActivityScreen from "../screens/RequestActivityScreen";
import RequestActivityDetailScreen from "../screens/RequestActivityScreen/RequestActivityDetailScreen";
import ReviewableProfileScreen from "../screens/ReviewableProfileScreen";
import GigRequestDetailScreen from "../screens/GigRequestScreen/GigRequestDetailScreen";
import RequestCompletedScreen from "../screens/GigRequestScreen/RequestCompletedScreen";

const Stack = createNativeStackNavigator();

export function ConsumerActivityNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'RequestActivityScreen'}
                component={RequestActivityScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'RequestActivityDetailScreen'}
                component={RequestActivityDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'ReviewableProfileScreen'}
                component={ReviewableProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'GigRequestDetailScreen'}
                component={GigRequestDetailScreen}
                options={{
                    headerShown: true,
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
        </Stack.Navigator>
    );
};
