import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ApplicantRequestItem({item, handler}) {

    return (
        <Pressable style={({pressed}) => ([styles.container, {
            opacity: pressed ? 0.5 : 1,
        }])}
           onPress={handler}
        >
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="ban" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.centralContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <Text style={styles.titleText}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.button}>
                        <AntDesign name="checkcircle" size={27} color="white"/>
                    </TouchableOpacity>
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
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    leftContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 50,
        height: 50,
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
