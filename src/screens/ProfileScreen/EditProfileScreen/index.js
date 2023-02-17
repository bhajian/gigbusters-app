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

const profileService = new ProfileService()
const EditProfileScreen = (props) => {

    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        getCurrentUserData().then(r => {})

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
                    <Text style={{color: '#0f66a9', fontSize: 18}}>Save</Text>
                </Pressable>
            ),
            // headerLeft: () => (
            //
            // )
        })


    }, []);

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.accountCode){
            setAccountNumber(profile.accountCode)
        }
        if(profile && profile.name){
            setName(profile.name)
        }
        if(profile && profile.bio){
            setBio(profile.bio)
        }
        if(profile && profile.email && profile.email.email){
            setEmail(profile.email.email)
        }
        if(profile && profile.phone && profile.phone.phone){
            setPhone(profile.phone.phone)
        }
    }

    const onSavePress = async () => {
        try{
            const profile = profileService.getProfile()
            profile.name = name
            profile.bio = bio
            await profileService.updateProfile(profile)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    };

    const onPhotoPressed = () => {
        console.log('change photo')
    }

    const onEditPhonePressed = () => {
        navigation.navigate('VerifyPasswordScreen',
            {
                changeObject: 'phone',
                phone: phone
            });
    };

    return (
        <ScrollView style={styles.container} >

            <View style={styles.topContainer} >
                <Pressable
                    style={styles.photoChange}
                    onPress={onSavePress}
                >
                    <UserAvatar
                        size={80}
                        name={name}
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
                    value={accountNumber}
                    iconCategory="FontAwesome5"
                    iconName="id-card"
                    editable={false}
                />
                <CustomSettingRow
                    name="Name"
                    placeholder="Name"
                    value={name}
                    setValue={setName}
                    iconCategory="Fontisto"
                    iconName="person"
                    editable={true}
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
                <CustomSettingRowButton
                    onPress={onEditPhonePressed}
                    name="Phone"
                    value={phone}
                    iconCategory="FontAwesome5"
                    iconName="phone"
                />
                <CustomSettingRowButton
                    // onPress={onEditEmailPressed}
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
        // flexDirection: 'column'
    },
    avatar: {

    },
    editPhoto: {
        color: 'blue',
        alignSelf: 'center',
        marginTop: 3
    },
});

