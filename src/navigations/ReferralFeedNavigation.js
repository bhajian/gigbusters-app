import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestDetailScreen from "../screens/RequestActivityScreen/RequestDetailScreen";
import RequestFeedScreen from "../screens/RequestFeedScreen";

const Stack = createNativeStackNavigator();

export function ReferralFeedNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'RequestFeedScreen'}
                component={RequestFeedScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'RequestDetailScreen'}
                component={RequestDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}
