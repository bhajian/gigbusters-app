import React, {useEffect, useState} from "react";
import {StyleSheet, KeyboardAvoidingView, FlatList, ImageBackground, Platform, Text, Pressable} from "react-native";
import tipoffs from "../../../assets/data/tipoffs";
import Message from "../../components/Message"
import bg from "../../../assets/images/chatbg.png"
import InputBox from "../../components/InputBox";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {useNavigation} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {listMessages} from "../../backend/graphql/queries";
import {onCreateMessage} from "../../backend/graphql/subscriptions";

const ConsumerChatScreen = (props) => {
    const transaction = props?.route?.params

    const [name, setName] = useState(transaction.worker.name)
    const [profilePhoto, setProfilePhoto] = useState(transaction.worker.profilePhotoURL)
    const [messages, setMessages] = useState([])

    const navigation = useNavigation()

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
            const messagesObj = await API.graphql(graphqlOperation(listMessages, {
                filter: {
                    transactionId: {
                        eq: transaction.transaction.id
                    }
                }
            }))

            setMessages(messagesObj?.data?.listMessages?.items)
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
            headerTintColor: Colors.light.tint
        })
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 85}
            style={styles.container}
        >
            <ImageBackground source={bg} style={styles.bg}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <Message message={item} />}
                    style={styles.list}
                    keyExtractor={(item) => item.transaction?.id}
                    inverted
                />
                <InputBox
                    transactionId={transaction.transaction.id}
                    fromUserId={transaction.transaction.customerId}
                    toUserId={transaction.transaction.workerId}
                />
            </ImageBackground>
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
