import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from "../constants/Colors";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import MessageListScreen from "../screens/ChatScreen/MessageList";
import Feather from "react-native-vector-icons/Feather";
import {MaterialIcons} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export function MessageNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'MessageListScreen'}
                component={MessageListScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="message" size={25} color={color}/>
                    )
                }}
            />
            {/*<Stack.Screen*/}
            {/*    name={'ChatScreen'}*/}
            {/*    component={ChatScreen}*/}
            {/*    options={{*/}
            {/*        headerShown: true,*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
};
