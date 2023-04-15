import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from "../constants/Colors";
import ConsumerMessageListScreen from "../screens/CuncumerMessageScreen/ConsumerMessageListScreen";
import {MaterialIcons} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export function MessageNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'ConsumerMessageListScreen'}
                component={ConsumerMessageListScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="message" size={25} color={color}/>
                    )
                }}
            />
            {/*<Stack.Screen*/}
            {/*    name={'CuncumerMessageScreen'}*/}
            {/*    component={CuncumerMessageScreen}*/}
            {/*    options={{*/}
            {/*        headerShown: true,*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
};
