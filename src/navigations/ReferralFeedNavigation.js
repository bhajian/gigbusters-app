import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestActivityDetailScreen from "../screens/RequestActivityScreen/RequestActivityDetailScreen";
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
                component={RequestActivityDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}
