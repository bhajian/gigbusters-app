import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import Colors from '../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from "@muhzi/react-native-user-avatar";
import { Ionicons} from "@expo/vector-icons";
import ReviewTypePicker from "../../../components/ReviewTypePicker";
import {SearchCategory} from "../../../components/SearchCategory";


export default function NewReviewTopContainer({contact, pickImage, navigation}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('phone');
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {

    }, []);

    return (
        <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.closeButton}>
                        <View style={styles.closeButton}>
                            <FontAwesome name="chevron-left" style={styles.closeIcon}/>
                            <Text style={styles.closeIcon}>  </Text>
                        </View>
                    </TouchableOpacity>
                    <UserAvatar
                        size={35}
                        active
                        src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                    <Text style={styles.contactName}>{contact.name}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Ionicons name="enter" size={25} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.headerExtensionContainer}>
                <ReviewTypePicker />
                <SearchCategory navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        flexDirection: "row",
        paddingTop: 7,
        paddingLeft: 7,
        marginHorizontal: 7,
        width: '80%',
        backgroundColor: '#eae8e8',
        borderRadius: 10,
    },
    headerExtensionContainer: {
        width: '90%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    accoountSearch: {
        backgroundColor: '#e9eff6',
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
        width: '70%'
    },
    headerContainer: {
        zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    closeButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
    },
    closeIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    contactName: {
        padding: 10,
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        paddingVertical: 10,
        marginHorizontal: 4,
        fontSize: 25,
        textAlignVertical: 'bottom',
    },
    newTweetContainer: {
        zIndex: -10,
        flexDirection: 'column',
        padding: 15,
        width: '100%'
    },
    inputsContainer: {
        marginLeft: 5,
        backgroundColor: '#e9eff6',
    },
    reviewInput: {
        height: 150,
        maxHeight: 300,
        fontSize: 20,
        padding: 5,
    },
    pickImage: {
        // borderWidth: 1,
        // borderColor: Colors.light.tint,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 2,
    },
    settingText: {
        fontSize: 15,
        marginVertical: 10,
    },
    imageContainer: {
        width: '100%',
        // height: 150,
        flexDirection: 'row',
    },
    newMessageSetting: {
        bottom: 0,
        flexDirection: 'row',
        margin: 5,

    },
    topContainer: {
        backgroundColor: '#ffffff',
        // height: 125,
        width: '100%',
    },
    privateSwitch: {
        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
        marginTop: 5,
    },
});
