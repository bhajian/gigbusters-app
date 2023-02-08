import React from "react";
import {FlatList, StyleSheet} from "react-native";
import tipoffs from "../../../assets/data/tipoffs";
import Review from "../Review";

export default function ProfileReviews() {
    return (
        <FlatList
            data={tipoffs}
            renderItem={({item}) => <Review tipoff={item} />}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {

    }
});



