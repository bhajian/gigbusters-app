import React from 'react';
import {Text, ImageBackground, View, StyleSheet, TouchableOpacity} from 'react-native';
import ProfilePicture from "../ProfilePicture";
import UserAvatar from "@muhzi/react-native-user-avatar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const MatchingCard = props => {
    const {mainPhotoURL, description, category, price, city, country} = props.card;
    return (
        <View style={styles.card}>
            <View style={styles.topContainer}>
                <UserAvatar
                    size={45}
                    active
                    src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                />
                <Text style={styles.contactName}>Matthew Rathier</Text>
            </View>
            <View style={styles.contentContainer}>
                <ImageBackground
                    source={{
                        uri: mainPhotoURL,
                    }}
                    style={styles.image}>
                    <View style={styles.cardInner}>
                        <Text style={styles.name}>{category}</Text>
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
                            <Text style={styles.text} >{country}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >{price}$/hr</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.text} >{category}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        {description}
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
        elevation: 55,
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
        top: 70
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    contactName: {
        margin: 10,
        paddingTop: 10,
        paddingLeft: 10,
        textAlignVertical: 'bottom',
        fontSize: 20,
        fontWeight: '500',
    },
    contentContainer: {
        width: '95%',
        alignSelf: 'center',
        height: '100%',
    },
    image: {
        width: '100%',
        height: 300,
        // borderRadius: 15,
        // borderWidth: 0.5,
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
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 2,
            height: 2
        }
    },
    bio: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },
    tagsContainer: {
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    infoContainer: {
        padding: 5,
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    tag: {
        borderRadius: 10,
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
