import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkRequestScreen from "../screens/WorkRequestScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import LocationSelectorScreen from "../components/LocationSearch/LocationSelectorScreen";
import WorkerRequestCompletionScreen from "../screens/WorkRequestScreen/WorkerRequestCompletionScreen";
import RequestCompletedScreen from "../screens/WorkRequestScreen/RequestCompletedScreen";
import ReferralActivityScreen from "../screens/ReferralActivityScreen";
import ReferralItemScreen from "../screens/ReferralActivityScreen/ReferralItemScreen";

const Stack = createNativeStackNavigator();

export function ConsumerActivityNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'ReferralActivityScreen'}
                component={ReferralActivityScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'ReferralItemScreen'}
                component={ReferralItemScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};
