import React, {useState, useEffect} from 'react';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import Verification from '../screens/Verification';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from '../screens/ForgotPassword';
import CreateProfileScreen from "../screens/SignUpScreen/CreateProfileScreen";
import ForgetPasswordScreen from "../screens/ForgotPassword";
import PasswordResetScreen from "../screens/ForgotPassword/PasswordResetScreen";
import FirstScreen from "../screens/FirstScreen";

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = props => {

    return (
        <AuthenticationStack.Navigator headerShown="false">
                <AuthenticationStack.Screen name="Gig Buster">
                        {screenProps => (
                            <FirstScreen
                                {...screenProps}
                                updateAuthState={props.updateAuthState}
                            />
                        )}
                </AuthenticationStack.Screen>
            <AuthenticationStack.Screen name="SignIn">
                {screenProps => (
                    <SignIn
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="SignUp"
                component={SignUp}
            />
            <AuthenticationStack.Screen
                name="Verification"
            >
                {screenProps => (
                    <Verification
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </AuthenticationStack.Screen>
            <AuthenticationStack.Screen
                name="ForgotPassword"
                component={ForgetPasswordScreen}
            />
            <AuthenticationStack.Screen
                name="PasswordResetScreen"
                component={PasswordResetScreen}
            />
            <AuthenticationStack.Screen
                name="CreateProfileScreen"
                component={CreateProfileScreen}
            />
        </AuthenticationStack.Navigator>
    );
};

export default AuthenticationNavigator;
