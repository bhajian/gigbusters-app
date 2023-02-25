import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkRequestScreen from "../screens/WorkRequestScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import LocationSelectorScreen from "../components/LocationSearch/LocationSelectorScreen";
import WorkerRequestCompletionScreen from "../screens/WorkRequestScreen/WorkerRequestCompletionScreen";
import RequestCompletedScreen from "../screens/WorkRequestScreen/RequestCompletedScreen";
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
};
