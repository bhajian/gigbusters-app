import React, {useEffect, useState} from "react";
import {View, Text, ImageBackground, Pressable, TextInput, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CustomSettingRowButton from "../../../components/CustomSettingRowButton";
import CustomSettingRow from "../../../components/CustomSettingRow";
import UserAvatar from 'react-native-user-avatar';
import {ProfileService} from "../../../backend/ProfileService";


const EditProfileScreen = (props) => {
    const [currentProfile, setCurrentProfile] = useState({});
    const profileService = new ProfileService()

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [accountId, setAccountId] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, []);

    async function getCurrentUserData() {
        const profiles = profileService.getProfiles()
        setCurrentProfile(profiles[0])
    }

    const onEditEmailPressed = () => {
        navigation.navigate('EditEmail');
    };

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <UserAvatar
                    size={80}
                    name={currentProfile.name}
                    // src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                />
            </View>

            <View style={styles.settingsContainer}>
                <CustomSettingRow
                    name="Account ID"
                    value={currentProfile.accountCode}
                    iconCategory="FontAwesome5"
                    iconName="id-card"
                    editable={false}
                />

                <CustomSettingRow
                    name="Name"
                    value={currentProfile.name}
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

