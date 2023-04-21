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
import {listMessages} from "../../backend/graphql/queries";
import {onCreateMessage} from "../../backend/graphql/subscriptions";
import { useHeaderHeight } from "@react-navigation/elements"
import AcceptRejectMessage from "../../components/AcceptRejectMessage";
import {TaskService} from "../../backend/TaskService";
import Entypo from "react-native-vector-icons/Entypo";
import EditPageBottomSheet from "../RequestActivityScreen/TaskDetailScreen/EditPageBottomSheet";
import OptionsBottomSheet from "./OptionsBottomSheet";

const ConsumerChatScreen = (props) => {
    const headerHeight = useHeaderHeight()
    const transaction = props?.route?.params
    console.log(transaction)

    const [name, setName] = useState(transaction.worker.name)
    const [profilePhoto, setProfilePhoto] = useState(transaction.worker.profilePhotoURL)
    const [messages, setMessages] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
    const taskService = new TaskService()

    const navigation = useNavigation()

    const editPageBottomSheetModalRef = useRef(null)
    const editPageHandlePresentPress = () => editPageBottomSheetModalRef.current.present()
    const editPageHandleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage, {
                filter: { transactionId: { eq: transaction.transaction.id } },
            })
        ).subscribe({
            next: ({ value }) => {
                setMessages((m) => [value.data.onCreateMessage, ...m]);
            },
            error: (err) => console.warn(err),
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    async function loadData() {
        try{
            const currentUser = await Auth.currentAuthenticatedUser()
            setCurrentUserId(currentUser.attributes.sub)
            const messagesObj = await API.graphql(graphqlOperation(listMessages, {
                filter: {
                    transactionId: {
                        eq: transaction.transaction.id
                    }
                },
            }))
            setMessages(messagesObj?.data?.listMessages?.items)
        } catch (e) {
            console.log(e)
        }
    }

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
                        size={30}
                        name={name}
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
            <AcceptRejectMessage
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
                    keyExtractor={(item) => item.transaction?.id}
                    inverted
                />
                <InputBox
                    transactionId={transaction.transaction.id}
                    fromUserId={transaction.transaction.customerId}
                    toUserId={transaction.transaction.workerId}
                    disabled={false}
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
