import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
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
import AccountSearchReviewScreen from "../screens/NewReviewScreen/AccountSearchReviewScreen";
import TaskDetailScreen from "../screens/RequestActivityScreen/TaskDetailScreen";
import {TaskService} from "../backend/TaskService";
import Initializing from "../components/Initializing";
import TaskWorkerScreen from "../screens/WorkerMessageScreen/TaskWorkerScreen";
import SwitchRoleScreen from "../screens/ProfileScreen/SwitchRoleScreen";

const Stack = createNativeStackNavigator()

const RootRouter = forwardRef((props, ref) => {
    const profileService = new ProfileService()
    const taskService = new TaskService()
    const profile = profileService.getProfile()

    const [accountType, setAccountType] = useState(profile?.accountType)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [dataReLoaded, setReDataLoaded] = useState(false)

    useEffect(() => {
        loadData().then(r => {})
    }, [])

    useEffect(() => {
        if(props.appState !== 'inactive' && props.appState !== 'background'){
            fetchData().then(r => {})
        }
    }, [props.appState, props.notification, accountType])

    async function fetchData() {
        try{
            setReDataLoaded(false)
            await taskService.fetchMyTransaction({
                limit: 50,
                persona: profile?.accountType
            })
            await taskService.fetchMyTasks({
                limit: 50,
            })
            await profileService.fetchProfile()
            setReDataLoaded(true)
        } catch (e) {
            console.log(e)
        }
    }

    async function loadData() {
        try{
            setDataLoaded(false)
            await fetchData()
            setDataLoaded(true)
        } catch (e) {
            console.log(e)
        }
    }

    useImperativeHandle(ref, () => ({
        async switchRole(){
            try{
                const profile = profileService.getProfile()
                if(accountType === 'WORKER'){
                    profile.accountType = 'CONSUMER'
                } else{
                    profile.accountType = 'WORKER'
                }
                await profileService.updateProfile(profile)
                setAccountType(profile?.accountType)
            } catch (e) {
                console.log(e)
            }
        }
    }))

    function updateAccountType(type) {
        setAccountType(type)
    }

    return (dataLoaded ? (
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
                            dataReLoaded={dataReLoaded}
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
                            dataReLoaded={dataReLoaded}
                        />
                    )}
                </Stack.Screen>
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'LocationSelectorScreen'}
                    component={LocationSelectorScreen}
                    options={{
                        headerShown: false,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
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
            {accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'RequestGigScreen'}
                    component={RequestGigScreen}
                    options={{
                        headerShown: true,
                        animation: "fade_from_bottom",
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
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
            {accountType === 'CONSUMER' && (
                <Stack.Screen
                    name={'TaskDetailScreen'}
                    component={TaskDetailScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'NewReviewScreen'}
                    component={NewReviewScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'AccountSearchReviewScreen'}
                    component={AccountSearchReviewScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'TaskWorkerScreen'}
                    component={TaskWorkerScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            )}
            {(accountType === 'WORKER' || accountType === 'CONSUMER') && (
                <Stack.Screen
                    name={'SwitchRoleScreen'}
                    options={{
                        headerShown: true,
                    }}
                >
                    {screenProps => (
                        <SwitchRoleScreen
                            {...screenProps}
                            updateAuthState={props.updateAuthState}
                            updateAccountType={updateAccountType}
                        />
                    )}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    )
            :
        <Initializing/>
    )
})

export default RootRouter;
