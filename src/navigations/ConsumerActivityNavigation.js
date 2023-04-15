import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestActivityScreen from "../screens/RequestActivityScreen";
import TaskDetailScreen from "../screens/RequestActivityScreen/TaskDetailScreen";

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
                name={'TaskDetailScreen'}
                component={TaskDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};
