import React from "react";
import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import STAR_IMAGE from "../../../assets/images/star.png";
import {AirbnbRating} from "react-native-ratings";

export default function ApplicantAcceptedItem({item, handler}) {

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: item.profilePhotoURL}} style={styles.image} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.titleText}>
                            {item.name}
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
                            // onFinishRating={setRating}
                            style={{ paddingVertical: 15 }}
                        />
                    </View>
                </View>
            </View>
        </View>
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
