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
import ReviewTypePicker from "../../../components/ReviewTypePicker";
import {SearchCategory} from "../../../components/SearchCategory";
import Feather from "react-native-vector-icons/Feather";


export default function NewReviewTopContainer({contact, pickImage, navigation, bottomSheetModalRef}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('phone');
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {

    }, []);

    const handlePresentPress = () => bottomSheetModalRef.current.present()


    return (
        <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <FontAwesome name="chevron-left" style={styles.backIcon}/>
                        <Text style={styles.backIcon}>  Back </Text>
                    </TouchableOpacity>
                    <UserAvatar
                        size={40}
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
                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        onPress={handlePresentPress}>
                        <View style={styles.typeSelectButton}>
                            <Feather name="search" size={30} color="white"/>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        value={value}
                        onChangeText={setValue}
                        style={styles.accountInput}
                    />
                </View>
                <View style={styles.accountContainer}>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerExtensionContainer: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    searchContainer: {
        flexDirection: 'row',
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
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
        width: '85%',
        borderRadius: 5
    },
    headerContainer: {
        // zIndex: -1,
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
    topContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
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
