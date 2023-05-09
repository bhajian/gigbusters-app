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
            if(transaction?.transaction?.status === 'applicationAccepted'){
                return `You have accepted a request from ${transaction?.worker?.name}`
            }
            if(transaction?.transaction?.status === 'rejected'){
                return `You have rejected a request from ${transaction?.worker?.name}`
            }
        }
        if(transaction?.transaction?.type === 'referral'){
            return 'You have a new referral for the following task.'
        }
    }


    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: (status === 'applied'? Colors.light.tint : Colors.light.grey),
                    alignSelf: "center",
                },
            ]}
        >
            {
                status === 'applied'?
                    <View>

                        <Text style={styles.messageText}>Do you accept the request from </Text>
                        <Text style={styles.workerName}>{transaction?.worker?.name}</Text>
                        <Text style={styles.messageText}>for the {transaction?.task?.category} posting ? </Text>

                        <Image source={{uri: transaction?.task?.photoURL}} style={styles.taskImage} />
                        <View style={styles.decisionContainer}>
                            <TouchableOpacity style={styles.rejectButton} onPress={e=> onRejectPressed(transaction)}>
                                <Feather name="x-circle" size={30} color="red"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={e=> onAcceptPressed(transaction)}>
                                <AntDesign name="checkcircle" size={27} color="green"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.messageText}>{dayjs(transaction.createdAt).fromNow(true)}</Text>
                    </View>
                :
                <Text style={{color: 'black', }} >{getHeaderText()}</Text>
            }
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
