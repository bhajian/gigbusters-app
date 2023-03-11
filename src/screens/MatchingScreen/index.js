import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MatchingCard from '../../components/MatchingCard';
import users from '../../../assets/data/users';
import AnimatedStack from '../../components/AnimatedStack';
import Colors from "../../constants/Colors";
import {FontAwesome, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import ProfilePicture from "../../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";
import {TaskService} from "../../backend/TaskService";

const MatchingScreen = () => {

    const [requestList, setRequestList] = useState([])
    const taskService = new TaskService()

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, []);

    async function loadData() {
        const requestObj = await taskService.listTasks()
        setRequestList(requestObj)
        console.log(requestObj)
    }

    const onSwipeLeft = user => {
        console.warn('swipe left', user.name);
    };

    const onSwipeRight = user => {
        console.warn('swipe right: ', user.name);
    };

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Octicons name="stack" size={25} color={color}/>
            ),
            headerTitle: () => (
                <View style={{marginHorizontal: 15}}>
                </View>
            ),
            headerRight: () => (
                <Pressable
                    // onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <FontAwesome
                        name="envelope-o"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginHorizontal: 15}}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <View style={{marginHorizontal: 15}}>
                    <MaterialCommunityIcons
                        name="bell-ring-outline"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </View>
            ),
        })
    }, [navigation]);

    return (
        <View style={styles.pageContainer}>
            <AnimatedStack
                data={requestList}
                renderItem={({item}) => <MatchingCard user={item}/>}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
});

export default MatchingScreen;

