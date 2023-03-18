import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions, useWindowDimensions} from 'react-native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Auth} from "aws-amplify";
dayjs.extend(relativeTime)

const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);
    const { width } = useWindowDimensions()

    useEffect(() => {
        const isMyMessage = async () => {
            const authUser = await Auth.currentAuthenticatedUser();

            setIsMe(message.userID === authUser.attributes.sub);
        };

        isMyMessage().then(r => {});
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isMe ? "#DCF8C5" : "white",
                    alignSelf: isMe ? "flex-end" : "flex-start",
                },
            ]}
        >

            <Text>{message.content}</Text>
            <Text style={styles.time}>{dayjs(new Date()).fromNow(true)}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%",

        // Shadows
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    time: {
        color: "gray",
        alignSelf: "flex-end",
    },
    images: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imageContainer: {
        width: "50%",
        aspectRatio: 1,
        padding: 3,
    },
    image: {
        flex: 1,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    },
});
