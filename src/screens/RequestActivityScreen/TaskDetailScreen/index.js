import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, ScrollView, Text, Image, Pressable, SafeAreaView,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import RequestDetailTopContainer from "./RequestDetailTopContainer";
import ApplicantRequestItem from "../../../components/ApplicantRequestItem";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import loading from "../../../../assets/images/loading.gif"
import loading2 from "../../../../assets/images/loading2.gif"
import EditDeleteBottomSheet from "./EditDeleteBottomSheet";
import EditPageBottomSheet from "./EditPageBottomSheet";
import {TaskService} from "../../../backend/TaskService";
import ApplicantAcceptedItem from "../../../components/ApplicantAcceptedItem"
export default function TaskDetailScreen({route}) {
    const task = route.params
    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const [applicants, setApplicants] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const editDeleteBottomSheetModalRef = useRef(null)
    const navigation = useNavigation()
    const taskService = new TaskService()
    const editDeleteHandlePresentPress = () => editDeleteBottomSheetModalRef.current.present()
    const editDeleteHandleSheetChanges = useCallback((index) => {
    }, [])

    const editPageBottomSheetModalRef = useRef(null)
    const editPageHandlePresentPress = () => editPageBottomSheetModalRef.current.present()
    const editPageHandleSheetChanges = useCallback((index) => {
    }, [])

    async function onAcceptPressed(params) {
        try{
            await taskService.acceptApplication({
                applicantId: params?.transaction?.workerId,
                transactionId: params?.transaction?.id,
                taskId: task?.id
            })
            const index = applicants.findIndex(x=> x.transaction?.workerId === params?.transaction?.workerId)
            let newApplicant = [...applicants]
            newApplicant[index].transaction.status = 'applicationAccepted'
            setApplicants([...newApplicant])
        } catch (e) {
            console.log(e)
        }
    }

    async function onRejectPressed(params) {
        try{
            await taskService.rejectApplication({
                applicantId: params?.transaction?.workerId,
                transactionId: params?.transaction?.id,
                taskId: task?.id
            })
            const index = applicants.findIndex(x=> x.transaction?.workerId === params?.transaction?.workerId)
            let newApplicant = [...applicants]
            newApplicant[index].transaction.status = 'rejected'
            setApplicants([...newApplicant])
        } catch (e) {
            console.log(e)
        }
    }

    async function onProfilePressed(params) {
        params.uri = params?.accountCode
        navigation.navigate('ReviewableProfileScreen', {reviewable: params})
    }

    async function onChatPressed(cardIndex) {
        navigation.navigate('ConsumerChatScreen')
    }

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, [])

    async function loadData() {
        setDataBeingLoaded(true)
        const applicantsObj = await taskService.listApplicants({
            taskId: task?.id
        })
        setApplicants(applicantsObj)
        setDataBeingLoaded(false)
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
            headerTintColor: Colors.light.tint
        })
    }, [navigation])

    const header = () => {
        return(<View style={styles.topContainer}>
            <RequestDetailTopContainer task={task} />
        </View>)
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        ListHeaderComponent={header}
                        data={applicants}
                        renderItem={({item}) => {
                            if(item?.transaction?.status === 'applied'){
                                return <ApplicantRequestItem
                                    item={item}
                                    onAcceptPressed={onAcceptPressed}
                                    onRejectPressed={onRejectPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            }
                            if(item?.transaction?.status === 'applicationAccepted') {
                                return <ApplicantAcceptedItem
                                    item={item}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            }
                        }}
                        keyExtractor={(item) => item.userId}
                    />
            }
            <EditDeleteBottomSheet
                bottomSheetModalRef={editDeleteBottomSheetModalRef}
                handleSheetChanges={editDeleteHandleSheetChanges}
                task={task}
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
    loading2: {
        width: 100,
        height: 100,
        top: 150,
        justifyContent: 'center',
        alignSelf: 'center'
    },
});
