import React, {useEffect, useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {API, Auth} from "aws-amplify";
import {useNavigation} from "@react-navigation/native";
import CustomSettingRowButton from "../../../components/CustomSettingRowButton";
import CustomButton from "../../../components/CustomButton";
import Colors from "../../../constants/Colors";
import CustomSettingRow from "../../../components/CustomSettingRow";
import {getAllContact} from "../../../components/PhonebookLibrary";
import uuid from 'react-native-uuid';
import UserAvatar from 'react-native-user-avatar';


const EditProfileScreen = (props) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [accountId, setAccountId] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");

    const navigation = useNavigation();
    useEffect(() => {

    }, []);









    const onEditEmailPressed = () => {
        navigation.navigate('EditEmail');
    };

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <UserAvatar size={100} name={name} src={image} />

            </View>

            <View style={styles.settingsContainer}>

                <CustomSettingRow
                    name="Account ID"
                    value={accountId}
                    iconCategory="FontAwesome5"
                    iconName="id-card"
                    editable={false}
                />

                <CustomSettingRow
                    name="Name"
                    value={name}
                    setValue={setName}
                    iconCategory="Fontisto"
                    iconName="person"
                    editable={true}
                />

                <CustomSettingRowButton

                    name="Phone"
                    value={phone}
                    iconCategory="FontAwesome5"
                    iconName="phone"
                />

                <CustomSettingRowButton

                    name="Email"
                    value={email}
                    iconCategory="FontAwesome5"
                    iconName="envelope"
                />

                <CustomSettingRowButton

                    name="Setting"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="cog"
                />

                <CustomSettingRowButton

                    name="Help"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="question-circle"
                />

                <CustomSettingRowButton

                    name="Language"
                    value="English"
                    iconCategory="FontAwesome5"
                    iconName="globe"
                />

                <CustomSettingRow
                    name="Bio"
                    value={bio}
                    setValue={setBio}
                    iconCategory="FontAwesome"
                    iconName="book"
                    editable={true}
                    multiline={true}
                />
            </View>

            <View style={styles.bottomContainer}>
                <CustomButton

                    text="Save"
                    bgColor={Colors.light.tint}
                    fgColor="#FFFFFF"
                />
            </View>

        </ScrollView>
    )
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%',
    },
    topContainer: {
        marginTop: 30,
        height: 200,
        alignItems: "center",
    },
    bottomContainer:{
        paddingTop: 20,
        margin: 20,
    },
    settingsContainer:{
        margin: 10,
        marginTop: 5,
    },
    settingItem:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: "space-between",
        paddingBottom: 5,
    },
    settingNameContainer:{
        flexDirection: "row",
        marginLeft: 10,

    },
    settingValueContainer:{
        marginRight: 10,
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
        paddingRight: 10,
    },
    settingEmailValue: {
        color: "grey",
    },
    pressableSetting: {
        flexDirection: "row",
    },
});

