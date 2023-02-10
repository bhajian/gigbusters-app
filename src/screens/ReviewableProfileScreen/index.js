import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Switch, ScrollView, SafeAreaView,
} from 'react-native';
import ReviewableProfileTopContainer from "./ReviewableProfileTopContainer";
import ProfileReviews from "../../components/ProfileReviews";

export default function ReviewableProfileScreen({navigation, route}) {
    let contact = route.params ? route.params.reviewable : {
        name: 'behnam',
        image: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250',
        id: 1
    };

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2.5);

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ReviewableProfileTopContainer reviewable={contact.to} navigation={navigation}/>
            </View>
            <View >
                <View style={styles.reviewsList}>
                    <ProfileReviews/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'white',
        height: '100%',
    },
    reviewsList: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },

});
