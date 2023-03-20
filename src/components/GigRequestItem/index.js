import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Colors from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function GigRequestItem({item, handler}) {

    return (
        <Pressable style={({pressed}) => ([styles.container, {
            opacity: pressed ? 0.5 : 1,
        }])}
           onPress={ e => handler(item)}
        >
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: item.mainPhotoURL}} style={styles.image}/>
                    <Text style={styles.titleText}>
                        {item.category}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >{item.country}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >{item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.notificationNumberContainer}>
                        <View style={styles.notificationInfo}>
                            <Text style={styles.notificationTag} >3</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 6,
    },
    notificationNumberContainer: {
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderBottomWidth: .5,
        borderColor: '#e3e3e3',
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
    },
    info: {
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        margin: 3,
    },
    notificationInfo: {
        borderRadius: 50,
        backgroundColor: Colors.light.tint,
        margin: 3,
    },
    notificationTag: {
        textAlign: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#fff',
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
    iconContainer: {
        justifyContent: 'center'
    }
});
