import React, {useState, useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import CreateProfileScreen from "../screens/SignUpScreen/CreateProfileScreen"
import CompleteProfileScreen from "../screens/SignUpScreen/CompleteProfileScreen";

const ProfileCreationStack = createStackNavigator()

const ProfileCreationNavigator = props => {

    return (
        <ProfileCreationStack.Navigator headerShown="false">
            <ProfileCreationStack.Screen
                name="CreateProfileScreen"
            >
                {screenProps => (
                    <CreateProfileScreen
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </ProfileCreationStack.Screen>
            <ProfileCreationStack.Screen
                name="CompleteProfileScreen"
            >
                {screenProps => (
                    <CompleteProfileScreen
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}

            </ProfileCreationStack.Screen>
        </ProfileCreationStack.Navigator>
    );
};

export default ProfileCreationNavigator
