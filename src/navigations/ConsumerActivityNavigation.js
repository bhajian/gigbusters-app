import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestActivityScreen from "../screens/RequestActivityScreen";
import RequestDetailScreen from "../screens/RequestActivityScreen/RequestDetailScreen";

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
                name={'RequestDetailScreen'}
                component={RequestDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};
