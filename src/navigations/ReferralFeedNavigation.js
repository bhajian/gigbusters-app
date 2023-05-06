import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NeighborhoodFeedScreen from "../screens/NeighborhoodFeedScreen";
import ReferralResponseScreen from "../screens/ReferralResponseScreen";

const Stack = createNativeStackNavigator();

export function ReferralFeedNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'RequestFeedScreen'}
                component={NeighborhoodFeedScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'ReferralResponseScreen'}
                component={ReferralResponseScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
}
