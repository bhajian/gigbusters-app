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

const AcceptRejectApplication = ({transaction, subject, onAcceptPressed, onRejectPressed}) => {
    const [status, setStatus] = useState(transaction?.transaction?.status)
    const { width } = useWindowDimensions()

    useEffect(() => {

    }, [])

    function getHeaderText(){
        if(transaction?.transaction?.type === 'application'){
            if(transaction?.transaction?.status === 'applied'){
                return `Would you accept an application from ${transaction?.worker?.name}`
            }
            if(transaction?.transaction?.status === 'applicationAccepted'){
                return `You have accepted the application from ${transaction?.worker?.name}`
            }
            if(transaction?.transaction?.status === 'rejected'){
                return `You have rejected the application from ${transaction?.worker?.name}`
            }
        }
        if(transaction?.transaction?.type === 'referral'){
            return 'You have a new referral for the above task. Would you like to chat with the person who sent the recommendation?'
        }
    }

    function getBackgroundColor(){
        if(status === 'applied' || status === 'initiated'){
            return Colors.light.tint
        } else{
            return Colors.dark.darkTurquoise
        }
    }

    function getAcceptRejectComponent(){
        if(status === 'applied' || status === 'initiated') {
            return <View>
                <Text style={styles.workerName}>{transaction?.worker?.name}</Text>
                <View style={styles.decisionContainer}>
                    <TouchableOpacity style={styles.rejectButton} onPress={e=> onRejectPressed(transaction)}>
                        <Feather name="x-circle" size={30} color="red"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton} onPress={e=> onAcceptPressed(transaction)}>
                        <AntDesign name="checkcircle" size={27} color="green"/>
                    </TouchableOpacity>
                </View>
            </View>
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    alignSelf: "center",
                },
            ]}
        >
            <Text style={styles.messageText}>Category: {transaction?.task?.category}</Text>
            <Image source={{uri: transaction?.task?.photoURL}} style={styles.taskImage} />
            <Text style={styles.messageText} >{getHeaderText()}</Text>
            {
                getAcceptRejectComponent()
            }
            <Text style={styles.time}>{dayjs(transaction.transaction?.lastUpdatedAt).fromNow(true)}</Text>
        </View>
    )
}

export default AcceptRejectApplication

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
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 5,
    },
    messageText:{
        color: 'white',
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
        color: Colors.light.grey,
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
