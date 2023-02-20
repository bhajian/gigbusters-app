import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewReviewScreen from '../screens/NewReviewScreen';
import ReviewScreen from "../screens/ReviewScreen";
import Colors from "../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import SearchCategory from "../components/SearchCategory/SearchPage";
import ReviewableProfileScreen from "../screens/ReviewableProfileScreen";
import MoreInfoSubmissionScreen from "../screens/NewReviewScreen/MoreInfoSubmissionScreen";
import AccountSearchReviewScreen from "../screens/NewReviewScreen/AccountSearchReviewScreen";

const Stack = createNativeStackNavigator();

export function ReviewNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'MainReview'}
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
                name={'NewReviewScreen'}
                component={NewReviewScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'SearchCategory'}
                component={SearchCategory}
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
            <Stack.Screen
                name={'ReviewableProfileScreen'}
                component={ReviewableProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'MoreInfoSubmissionScreen'}
                component={MoreInfoSubmissionScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'AccountSearchReviewScreen'}
                component={AccountSearchReviewScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
