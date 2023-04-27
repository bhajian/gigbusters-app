import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function ProfileListItem({item, onProfilePressed}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mainContainer} onPress={e => onProfilePressed(item)}>
                <View style={styles.leftContainer}>
                    <UserAvatar
                        size={30}
                        fontSize={15}
                        backgroundColor={Colors.light.turquoise}
                        userName={item?.name}
                        src={item?.mainPhotoUrl}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            {item.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 20,
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
