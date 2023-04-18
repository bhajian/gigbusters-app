import React, {useEffect, useState} from 'react';
import {
    FlatList, Image, Pressable,
    SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import GigRequestItem from "../../components/GigRequestItem";
import Colors from "../../constants/Colors";
import {TaskService} from "../../backend/TaskService";
import Fontisto from "react-native-vector-icons/Fontisto";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import loading2 from "../../../assets/images/loading2.gif";

export default function RequestActivityScreen({route}) {
    const [requestList, setRequestList] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const navigation = useNavigation()
    const taskService = new TaskService()

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerRight: () => (
                <Pressable
                    // onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="account-search"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </Pressable>
            ),
        })
    }, [navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [navigation])

    async function loadData() {
        setDataBeingLoaded(true)
        const requestObj = await taskService.fetchMyTasks()
        setRequestList(requestObj)
        setDataBeingLoaded(false)
    }

    function requestActivityClickHandler(props) {
        navigation.navigate('TaskDetailScreen', props)
    }

    const onNewRequestPress = () => {
        navigation.navigate('RequestGigScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={requestList}
                        renderItem={({item}) => <GigRequestItem
                            item={item}
                            handler={requestActivityClickHandler}
                        />}
                        keyExtractor={(item) => item.id}
                    />
            }
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={onNewRequestPress}>
                <MaterialIcons name="add-task" size={27} color="white"/>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
    },
    button: {
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading2: {
        width: 100,
        height: 100,
        top: 150,
        alignSelf: 'center'
    },
    headerExtensionContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
        // zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        paddingStart: 10,
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    inputsContainer: {
        backgroundColor: Colors.light.grey,
        margin: 10,
    },
    reviewInput: {
        height: 200,
        maxHeight: 300,
        fontSize: 20,
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    submitButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

