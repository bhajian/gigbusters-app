import React from "react";
import { View, Text, Pressable } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const SuggestionRow = ({item}) => (
    <View style={styles.row}>
        <View style={styles.iconContainer}>
            <Entypo name={"location-pin"} size={30} />
        </View>
        <Text style={styles.locationText}>{item.description}</Text>
    </View>
)

export default SuggestionRow;

