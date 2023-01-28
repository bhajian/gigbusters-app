import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const RootRouter = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'App'}
                options={{
                    headerShown: false,
                }}>
                {screenProps => (
                    <TabNavigator
                        {...screenProps}
                        updateAuthState={props.updateAuthState}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default RootRouter;
