import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text, TextInput,
} from 'react-native';
import Colors from '../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from "@muhzi/react-native-user-avatar";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RatingStack from "../../../components/RatingStack";

export default function ReviewableProfileTopContainer({reviewable, navigation}) {
    console.log(reviewable)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('phone')
    const [rating, setRating] = useState(Math.round((reviewable && reviewable.cumulativeRating && reviewable.numberOfReviews ?
        reviewable.cumulativeRating/reviewable.numberOfReviews : 0 ) * 100 + Number.EPSILON) / 100)

    const [searchQuery, setSearchQuery] = React.useState('')

    useEffect(() => {

    }, []);

    return (
        <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <UserAvatar
                        size={70}
                        active
                        src={reviewable.profilePhotoURL}
                    />
                    <Text style={styles.contactName}>{reviewable.name}</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.shareButton}>
                        <EvilIcons name={"share-google"} size={30} color={Colors.light.tint}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <EvilIcons name={"envelope"} size={30} color={Colors.light.tint}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.numberContainer}>
                <Text style={styles.text}> Rating:</Text>
                <Text style={styles.average}>{rating}</Text>
                <Text style={styles.text}> {reviewable.numberOfReplies} Based on {(reviewable && reviewable.numberOfReviews ?
                    reviewable.numberOfReviews : 0)} reviews</Text>
            </View>
            <View style={styles.headerExtensionContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Toronto</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >10$/hr</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Personal Trainer</Text>
                        </View>
                    </View>

                    <View style={styles.ratingStackContainer}>
                        <RatingStack reviewable={reviewable}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomColor: 'lightgrey',
        marginTop: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    headerExtensionContainer: {
        width: '100%',
        paddingHorizontal: 10,
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    searchContainer: {
        flexDirection: 'row',
        zIndex: 10,
        width: '100%',
    },
    accountContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    accountInput: {
        backgroundColor: Colors.light.grey,
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        borderRadius: 5
    },
    infoContainer: {
        // flexDirection: 'columns',
    },
    info: {
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        marginHorizontal: 2,
        margin: 3,
    },
    textTag: {
        textAlign: 'center',
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#000',
    },
    ratingStackContainer: {
        width: '80%',
        paddingHorizontal: 10,
    },
    closeButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
    },
    closeIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        alignSelf: 'center',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    shareButton: {
        marginTop: 5,
        borderColor: Colors.light.tint,
        borderRadius: 5,
        borderWidth: 1,
        marginEnd: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        paddingVertical: 10,
        marginHorizontal: 4,
        fontSize: 14,
        textAlignVertical: 'bottom',
    },
    inputsContainer: {
        marginLeft: 5,
        backgroundColor: '#e9eff6',
    },
    reviewInput: {
        height: 150,
        maxHeight: 300,
        fontSize: 20,
        padding: 5,
    },
    pickImage: {
        // borderWidth: 1,
        // borderColor: Colors.light.tint,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 2,
    },
    settingText: {
        fontSize: 15,
        marginVertical: 10,
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    newMessageSetting: {
        bottom: 0,
        flexDirection: 'row',
        margin: 5,

    },
    topContainer: {
        backgroundColor: '#ffffff',
        // height: 125,
        width: '100%',
    },
    privateSwitch: {
        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
        marginTop: 5,
    },
    reviewType:{
        width: '15%'
    },
    searchCategory:{
        width: '75%'
    },
    numberContainer: {
        paddingTop: 5,
        flexDirection: 'row',
    },
    average: {
        color: Colors.light.tint,
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
});
