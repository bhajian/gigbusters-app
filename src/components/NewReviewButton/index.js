import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import PhonebookModal from '../PhonebookModal';
import {AntDesign} from "@expo/vector-icons";

export default function NewReviewButton() {
    const [isModalVisible, setModalVisible] = useState(false);
    // const toggleModal = () => {
    //   setModalVisible(!isModalVisible);
    // };
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('AccountSearchReviewScreen', {navigation: navigation});
    };

    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onPress}>
            <AntDesign name="plus" size={27} color="white"/>
            {/*<PhonebookModal visibility={isModalVisible} onClose={onPress} />*/}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        marginLeft: 0,
        paddingTop: 40,
    },
    cancelButton: {
        margin: 15,
        fontSize: 17,
        color: Colors.light.tint,
    },
    modalTop: {
        height: 50,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
