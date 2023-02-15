import React from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet} from "react-native";
import {Auth} from "aws-amplify";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import PhoneInput from 'react-native-phone-input'

const EditPhoneScreen = (props) => {

    async function signOut() {
        try {
            await Auth.signOut();
            props.updateAuthState('loggedOut');
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.topContainer} >

            </View>
            <View style={styles.mainContainer}>
                <View style={styles.settingItem}>
                    <View style={styles.settingNameContainer}>
                        <FontAwesome5 name="phone" style={styles.settingIcon}/>
                        <Text style={styles.settingName}> Phone </Text>
                    </View>
                    <View style={styles.settingValueContainer}>
                        <PhoneInput />
                    </View>
                </View>
                <CustomButton
                    style={styles.nextButton}
                    text="Next Step"
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />
            </View>
        </View>
    )
};

export default EditPhoneScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%',
    },
    topContainer: {
        marginTop: 30,
        height: 150,
        alignItems: "center",
    },
    nextButton: {
        marginTop: 15,
    },
    mainContainer:{
        margin: 20,
        marginTop: 5,
    },
    settingItem:{
        flexDirection: "column",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: "space-between",
    },
    settingNameContainer:{
        flexDirection: "row",
        marginLeft: 10,
        paddingBottom: 3,
    },
    settingValueContainer:{
        margin: 10,
    },
    settingName: {
        color: "grey",
        marginLeft: 5,
    },
    settingIcon: {
        color: "grey",
    },
    settingValue: {

    },
    settingBioValue: {
        textAlignVertical: 'top',
    },
    settingPhoneValue: {
        color: "grey",
    },
    settingEmailValue: {
        color: "grey",
    },
    pressableSetting: {
        flexDirection: "row",

    },
});

