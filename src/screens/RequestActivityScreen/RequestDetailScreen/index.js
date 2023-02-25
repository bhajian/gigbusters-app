import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import people from "../../../../assets/data/tipoffs";
import RequestDetailTopContainer from "./RequestDetailTopContainer";
import ApplicantRequestItem from "../../../components/ApplicantRequestItem";
import Colors from "../../../constants/Colors";
export default function RequestDetailScreen({route, item}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(10);
    const [priceMax, setPriceMax] = useState(10);
    const navigation = useNavigation();

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <RequestDetailTopContainer item = {item} />
            </View>
            <FlatList
                data={people}
                renderItem={({item}) => <ApplicantRequestItem item={item.to} />}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: 40,
    },
    headerExtensionContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerContainer: {
        // zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        paddingStart: 10,
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    inputsContainer: {
        backgroundColor: Colors.light.grey,
        margin: 10,
    },
    reviewInput: {
        height: 200,
        maxHeight: 300,
        fontSize: 20,
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    submitButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
