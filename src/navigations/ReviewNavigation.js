import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewReviewScreen from '../screens/NewReview';
import ReviewScreen from "../screens/ReviewScreen";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";

const Stack = createNativeStackNavigator();

export function ReviewNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'All'}
                component={ReviewScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    // headerLargeTitle: true,
                    tabBarIcon: ({color}) => (
                        <Fontisto name="react" size={25} color={color}/>
                    )
                }}
            />
            <Stack.Screen
                name={'NewReview'}
                component={NewReviewScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};