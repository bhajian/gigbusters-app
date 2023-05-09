import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function MessageItem({transaction, accountType, onChatPressed, onProfilePressed}) {

    const profile = getProfile()

    function getProfile(){
        if(accountType === 'CONSUMER' && transaction?.transaction.type === 'referral'){
            return transaction?.referrer
        }
        if(accountType === 'CONSUMER' && transaction?.transaction.type === 'application'){
            return transaction?.worker
        }
        if(accountType === 'WORKER'){
            return transaction?.customer
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mainContainer} onPress={e => onChatPressed(transaction)}>
                <View style={styles.leftContainer}>
                    <UserAvatar
                        size={50}
                        backgroundColor={Colors.light.turquoise}
                        userName={profile.name}
                        src={profile.profilePhotoURL}
                        fontSize={30}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            {profile.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Image source={{uri: transaction?.task?.photoURL}} style={styles.taskImage} />
                    <View style={styles.chatButton} >
                        <AntDesign name="wechat" size={30} color={Colors.light.tint}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    taskImage: {
        width: 70,
        height: 70,
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
        marginHorizontal: 10,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    infoContainer: {
        // flexDirection: 'columns',
        // marginHorizontal: 15,
        // justifyContent: 'flex-end'
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
    chatButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 40,
        height: 65,
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
