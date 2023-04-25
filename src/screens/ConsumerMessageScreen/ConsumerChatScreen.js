import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    ImageBackground,
    Platform,
    Text,
    Pressable,
    View
} from "react-native";
import Message from "../../components/Message"
import bg from "../../../assets/images/chatbg.png"
import InputBox from "../../components/InputBox";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {useNavigation} from "@react-navigation/native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {listMessages, listMessagesByTransactionId} from "../../backend/graphql/queries";
import {onCreateMessage} from "../../backend/graphql/subscriptions";
import { useHeaderHeight } from "@react-navigation/elements"
import AcceptRejectApplication from "../../components/AcceptRejectApplication/CustomerAcceptRejectApplication";
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

    const [name, setName] = useState(tr?.worker?.name)
    const [transaction, setTransaction] = useState(tr)
    const [profilePhoto, setProfilePhoto] = useState(tr?.worker?.profilePhotoURL)
    const [messages, setMessages] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
    const [editable, setEditable] = useState(false)

    const editPageBottomSheetModalRef = useRef(null)
    const editPageHandlePresentPress = () => editPageBottomSheetModalRef.current.present()
    const editPageHandleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe

    }, [navigation])

    useEffect(() => {
        setEditable(transaction?.transaction?.status === 'applicationAccepted')
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

    async function loadData() {
        try{
            const currentUser = await Auth.currentAuthenticatedUser()
            setCurrentUserId(currentUser.attributes.sub)
            const messagesObj = await messageService.listMessagesByTransaction({
                transactionId: transactionProp.transactionId,
                sortDirection: "DESC"
            })
            setMessages(messagesObj)
        } catch (e) {
            console.log(e)
        }
    }

    async function onAcceptPressed(params) {
        try{
            await taskService.acceptApplication({
                applicantId: params?.transaction?.workerId,
                transactionId: params?.transaction?.id,
                taskId: params?.task?.id
            })
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
            await taskService.rejectApplication({
                applicantId: params?.transaction?.workerId,
                transactionId: params?.transaction?.id,
                taskId: params?.task?.id
            })
            let clone = JSON.parse(JSON.stringify(transaction))
            clone.transaction.status = 'rejected'
            taskService.deleteTransaction(clone?.transaction?.id)
            setTransaction(clone)
            setEditable(false)
        } catch (e) {
            console.log(e)
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
                    // onPress={handlePresentPress}
                    style={[({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    }), styles.avatar]}>
                    <UserAvatar
                        size={35}
                        userName={name}
                        src={profilePhoto}
                    />
                    <Text style={styles.name}>{name}</Text>
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
            <AcceptRejectApplication
                transaction={transaction}
                onAcceptPressed={onAcceptPressed}
                onRejectPressed={onRejectPressed}
            />
        </View>)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 65 : headerHeight + 95}
            style={styles.container}
        >
            <ImageBackground source={bg} style={styles.bg}>
                <FlatList
                    ListFooterComponent={header}
                    data={messages}
                    renderItem={({ item }) => <Message
                        myUserId={currentUserId}
                        message={item}
                    />}
                    style={styles.list}
                    keyExtractor={(item) => item?.id}
                    inverted
                />
                <InputBox
                    transactionId={transaction?.transaction?.id}
                    fromUserId={transaction?.transaction?.customerId}
                    toUserId={transaction?.transaction?.workerId}
                    disabled={!editable}
                />
            </ImageBackground>
            <OptionsBottomSheet
                bottomSheetModalRef={editPageBottomSheetModalRef}
                handleSheetChanges={editPageHandleSheetChanges}
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
