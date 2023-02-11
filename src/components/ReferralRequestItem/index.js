import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ReferralRequestItem({item, handler}) {

    return (
        <Pressable style={({pressed}) => ([styles.container, {
            opacity: pressed ? 0.5 : 1,
        }])}
           onPress={handler}
        >
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <Text style={styles.titleText}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Toronto</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Personal Trainer</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <AntDesign name="right" size={20} color={Colors.light.tint} />
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
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
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
    infoContainer: {
        flexDirection: 'columns',
        marginHorizontal: 15,
        justifyContent: 'flex-end'
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
    iconContainer: {
        justifyContent: 'center'
    }
});
