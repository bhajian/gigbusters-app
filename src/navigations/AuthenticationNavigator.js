import React, {useState, useEffect} from 'react';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ForgetPasswordScreen from "../screens/ForgotPassword";
import PasswordResetScreen from "../screens/ForgotPassword/PasswordResetScreen";
import FirstScreen from "../screens/FirstScreen";

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = props => {

    return (
        <AuthenticationStack.Navigator headerShown="false">
                <AuthenticationStack.Screen name="Gig Busters">
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
                    <VerificationScreen
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
        </AuthenticationStack.Navigator>
    );
};

export default AuthenticationNavigator;
