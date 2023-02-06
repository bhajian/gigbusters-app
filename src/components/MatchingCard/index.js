import React from 'react';
import {Text, ImageBackground, View, StyleSheet, TouchableOpacity} from 'react-native';
import ProfilePicture from "../ProfilePicture";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const MatchingCard = props => {
    const {name, image, bio} = props.user;
    return (
        <View style={styles.card}>
            <View style={styles.topContainer}>
                <UserAvatar
                    size={45}
                    active
                    src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                />
                <Text style={styles.contactName}>Matthew broh</Text>
            </View>
            <View style={styles.contentContainer}>
                <ImageBackground
                    source={{
                        uri: image,
                    }}
                    style={styles.image}>
                    <View style={styles.cardInner}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.bio}>{bio}</Text>
                    </View>
                    <View style={styles.connectButtonsContainer}>
                        <TouchableOpacity style={styles.connectButton}>
                            <FontAwesome name="ban" size={35} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.connectButton}>
                            <Ionicons name="ios-logo-whatsapp" size={35} color="white"/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.infoContainer}>
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.text} >Toronto</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >10$/hr</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >Personal Trainer</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        I have a cute golden doodle who treats really well.
                        He is very webb behaved and needs someone to take care of him
                        while I am at work 9-5pm on the week days.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fefefe',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 15,
    },
    connectButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 5,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    contactName: {
        paddingTop: 10,
        paddingLeft: 10,
        textAlignVertical: 'bottom',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        // height: '70%',
        borderRadius: 5,
        // overflow: 'hidden',
    },
    cardInner: {
        padding: 10,
        marginBottom: 80,
    },
    name: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },
    tagsContainer: {
        padding: 10,
        // width: '100%',
        flexDirection: 'row',
    },
    infoContainer: {
        padding: 10,
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    tag: {
        borderRadius: 50,
        backgroundColor: Colors.light.tint,
        marginHorizontal: 2
    },
    text: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#fff',
    },
    description: {
        fontSize: 18,
    }
});

export default MatchingCard;
