import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestActivityDetailScreen from "../screens/RequestActivityScreen/TaskDetailScreen";
import NeighborhoodFeedScreen from "../screens/NeighborhoodFeedScreen";

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
        </Stack.Navigator>
    );
}
