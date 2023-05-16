import React, {useEffect, useRef, useState} from 'react';
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
import loading2 from "../../../assets/images/loading2.gif";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

export default function ReviewableProfileScreen({navigation, route}) {
    let reviewableParam = route?.params?.reviewable

    const [reviews, setReviews] = useState([])
    const [reviewable, setReviewable] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const reviewService = new ReviewService()
    const ref = useRef()

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, [])

    async function onSharePressed() {
        ref.current.capture().then(uri => {
            Sharing.shareAsync(`file://${uri}`, {
                mimeType: 'image/jpeg',
                dialogTitle: 'Share to social media',
            })
        })
    }

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
                {
                    dataBeingLoaded ?
                        <Image source={loading2} style={styles.loading2} />
                        :
                        <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
                            <View style={styles.reviewsList}>
                                <FlatList
                                    data={reviews}
                                    renderItem={({item}) => <Review review={item} />}
                                    keyExtractor={(item) => item.id}
                                    ListHeaderComponent={<ReviewableProfileTopContainer
                                        reviewable={reviewable}
                                        onSharePressed={onSharePressed}
                                    />}
                                />
                            </View>
                        </ViewShot>
                }
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
    loading2: {
        width: 100,
        height: 100,
        top: 150,
        alignSelf: 'center'
    },
});
