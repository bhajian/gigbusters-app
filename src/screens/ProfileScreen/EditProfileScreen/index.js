import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CustomSettingRowButton from "../../../components/CustomSettingRowButton";
import CustomSettingRow from "../../../components/CustomSettingRow";
import UserAvatar from 'react-native-user-avatar';
import {ProfileService} from "../../../backend/ProfileService";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {AntDesign} from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text> Edit Profile</Text>
            ),
            headerRight: () => (
                <Pressable
                    onPress={onSavePress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <Text style={{color: '#1d7bc4', fontSize: 18}}>Save</Text>
                </Pressable>
            ),
            // headerLeft: () => (
            //
            // )
        })

        getCurrentUserData().then(r => {})
    }, []);

    async function getCurrentUserData() {
        const profiles = profileService.getProfiles()
        setCurrentProfile(profiles[0])
    }

    const onSavePress = () => {
        console.log('save clicked')
    }

    const onPhotoPressed = () => {
        console.log('change photo')
    }

    const onEditEmailPressed = () => {
        navigation.navigate('VerifyPasswordScreen', {changeObject: 'email'});
    }

    const onEditPhonePressed = () => {
        navigation.navigate('VerifyPasswordScreen', {changeObject: 'phone'});
    };

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <Pressable
                    style={styles.photoChange}
                    onPress={onPhotoPressed}
                >
                    <UserAvatar
                        size={80}
                        name={currentProfile.name}
                        style={styles.avatar}
                        // src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                    <Text style={styles.editPhoto}>Edit</Text>
                </Pressable>
            </View>

            <View style={styles.settingsContainer}>
                <CustomSettingRow
                    name="Account ID"
                    placeholder="Account ID"
                    value={currentProfile.accountCode}
                    iconCategory="FontAwesome5"
                    iconName="id-card"
                    editable={false}
                />

                <CustomSettingRow
                    name="Name"
                    placeholder="Name"
                    value={currentProfile.name}
                    setValue={setName}
                    iconCategory="Fontisto"
                    iconName="person"
                    editable={true}
                />

                <CustomSettingRowButton
                    onPress={onEditPhonePressed}
                    name="Phone"
                    value={phone}
                    iconCategory="FontAwesome5"
                    iconName="phone"
                />

                <CustomSettingRowButton
                    onPress={onEditEmailPressed}
                    name="Email"
                    value={email}
                    iconCategory="FontAwesome5"
                    iconName="envelope"
                />

                <CustomSettingRowButton
                    // onPress={onEditSettingPressed}
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
                    placeholder="Bio"
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
        height: 100,
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
    photoChange: {
        flexDirection: 'column'
    },
    avatar: {

    },
    editPhoto: {
        color: 'blue',
        alignSelf: 'center',
        marginTop: 3
    },
});

