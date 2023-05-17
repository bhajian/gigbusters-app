import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text, TextInput,
} from 'react-native';
import Colors from '../../../constants/Colors';
import UserAvatar from "@muhzi/react-native-user-avatar";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RatingStack from "../../../components/RatingStack";

export default function ReviewableProfileTopContainer({reviewable, navigation, onSharePressed}) {
    const [rating, setRating] = useState(Math.round(
        (reviewable && reviewable?.cumulativeRating && reviewable?.numberOfReviews ?
        reviewable?.cumulativeRating/reviewable?.numberOfReviews : 0 )
        * 100 + Number.EPSILON) / 100)

    useEffect(() => {
        setRating(Math.round(
            (reviewable && reviewable?.cumulativeRating && reviewable?.numberOfReviews ?
                reviewable?.cumulativeRating/reviewable?.numberOfReviews : 0 )
            * 100 + Number.EPSILON) / 100)
    }, [reviewable])

    function getPhone(){
        if (reviewable?.profile?.settings?.showMyPhonePublicly){
            if(reviewable?.profile?.phone?.verified){
                return 'Phone: ' + reviewable?.profile?.phone?.phone
            } else{
                return 'Phone Not Verified.'
            }
        } else{
            return ''
        }
    }

    return (
        <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <UserAvatar
                        size={70}
                        fontSize={40}
                        backgroundColor={Colors.light.turquoise}
                        userName={reviewable?.profile?.name}
                        src={reviewable?.profile?.profilePhotoURL}
                    />
                    <View>
                        <Text style={styles.contactName}>{reviewable?.profile?.name}</Text>
                        <Text style={styles.personalInfo}>ID: {reviewable?.uri}</Text>
                        {/*<Text style={styles.personalInfo}>*/}
                        {/*    {(reviewable?.profile?.settings?.showMyEmailPublicly*/}
                        {/*        ?*/}
                        {/*            'Email: ' + reviewable?.profile?.email?.email*/}
                        {/*        :   ''*/}
                        {/*    )}*/}
                        {/*</Text>*/}
                        {/*<Text style={styles.personalInfo}>*/}
                        {/*    {getPhone()}*/}
                        {/*</Text>*/}
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.shareButton} onPress={onSharePressed}>
                        <EvilIcons name={"share-google"} size={30} color={Colors.light.tint}/>
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.shareButton}>*/}
                    {/*    <EvilIcons name={"envelope"} size={30} color={Colors.light.tint}/>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
            <Text style={styles.bio}>Bio: {reviewable?.profile?.bio}</Text>
            <View style={styles.numberContainer}>
                <Text style={styles.text}> Rating:</Text>
                <Text style={styles.average}>{rating}</Text>
                <Text style={styles.text}> {reviewable.numberOfReplies}
                    Based on {(reviewable?.numberOfReviews)} reviews</Text>
            </View>
            <View style={styles.headerExtensionContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >
                                {reviewable?.profile?.location?.locationName}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >TBD</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >
                                {(reviewable?.profile?.interestedCategories?.length > 0 ?
                                        reviewable?.profile?.interestedCategories[0] : 'TBD'
                                )
                                    }
                            </Text>
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
    bio: {
        fontWeight: '500',
        marginTop: 10,
        marginLeft: 40,
        width: '80%',
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
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    personalInfo: {
        alignSelf: 'flex-start',
        marginLeft: 10,
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
