import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Dimensions,
    useWindowDimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Auth} from "aws-amplify";
import Colors from "../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
dayjs.extend(relativeTime)

const WorkerApplicationStatus = ({transaction, subject, onAcceptPressed, onRejectPressed}) => {

    const [status, setStatus] = useState(transaction?.transaction?.status)
    const { width } = useWindowDimensions()

    useEffect(() => {

    }, [])

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: Colors.light.grey,
                    alignSelf: "center",
                },
            ]}
        >
            <Text style={{color: 'black', }} > {transaction?.customer?.name + ' '}
                {(transaction?.transaction?.status === 'applicationAccepted'? 'accepted': 'rejected')} your request.</Text>

        </View>
    )
}

export default WorkerApplicationStatus

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "90%",
        width: '70%',
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
    decisionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    taskImage: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        marginVertical: 10,
        borderRadius: 5,
    },
    // messageContainer: {
    //     maxWidth: "100%",
    // },
    messageText:{
        color: 'white',
        // alignSelf: "flex-end",
    },
    workerName:{
        color: 'white',
        fontWeight: 'bold'
    },
    acceptButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 40,
        height: 40,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rejectButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 40,
        height: 40,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
