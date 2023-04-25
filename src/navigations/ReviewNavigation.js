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
import RequestCompletedScreen from "../screens/NewReviewScreen/RequestCompletedScreen";

const Stack = createNativeStackNavigator()

export function ReviewNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'MainReview'}
                component={ReviewScreen}
                options={{
                    tabBarActiveTintColor: Colors.light.tint,
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};
