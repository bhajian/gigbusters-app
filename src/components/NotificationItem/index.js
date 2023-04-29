import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function NotificationItem({notification, onPressed}) {

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.leftContainer} onPress={e=>onPressed()}>
                    <UserAvatar
                        size={35}
                        userName={notification?.subject?.name}
                        backgroundColor={Colors.light.turquoise}
                        fontSize={20}
                        src={notification?.subject?.profilePhotoURL}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            {notification?.subject?.name}
                        </Text>
                        <Text style={styles.notificationText}>
                            {
                                (notification?.notification.type === 'APPLICATION_ACCEPTED' &&
                                    (notification?.subject?.name + ' has accepted your application for the task: \n'+
                                        'sometask'
                                    )
                                )
                            }
                            {
                                (notification?.notification.type === 'NEW_APPLICATION' &&
                                    (notification?.subject?.name + ' submitted an application for the task you posted: \n'+
                                        'sometask'
                                    )
                                )
                            }
                            {
                                (notification?.notification.type === 'CHAT_TERMINATED' &&
                                    ('Your chat is terminated with ' + notification?.subject?.name)
                                )
                            }
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    taskImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    container: {
        flexDirection: 'row',
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    centralContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontWeight: '500',
        fontSize: 10,
        marginHorizontal: 10,
        alignSelf: 'flex-start',
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
