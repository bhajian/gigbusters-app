import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import PhoneBook from "../PhoneBook";
import Modal from "react-native-modal";


export default function PhonebookModal(props) {

    return (
        <Modal
            isVisible={props.visibility}
            style={styles.modal}
        >
            <PhoneBook
                inModal={true}
                modalClose={props.onClose}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        marginLeft: 0,
        paddingTop: 0,
    },
    cancelButton:{
        paddingTop: 10,
        margin: 15,
        fontSize: 17,
        color: Colors.light.tint,
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
    }
});
