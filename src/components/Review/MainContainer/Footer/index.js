import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from "../../../../constants/Colors";

const Footer = ({ review }) => {

    const [user, setUser] = useState(null);
    const [myLike, setMyLike] = useState(null);
    const [likesCount, setLikesCount] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name={"message-circle"} size={20} color={Colors.dark.grey}/>
                <Text style={styles.number}>review</Text>
            </View>
            {/*<View style={styles.iconContainer}>*/}
            {/*    <TouchableOpacity>*/}
            {/*        <AntDesign name="hearto" size={20} color="grey" />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Text style={styles.number}> review </Text>*/}
            {/*</View>*/}
            <View style={styles.iconContainer}>
                <EvilIcons name={"share-google"} size={28} color={Colors.dark.grey}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    number: {
        marginLeft: 5,
        color: 'grey',
        textAlign: 'center'
    },
});


export default Footer;
