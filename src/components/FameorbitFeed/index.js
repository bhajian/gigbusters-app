import React from "react";
import {FlatList, StyleSheet} from "react-native";
import Reviewable from "../Reviewable";
import tipoffs from "../../../assets/data/tipoffs";

export default function FameorbitFeed() {
    return (
        <FlatList
            data={tipoffs}
            renderItem={({item}) => <Reviewable tipoff={item} />}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {

    }
});



