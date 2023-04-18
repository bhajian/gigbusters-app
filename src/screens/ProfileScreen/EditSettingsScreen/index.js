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
import {ProfileService} from "../../../backend/ProfileService";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import loading from '../../../../assets/images/loading2.gif'
import CustomSettingRowSwitch from "../../../components/CustomSettingRowSwitch";
import CustomSettingRowCategory from "../../../components/CustomSettingRowCategory";

const profileService = new ProfileService()
const EditSettingsScreen = (props) => {

    const [notifications, setNotifications] = useState(true)
    const [allowPublicMessages, setAllowPublicMessages] = useState(true)
    const [showMyPhonePublicly, setShowMyPhonePublicly] = useState(true)
    const [showMyEmailPublicly, setShowMyEmailPublicly] = useState(true)
    const [country, setCountry] = useState('Canada')
    const [language, setLanguage] = useState('English')
    const [beingSaved, setBeingSaved] = useState(false)

    const navigation = useNavigation()

    async function onSavePress() {
        try{
            setBeingSaved(true)
            await profileService.setProfileSettings({
                allowPublicMessages: allowPublicMessages,
                notifications: notifications,
                showMyEmailPublicly: showMyEmailPublicly,
                showMyPhonePublicly: showMyPhonePublicly,
                language: language,
                country: country
            })
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
        setBeingSaved(false)
    }

    async function loadData() {
        try{
            const settings = await profileService.getProfileSettings()

            setNotifications(settings?.notifications)
            setAllowPublicMessages(settings?.allowPublicMessages)
            setShowMyEmailPublicly(settings?.showMyEmailPublicly)
            setShowMyPhonePublicly(settings?.showMyPhonePublicly)
            setCountry(settings?.country)
            setLanguage(settings?.language)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadData().then(r => {}).catch(e => console.log(e))
    }, [])

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
                beingSaved ?
                    <Image source={loading} style={{width: 30, height: 30}} />
                :
                    <Pressable
                        onPress={onSavePress}
                        style={({pressed}) => ({
                            opacity: pressed ? 0.5 : 1,
                            marginRight: 10,
                        })}>
                        <Text style={{color: Colors.light.tint, fontSize: 18}}>Save</Text>
                    </Pressable>
            ),
            headerTintColor: Colors.light.tint
        })
        return

    }, [navigation, onSavePress, beingSaved]);



    return (
        <ScrollView style={styles.container} >
            <View style={styles.settingsContainer}>
                <CustomSettingRowCategory
                    name="Notifications"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="cog"
                />
                <CustomSettingRowSwitch
                    toggleSwitch={setNotifications}
                    name="Allow Notifications"
                    isEnabled={notifications}
                    iconCategory="MaterialIcons"
                    iconName="notifications-active"
                />
                <CustomSettingRowSwitch
                    toggleSwitch={setAllowPublicMessages}
                    name="Allow Messages from Unknown Users"
                    isEnabled={allowPublicMessages}
                    iconCategory="FontAwesome5"
                    iconName="envelope"
                />
                <CustomSettingRowCategory
                    name="Privacy"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="cog"
                />
                <CustomSettingRowSwitch
                    toggleSwitch={setShowMyPhonePublicly}
                    name="Show My Phone Publicly"
                    isEnabled={showMyPhonePublicly}
                    iconCategory="FontAwesome5"
                    iconName="phone"
                />
                <CustomSettingRowSwitch
                    toggleSwitch={setShowMyEmailPublicly}
                    name="Show My Email Publicly"
                    isEnabled={showMyEmailPublicly}
                    iconCategory="FontAwesome5"
                    iconName="envelope"
                />
                <CustomSettingRowButton
                    name="Language"
                    value={language}
                    iconCategory="FontAwesome5"
                    iconName="globe"
                />
                <CustomSettingRowButton
                    name="Country"
                    value={country}
                    iconCategory="FontAwesome5"
                    iconName="globe"
                />
                <CustomSettingRowCategory
                    name="Deactivate"
                    value=""
                    iconCategory="FontAwesome5"
                    iconName="cog"
                />
                <CustomSettingRowButton
                    name="Deactivate My Account"
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

