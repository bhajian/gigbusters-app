import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import STAR_IMAGE from "../../../assets/images/star.png";
import {AirbnbRating} from "react-native-ratings";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function ApplicantRequestItem({item, onAcceptPressed, onRejectPressed, onProfilePressed}) {

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.leftContainer} onPress={e=> onProfilePressed(item)}>
                    <UserAvatar
                        size={55}
                        active
                        userName={item?.worker?.name}
                        src={item?.worker?.profilePhotoURL}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            {item?.worker?.name}
                        </Text>
                        <AirbnbRating
                            type='custom'
                            starImage={STAR_IMAGE}
                            showRating={false}
                            selectedColor={Colors.light.tint}
                            ratingBackgroundColor={Colors.light.grey}
                            ratingCount={5}
                            size={15}
                            isDisabled={true}
                            ratingContainerStyle={styles.rating}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.rejectButton} onPress={e => onRejectPressed(item)}>
                        <Feather name="x-circle" size={30} color={Colors.light.tint}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton} onPress={e => onAcceptPressed(item)}>
                        <AntDesign name="checkcircle" size={27} color={Colors.light.turquoise}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
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
