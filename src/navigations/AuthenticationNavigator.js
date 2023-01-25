import React, {useState, useEffect} from 'react';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import Verification from '../screens/Verification';
import {createStackNavigator} from '@react-navigation/stack';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = props => {

  return (
    <AuthenticationStack.Navigator headerShown="false">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="Verification"
        component={Verification}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
