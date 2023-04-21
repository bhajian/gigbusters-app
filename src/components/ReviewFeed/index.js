import React, {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet} from "react-native";
import Reviewable from "../Reviewable";
import {ReviewService} from "../../backend/ReviewService";
import {useNavigation} from "@react-navigation/native";
import loading2 from "../../../assets/images/loading2.gif";

export default function ReviewFeed() {
    const [reviews, setReviews] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const navigation = useNavigation()
    const reviewService = new ReviewService()

    useEffect(() => {
        loadData().then().catch(e => console.log(e))
    }, [])

    async function loadData() {
        setDataBeingLoaded(true)
        const reviewsObj = await reviewService.queryReviewables({
            limit: 200,
            type: 'gigbusters'
        })
        setReviews(reviewsObj)
        setDataBeingLoaded(false)
    }

    return (
        dataBeingLoaded ?
            <Image source={loading2} style={styles.loading2} />
            :
            <FlatList
                data={reviews}
                renderItem={({item}) => <Reviewable reviewable={item} />}
                keyExtractor={(item) => (item.type + ':' + item.uri)}
                onRefresh={loadData}
                refreshing={dataBeingLoaded}
            />
    )
}

const styles = StyleSheet.create({
    container: {

    },
    loading2: {
        width: 100,
        height: 100,
        top: 150,
        alignSelf: 'center'
    },
});



