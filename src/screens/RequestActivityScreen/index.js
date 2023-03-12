import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView, StyleSheet, TextInput, View,
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import users from '../../../assets/data/users'
import ReferralRequestItem from "../../components/ReferralRequestItem";
import Colors from "../../constants/Colors";
import {TaskService} from "../../backend/TaskService";

export default function RequestActivityScreen({route}) {
    const [requestList, setRequestList] = useState([])
    const navigation = useNavigation()
    const taskService = new TaskService()


    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, []);

    async function loadData() {
        const requestObj = await taskService.listTasks()
        setRequestList(requestObj)
    }

    function referralActivityClickHandler() {
        navigation.navigate('RequestDetailScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={requestList}
                renderItem={({item}) => <ReferralRequestItem item={item} handler={referralActivityClickHandler} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        // paddingTop: 40,
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

