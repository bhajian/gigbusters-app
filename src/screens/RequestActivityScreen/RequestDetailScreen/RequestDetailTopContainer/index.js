import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text, TextInput, Image,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import {useNavigation} from "@react-navigation/native";
import users from '../../../../../assets/data/users';

export default function RequestDetailTopContainer({item}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('phone');
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigation = useNavigation();

    useEffect(() => {

    }, []);

    return (
        <View style={styles.topContainer}>
            <View style={styles.headerExtensionContainer}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: users[0].image}} style={styles.image} />
                    <Text style={styles.titleText}>
                        {users[0].name}
                    </Text>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Toronto</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >9AM-10PM</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >Personal Trainer</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textTag} >15$/hr</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: 'lightgrey',
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 2,
    },
    headerExtensionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    searchContainer: {
        flexDirection: 'row',
        zIndex: 10,
        width: '100%',
    },
    accountContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    accountInput: {
        backgroundColor: Colors.light.grey,
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        borderRadius: 5
    },
    infoContainer: {
        // flexDirection: 'columns',
    },
    info: {
        borderRadius: 50,
        backgroundColor: Colors.light.grey,
        marginHorizontal: 2,
        margin: 3,
    },
    textTag: {
        textAlign: 'center',
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 1,
        marginBottom: 2,
        color: '#000',
    },
    ratingStackContainer: {
        width: '70%',
        paddingHorizontal: 15,
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
    shareButton: {
        borderColor: Colors.light.tint,
        borderRadius: 5,
        borderWidth: 1,
        marginEnd: 5,
        width: 40,
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
        // flexDirection: 'row',
        width: '100%',
    },
    privateSwitch: {
        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
        marginTop: 5,
    },
    reviewType:{
        width: '15%'
    },
    searchCategory:{
        width: '75%'
    }
});
