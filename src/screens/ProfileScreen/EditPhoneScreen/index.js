import React, {useEffect, useRef, useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../../../components/CustomButton";
import PhoneInput from 'react-phone-number-input/react-native-input'
import {ProfileService} from "../../../backend/ProfileService";
import {useNavigation} from "@react-navigation/native";

const EditPhoneScreen = ({route}) => {
    const profileService = new ProfileService()
    const profile = profileService.getProfile()
    const {phoneParam} = (route.params ? route.params : '');
    const [phone, setPhone] = useState(phoneParam);
    const navigation = useNavigation();

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, []);

    async function getCurrentUserData() {
        if(profile && profile.phone && profile.phone.phone){
            setPhone(profile.phone.phone)
        }
    }
    async function onNextPress() {

        navigation.navigate('VerifyCodeScreen', {
            phoneParam: phone
        })
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
                        <PhoneInput
                            countrySelectProps={{ unicodeFlags: true }}
                            value={phone}
                            onChange={setPhone}
                        />
                    </View>
                </View>
                <CustomButton
                    onPress={onNextPress}
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

