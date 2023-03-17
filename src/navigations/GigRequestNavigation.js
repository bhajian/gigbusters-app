import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkRequestScreen from "../screens/GigRequestScreen";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import GigRequestDetailScreen from "../screens/GigRequestScreen/GigRequestDetailScreen";
import RequestCompletedScreen from "../screens/GigRequestScreen/RequestCompletedScreen";

const Stack = createNativeStackNavigator();

export function GigRequestNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'GigRequestScreen'}
                component={WorkRequestScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="home" size={25} color={color}/>
                    )
                }}
            />
            <Stack.Screen
                name={'GigRequestDetailScreen'}
                component={GigRequestDetailScreen}
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
            {/*<Stack.Screen*/}
            {/*    name={'RequestActivityScreen'}*/}
            {/*    component={RequestActivityScreen}*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
};
