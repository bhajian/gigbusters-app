import React from "react";
import {FlatList, StyleSheet} from "react-native";
import tipoffs from "../../../assets/data/tipoffs";
import Review from "../Review";
import ReviewableProfileTopContainer from "../../screens/ReviewableProfileScreen/ReviewableProfileTopContainer";

export default function ProfileReviews() {
    return (
        <FlatList
            data={tipoffs}
            renderItem={({item}) => <Review tipoff={item} />}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={<ReviewableProfileTopContainer reviewable={contact.to} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {

    }
});



