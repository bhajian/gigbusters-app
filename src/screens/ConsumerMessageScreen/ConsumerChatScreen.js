import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    ImageBackground,
    Platform,
    Text,
    Pressable,
    View, Keyboard
} from "react-native";
import Message from "../../components/Message"
import bg from "../../../assets/images/chatbg.png"
import InputBox from "../../components/InputBox";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import { useHeaderHeight } from "@react-navigation/elements"
import CustomerMessageHeader from "../../components/AcceptRejectApplication/CustomerMessageHeader";
import {TaskService} from "../../backend/TaskService";
import Entypo from "react-native-vector-icons/Entypo";
import OptionsBottomSheet from "./OptionsBottomSheet";
import {MessageService} from "../../backend/MessageService";

const ConsumerChatScreen = (props) => {
    const headerHeight = useHeaderHeight()
    const navigation = useNavigation()
    const transactionProp = props?.route?.params
    const taskService = new TaskService()
    const tr = taskService.getTransaction(transactionProp.transactionId)
    const messageService = new MessageService()

    const [transaction, setTransaction] = useState(tr)
    const [messages, setMessages] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
    const [editable, setEditable] = useState(false)

    const editPageBottomSheetModalRef = useRef(null)
    const editPageHandleSheetChanges = useCallback((index) => {
    }, [])

    const editPageHandlePresentPress = () =>{
        editPageBottomSheetModalRef.current.present()
        Keyboard.dismiss()
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        setEditableComponent()
        const subscription = messageService.subscribeToMessages({
            next: ({ value }) => {
                setMessages((m) => [value?.data?.onCreateMessage, ...m]);
            },
            transactionId: transactionProp?.transactionId
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    function setEditableComponent(){
        if(transaction?.transaction?.type === 'application' &&
            transaction?.transaction?.status === 'applicationAccepted'){
            setEditable(true)
        }
        if(transaction?.transaction?.type === 'referral' &&
            transaction?.transaction?.status === 'requestAccepted'){
            setEditable(true)
        }
    }

    async function loadData() {
        try{
            const currentUser = await Auth.currentAuthenticatedUser()
            setCurrentUserId(currentUser.attributes.sub)
            const messagesObj = await messageService.listMessagesByTransaction({
                transactionId: transactionProp.transactionId,
                sortDirection: "DESC"
            })
            setMessages(messagesObj)
            if(tr?.transaction?.senderId && tr?.transaction?.receiverId){
                await taskService.updateLastUpdatedMessage({
                    id: tr?.transaction?.id,
                    lastMessage: tr?.transaction?.lastMessage,
                    senderId: tr?.transaction?.senderId,
                    receiverId: tr?.transaction?.receiverId,
                    lastMessageRead: true,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function viewTaskPressed(params) {
        navigation.navigate('TaskDetailScreen', transaction?.task)
    }

    async function terminateChat(params) {
        try{
            await taskService.terminateTransaction({
                transactionId: params?.transaction?.id,
            })
            taskService.deleteTransaction(params?.transaction?.id)
            setEditable(false)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    async function onAcceptPressed(params) {
        try{
            if(params?.transaction?.type === 'referral'){
                await taskService.acceptTransactionRequest({
                    transactionId: params?.transaction?.id,
                })
            } else {
                await taskService.acceptApplication({
                    applicantId: params?.transaction?.workerId,
                    transactionId: params?.transaction?.id,
                    taskId: params?.task?.id
                })
            }

            let clone = JSON.parse(JSON.stringify(transaction))
            clone.transaction.status = 'applicationAccepted'
            taskService.setTransaction(clone)
            setTransaction(clone)
            setEditable(true)
        } catch (e) {
            console.log(e)
        }
    }

    async function onRejectPressed(params) {
        try{
            if(params?.transaction?.type === 'referral'){
                await taskService.rejectTransactionRequest({
                    transactionId: params?.transaction?.id,
                })
            } else {
                await taskService.rejectApplication({
                    applicantId: params?.transaction?.workerId,
                    transactionId: params?.transaction?.id,
                    taskId: params?.task?.id
                })
            }
            let clone = JSON.parse(JSON.stringify(transaction))
            clone.transaction.status = 'rejected'
            taskService.deleteTransaction(clone?.transaction?.id)
            setTransaction(clone)
            setEditable(false)
        } catch (e) {
            console.log(e)
        }
    }

    async function onProfilePressed(params) {
        params.uri = tr?.worker?.accountCode
        navigation.navigate('ReviewableProfileScreen', {reviewable: params})
    }

    function getProfileName(){
        if(tr?.transaction?.type === 'referral'){
            return tr?.referrer?.name
        } else{
            return tr?.worker?.name
        }
    }

    function getProfilePhoto(){
        if(tr?.transaction?.type === 'referral'){
            return tr?.referrer?.profilePhotoURL
        } else{
            return tr?.worker?.profilePhotoURL
        }
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Pressable
                    onPress={onProfilePressed}
                    style={[({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    }), styles.avatar]}>
                    <UserAvatar
                        size={35}
                        userName={getProfileName()}
                        backgroundColor={Colors.light.turquoise}
                        fontSize={20}
                        src={getProfilePhoto()}
                    />
                    <Text style={styles.name}>{getProfileName()}</Text>
                </Pressable>

            ),
            headerRight: () => (
                <Pressable
                    onPress={editPageHandlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <Entypo
                        name="menu"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </Pressable>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [])

    const header = () => {
        return(<View style={styles.topContainer}>
            <CustomerMessageHeader
                transaction={transaction}
                onAcceptPressed={onAcceptPressed}
                onRejectPressed={onRejectPressed}
            />
        </View>)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : headerHeight + 105}
            style={styles.container}
        >
            <ImageBackground source={bg} style={styles.bg}>
                <FlatList
                    ListFooterComponent={header}
                    data={messages}
                    renderItem={({ item }) => <Message
                        transaction={transaction}
                        myUserId={currentUserId}
                        message={item}
                    />}
                    style={styles.list}
                    keyExtractor={(item) => item?.id}
                    inverted
                />
                <InputBox
                    transaction={transaction?.transaction}
                    disabled={!editable}
                />
            </ImageBackground>
            <OptionsBottomSheet
                bottomSheetModalRef={editPageBottomSheetModalRef}
                handleSheetChanges={editPageHandleSheetChanges}
                transaction={transaction}
                terminateChat={terminateChat}
                onTaskPressed={viewTaskPressed}
            />
        </KeyboardAvoidingView>
    )
};

export default ConsumerChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    bg: {
        flex: 2,
    },
    list: {
        padding: 5,
    },
    avatar: {
        flexDirection: 'row'
    },
    name: {
        alignSelf: 'center',
        marginLeft: 10
    }
});
