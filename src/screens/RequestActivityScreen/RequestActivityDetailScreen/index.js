import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, ScrollView, Text, Image, Pressable, SafeAreaView,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import people from "../../../../assets/data/tipoffs";
import RequestDetailTopContainer from "./RequestDetailTopContainer";
import ApplicantRequestItem from "../../../components/ApplicantRequestItem";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import loading from "../../../../assets/images/loading.gif";
import EditDeleteBottomSheet from "./EditDeleteBottomSheet";
import EditPageBottomSheet from "./EditPageBottomSheet";
import {TaskService} from "../../../backend/TaskService";
export default function RequestActivityDetailScreen({route}) {
    const task = route.params
    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const navigation = useNavigation()
    const editDeleteBottomSheetModalRef = useRef(null)
    const taskService = new TaskService()
    const editDeleteHandlePresentPress = () => editDeleteBottomSheetModalRef.current.present()
    const editDeleteHandleSheetChanges = useCallback((index) => {
    }, [])

    const editPageBottomSheetModalRef = useRef(null)
    const editPageHandlePresentPress = () => editDeleteBottomSheetModalRef.current.present()
    const editPageHandleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, []);

    async function loadData() {
        const requestObj = await taskService.listTasks()
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text> </Text>
            ),
            headerRight: () => (
                dataBeingSaved ?
                    <Image source={loading} style={{width: 40, height: 30}} />
                    :
                    <Pressable
                        onPress={editDeleteHandlePresentPress}
                        style={({pressed}) => ({
                            opacity: pressed ? 0.5 : 1,
                            marginRight: 10,
                        })}>
                        <Text style={{color: '#0f66a9', fontSize: 18}}>Edit</Text>
                    </Pressable>
            ),
        })
    }, [navigation])

    const header = () => {
        return(<View style={styles.topContainer}>
            <RequestDetailTopContainer task={task} />
        </View>)
    };

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                ListHeaderComponent={header}
                data={people}
                renderItem={({item}) => <ApplicantRequestItem item={item.to} />}
                keyExtractor={(item) => item.id}
            />
            <EditDeleteBottomSheet
                bottomSheetModalRef={editDeleteBottomSheetModalRef}
                handleSheetChanges={editDeleteHandleSheetChanges}
            />
            <EditPageBottomSheet
                bottomSheetModalRef={editPageBottomSheetModalRef}
                handleSheetChanges={editPageHandleSheetChanges}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: 10,
    },
    topContainer: {
        marginTop: 10
    },
    headerExtensionContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
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
