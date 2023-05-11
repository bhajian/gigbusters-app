import { useState } from "react";
import {
    StyleSheet,
    TextInput, TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import Colors from "../../constants/Colors";
import {TaskService} from "../../backend/TaskService";
import {MessageService} from "../../backend/MessageService";

const InputBox = ({ transaction, disabled }) => {
    console.log(transaction)
    const taskService = new TaskService()
    const messageService = new MessageService()

    const [text, setText] = useState("")

    async function onSendPressed() {
        if(text.trim() !== ''){
            const fromUserId = transaction.customerId
            const toUserId = (transaction?.type === 'application' ?
                transaction.workerId: transaction.referrerId)
            try{
                const newMessage = {
                    transactionId: transaction.id,
                    message: text,
                    fromUserId: fromUserId,
                    toUserId: toUserId,
                }
                const newMessageRes = await messageService.createMessage(newMessage)

                setText('')
                await taskService.updateLastUpdatedMessage({
                    id: transaction.id,
                    lastMessage: text,
                    senderId: fromUserId,
                    receiverId: toUserId,
                    lastSenderRead: newMessageRes?.data?.newMessageRes?.id,
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
            <SafeAreaView edges={["bottom"]} style={styles.container}>
                <AntDesign
                    name="plus"
                    size={20}
                    color="royalblue"
                />
                <TextInput
                    value={text}
                    onChangeText={setText}
                    style={styles.input}
                    placeholder="Type your message..."
                    editable={!disabled}
                    multiline={true}
                />

                <TouchableOpacity
                    style={styles.leftContainer}
                    onPress={onSendPressed}
                    disabled={disabled}
                >
                    <MaterialIcons
                        style={[{backgroundColor: disabled ? Colors.dark.grey: Colors.light.tint}, styles.send]}
                        name="send"
                        size={16}
                        color="white"
                    />
                </TouchableOpacity>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "whitesmoke",
        padding: 10,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: "lightgray",
        borderWidth: StyleSheet.hairlineWidth,
    },
    send: {
        // backgroundColor: Colors.light.tint,
        padding: 7,
        borderRadius: 15,
        overflow: "hidden",
    },

    attachmentsContainer: {
        alignItems: "flex-end",
    },
    selectedImage: {
        // height: 100,
        // width: 200,
        margin: 5,
    },
    removeSelectedImage: {
        position: "absolute",
        right: 10,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
});

export default InputBox;