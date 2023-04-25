import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConsumerTabNavigator from './ConsumerTabNavigator';
import WorkerTabNavigator from "./WorkerTabNavigator";
import {ProfileService} from "../backend/ProfileService";
import LocationSelectorScreen from "../components/LocationSearch/LocationSelectorScreen";
import SearchCategory from "../components/SearchCategory/SearchPage";
import ConsumerChatScreen from "../screens/ConsumerMessageScreen/ConsumerChatScreen";
import RequestGigScreen from "../screens/RequestGigScreen/MainScreen";
import RequestCompletedScreen from "../screens/RequestGigScreen/RequestCompletedScreen";
import ReviewableProfileScreen from "../screens/ReviewableProfileScreen";
import WorkerChatScreen from "../screens/WorkerMessageScreen/WorkerChatScreen";
import NewReviewScreen from "../screens/NewReviewScreen";
import MoreInfoSubmissionScreen from "../screens/NewReviewScreen/MoreInfoSubmissionScreen";
import AccountSearchReviewScreen from "../screens/NewReviewScreen/AccountSearchReviewScreen";
import TaskDetailScreen from "../screens/RequestActivityScreen/TaskDetailScreen";
import {TaskService} from "../backend/TaskService";

const Stack = createNativeStackNavigator()

const RootRouter = props => {
    const profileService = new ProfileService()
    const taskService = new TaskService()
    const profile = profileService.getProfile()

    const [accountType, setAccountType] = useState(profile.accountType)

    useEffect(() => {
        loadData().then(r => {})
    }, [])

    async function loadData() {

        await taskService.fetchMyTransaction({
            limit: 2000,
            persona: profile.accountType
        })
        // setAccountType(profile.accountType)
    }
    function updateAccountType(type) {
        setAccountType(type)
    }

    return (
        <Stack.Navigator>
            {accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'Consumer'}
                    options={{
                        headerShown: false,
                    }}>
                    {screenProps => (
                        <ConsumerTabNavigator
                            {...screenProps}
                            updateAuthState={props.updateAuthState}
                            updateAccountType={updateAccountType}
                        />
                    )}
                </Stack.Screen>
            )}
            {accountType === 'WORKER' && (
                <Stack.Screen
                    name={'Worker'}
                    options={{
                        headerShown: false,
                    }}>
                    {screenProps => (
                        <WorkerTabNavigator
                            {...screenProps}
                            updateAuthState={props.updateAuthState}
                            updateAccountType={updateAccountType}
                        />
                    )}
                </Stack.Screen>
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'LocationSelectorScreen'}
                    component={LocationSelectorScreen}
                    options={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'SearchCategory'}
                    component={SearchCategory}
                    options={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'ConsumerChatScreen'}
                    component={ConsumerChatScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {accountType === 'WORKER' && (
                <Stack.Screen
                    name={'WorkerChatScreen'}
                    component={WorkerChatScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'RequestGigScreen'}
                    component={RequestGigScreen}
                    options={{
                        headerShown: true,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {accountType === 'WORKER' || accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'RequestCompletedScreen'}
                    component={RequestCompletedScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'ReviewableProfileScreen'}
                    component={ReviewableProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            <Stack.Screen
                name={'TaskDetailScreen'}
                component={TaskDetailScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'NewReviewScreen'}
                component={NewReviewScreen}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name={'MoreInfoSubmissionScreen'}
                component={MoreInfoSubmissionScreen}
                options={{
                    headerShown: true,
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

export default RootRouter;
