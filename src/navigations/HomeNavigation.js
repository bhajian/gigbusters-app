import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NewReviewScreen from '../screens/NewReview';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
import EditEmailScreen from '../screens/ProfileScreen/EditEmailScreen';
import UpgradePremiumScreen from '../screens/UpgradePremiumScreen';

const Stack = createNativeStackNavigator();

export function HomeNavigation(props) {
  return (
    <Stack.Navigator>
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
