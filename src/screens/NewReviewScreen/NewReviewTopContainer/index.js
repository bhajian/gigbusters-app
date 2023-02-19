import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text, TextInput, Button,
} from 'react-native';
import Colors from '../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from "@muhzi/react-native-user-avatar";
import { Ionicons} from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput from "react-phone-number-input/react-native-input";
import {useNavigation} from "@react-navigation/native";


export default function NewReviewTopContainer({contact, bottomSheetModalRef}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigation = useNavigation();
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {

    }, []);

    const handlePresentPress = () => bottomSheetModalRef.current.present()

    function onSubmitPress(){
        navigation.navigate('MoreInfoSubmissionScreen');
    }


    return (
        <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <FontAwesome name="chevron-left" style={styles.backIcon}/>
                        <Text style={styles.backIcon}> Back </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerExtensionContainer}>
                <View style={styles.avatarContainer}>
                    <UserAvatar
                        size={40}
                        active
                        src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                    <Text style={styles.contactName}>{contact.name}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <UserAvatar
                        size={40}
                        active
                        src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                    <Text style={styles.contactName}>{contact.name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerExtensionContainer: {
        width: '100%',
        marginTop: 10,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    avatarContainer: {
        flexDirection: 'row',
        marginHorizontal: 7
    },
    searchContainer: {
        flexDirection: 'row',
        marginTop: 15,
        zIndex: 10,
        width: '100%',
    },
    accoountContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    typeSelectButton: {
        backgroundColor: Colors.light.tint,
        width: 45,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    accountInput: {
        backgroundColor: Colors.light.grey,
        marginHorizontal: 10,
        padding: 5,
        alignItems: 'center',
        alignContent: 'center',
        width: '85%',
        borderRadius: 5
    },
    headerContainer: {
        // zIndex: -1,
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingBottom: 10,
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
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    topContainer: {
        backgroundColor: '#ffffff',
        // width: '100%',
    },
    reviewType:{
        width: '15%'
    },
    searchCategory:{
        width: '75%'
    },
    bottomSheetContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
