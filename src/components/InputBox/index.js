import { useState } from "react";
import {
    StyleSheet,
    TextInput, TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import Colors from "../../constants/Colors";
import {
    createMessage,
} from "../../backend/graphql/mutations"
import {API, graphqlOperation} from "aws-amplify";

const InputBox = ({ transactionId, fromUserId, toUserId, disabled }) => {
    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const [progresses, setProgresses] = useState({});

    async function onSendPressed(params) {
        try{
            const newMessage = {
                transactionId: transactionId,
                message: text,
                fromUserId: fromUserId,
                toUserId: toUserId,
                dateTime: (new Date()).toISOString()
            }

            const newMessageData = await API.graphql(
                graphqlOperation(createMessage, { input: newMessage })
            )
        } catch (e) {
            console.log(e)
        }
        setText('')
    }

    return (
            <SafeAreaView edges={["bottom"]} style={styles.container}>
                {/* Icon */}
                <AntDesign
                    // onPress={pickImage}
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
        padding: 5,
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