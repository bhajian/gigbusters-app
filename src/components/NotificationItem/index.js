import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {useNavigation} from "@react-navigation/native";

export default function NotificationItem({notification, onPressed}) {


    function buildNotificationText(){
        if(notification?.notification.type === 'APPLICATION_ACCEPTED'){
            return notification?.subject?.name + ' has accepted your application for the following task: '
        }
        if(notification?.notification.type === 'NEW_APPLICATION'){
            return notification?.subject?.name + ' submitted an application for the task you posted.'
        }
        if(notification?.notification.type === 'TRANSACTION_TERMINATED'){
            return 'Your chat is terminated with ' + notification?.subject?.name
        }
        if(notification?.notification.type === 'NEW_REFERRAL'){
            return 'You have a new referral for the following task: '
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mainContainer} onPress={e=>onPressed(notification)}>
                <View style={styles.leftContainer}>
                    <UserAvatar
                        size={35}
                        userName={notification?.subject?.name}
                        backgroundColor={Colors.light.turquoise}
                        fontSize={20}
                        src={notification?.subject?.profilePhotoURL}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {notification?.subject?.name}
                        </Text>
                        <Text style={styles.notificationText}>
                            {
                                buildNotificationText()
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <Image source={{uri: notification?.task?.photoURL}} style={styles.taskImage}/>
                    <Text style={styles.titleText}>
                        {notification?.task?.category}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 5
    },
    taskImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    taskContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    container: {
        flexDirection: 'row',
        // width: '80%',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: .5,
        borderColor: '#e3e3e3',
    },
    rating: {
        paddingVertical: 5,
        marginLeft: 10
    },
    leftContainer: {
        width: '75%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 10,
    },
    centralContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontWeight: '500',
        fontSize: 10,
        marginHorizontal: 10,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    titleText: {
        fontWeight: '500',
        fontSize: 10,
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop: 5,
    },
    notificationText: {
        fontSize: 10,
        marginHorizontal: 10,
        alignSelf: 'flex-start',
        marginTop: 5,
        color: 'grey'
    },
    infoContainer: {

    },
    info: {
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        margin: 3,
    },
    textTag: {
        textAlign: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#000',
    },
    acceptButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 40,
        height: 50,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rejectButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 40,
        height: 50,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    iconContainer: {
        justifyContent: 'center'
    }
});
