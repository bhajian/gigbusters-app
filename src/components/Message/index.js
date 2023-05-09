import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions, useWindowDimensions} from 'react-native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Auth} from "aws-amplify";
import Colors from "../../constants/Colors";
dayjs.extend(relativeTime)

const Message = ({message, myUserId, transaction}) => {
    const [isMe, setIsMe] = useState(false);
    const { width } = useWindowDimensions()

    if(message.fromUserId === myUserId){
        message.isMe = true
    }

    useEffect(() => {
        const isMyMessage = async () => {
            setIsMe(message.fromUserId === myUserId);
        }
        isMyMessage().then(r => {});
    }, [])

    function getMessageBody(){
        const type = message?.type
        if(type === 'referral'){
            return `someone has referred ${message.referredName} to you with the following 
            information: Phone: ${message.referredPhone}, Email: ${message.referredEmail}`
        } else{
            return message.message
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: message.isMe ? '#3cef8a' : "white",
                    alignSelf: message.isMe ? "flex-end" : "flex-start",
                },
            ]}
        >

            <Text>{getMessageBody()}</Text>
            <Text style={styles.time}>{dayjs(message.dateTime).fromNow(true)}</Text>
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
