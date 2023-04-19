import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Switch, ScrollView, SafeAreaView, FlatList, Image, Pressable,
} from 'react-native';
import ReviewableProfileTopContainer from "./ReviewableProfileTopContainer";
import Review from "../../components/Review";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {ReviewService} from "../../backend/ReviewService";

export default function ReviewableProfileScreen({navigation, route}) {
    let reviewableParam = route?.params?.reviewable

    const [reviews, setReviews] = useState([])
    const [reviewable, setReviewable] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const reviewService = new ReviewService()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [])

    async function loadData() {
        setDataBeingLoaded(true)
        const reviewableObj = await reviewService.getReviewable({
            uri: reviewableParam.uri,
            type: 'gigbusters'
        })
        setReviewable(reviewableObj)

        const reviewsObj = await reviewService.queryReviews({
            uri: reviewableParam.uri,
            limit: 20,
            type: 'gigbusters'
        })

        setReviews(reviewsObj)
        setDataBeingLoaded(false)
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerShown: true,
            headerLeftContainerStyle: {
                left: 10,
            },
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text> Profile </Text>
            ),
            headerTintColor: Colors.light.tint
        })
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.reviewsList}>
                    <FlatList
                        data={reviews}
                        renderItem={({item}) => <Review review={item} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={<ReviewableProfileTopContainer reviewable={reviewable} />}
                    />
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
