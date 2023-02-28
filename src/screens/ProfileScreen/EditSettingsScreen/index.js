import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CustomSettingRowButton from "../../../components/CustomSettingRowButton";
import CustomSettingRow from "../../../components/CustomSettingRow";
import {ProfileService} from "../../../backend/ProfileService";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import loading from '../../../../assets/images/loading.gif'
import CustomSettingRowSwitch from "../../../components/CustomSettingRowSwitch";

const profileService = new ProfileService()
const EditSettingsScreen = (props) => {

    const [allowNotifications, setAllowNotifications] = useState('');
    const [showMyIdentity, setShowMyIdentity] = useState('');
    const [language, setLanguage] = useState('');
    const [saved, setSaved] = useState(false);

    const navigation = useNavigation();

    const onSavePress = useCallback(async () => {
        try{
            setSaved(true)
            // const profile = profileService.getProfile()
            // profile.name = name
            // profile.bio = bio
            // await profileService.updateProfile(profile)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    },[])


    const getCurrentUserData = useCallback(async () => {
        // const profile = profileService.getProfile()
        // if(profile && profile.accountCode){
        //     setAccountNumber(profile.accountCode)
        // }
        // if(profile && profile.name){
        //     setName(profile.name)
        // }
        // if(profile && profile.bio){
        //     setBio(profile.bio)
        // }
        // if(profile && profile.email && profile.email.email){
        //     setEmail(profile.email.email)
        // }
        // if(profile && profile.phone && profile.phone.phone){
        //     setPhone(profile.phone.phone)
        // }
    },[])

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData]);

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
                saved ?
                    <Image source={loading} style={{width: 40, height: 30}} />
                :
                    <Pressable
                        onPress={onSavePress}
                        style={({pressed}) => ({
                            opacity: pressed ? 0.5 : 1,
                            marginRight: 10,
                        })}>
                        <Text style={{color: '#0f66a9', fontSize: 18}}>Save</Text>
                    </Pressable>
            ),
        })
        return

    }, [onSavePress, saved]);



    return (
        <ScrollView style={styles.container} >

            <View style={styles.settingsContainer}>

                <CustomSettingRowSwitch
                    // onPress={onEditEmailPressed}
                    name="Allow Notifications"
                    isEnabled={true}
                    iconCategory="MaterialIcons"
                    iconName="notifications-active"
                />
                <CustomSettingRowSwitch
                    // onPress={onEditEmailPressed}
                    name="Show my identity"
                    isEnabled={true}
                    iconCategory="MaterialIcons"
                    iconName="perm-identity"
                />
                <CustomSettingRowButton
                    // onPress={onEditSettingPressed}
                    name="Setting"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="cog"
                />
                <CustomSettingRowButton
                    name="Language"
                    value="English"
                    iconCategory="FontAwesome5"
                    iconName="globe"
                />
                <CustomSettingRowButton
                    name=""
                    value=""
                    iconCategory=""
                    iconName=""
                    hasArrow={false}
                />
                <CustomSettingRowButton
                    name="Delete My Account"
                    value=""
                    iconCategory="MaterialCommunityIcons"
                    iconName="delete-forever"
                    nameStyle={{color: 'red'}}
                />
            </View>

        </ScrollView>
    )
};

export default EditSettingsScreen;

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
        marginTop: 150,
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
    editPhoto: {
        color: 'blue',
        alignSelf: 'center',
        marginTop: 3
    },
});

