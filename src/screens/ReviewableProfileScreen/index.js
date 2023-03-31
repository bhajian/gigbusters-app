import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Switch, ScrollView, SafeAreaView, FlatList, Image, Pressable,
} from 'react-native';
import ReviewableProfileTopContainer from "./ReviewableProfileTopContainer";
import tipoffs from "../../../assets/data/tipoffs";
import Review from "../../components/Review";
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function ReviewableProfileScreen({navigation, route}) {
    let contact = route.params ? route.params.reviewable : {
        name: 'behnam',
        image: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250',
        id: 1
    };

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2.5);

    useEffect(() => {

    }, [])

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
                        data={tipoffs}
                        renderItem={({item}) => <Review tipoff={item} />}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={<ReviewableProfileTopContainer reviewable={contact} />}
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
