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
import UserAvatar from 'react-native-user-avatar';
import {ProfileService} from "../../../backend/ProfileService";
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as ImagePicker from "expo-image-picker";
import {Auth, Storage} from 'aws-amplify';
import loading from '../../../../assets/images/loading2.gif'

const profileService = new ProfileService()
const EditProfileScreen = (props) => {

    const [name, setName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState(null)
    const [dataBeingSaved, setDataBeingSaved] = useState(false)

    const navigation = useNavigation();

    const onSavePress = useCallback(async () => {
        try{
            setDataBeingSaved(true)
            const profile = profileService.getProfile()
            profile.name = name
            profile.bio = bio
            await profileService.updateProfile(profile)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    },[name, bio])


    const loadData = useCallback(async () => {
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
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setImage(url)
        }
    },[])

    const onSettingPressed = () => {
        navigation.navigate('EditSettingsScreen');
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
    }, [loadData])

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
                dataBeingSaved ?
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

    }, [onSavePress, dataBeingSaved])

    const onPhotoPressed = async() => {
        try {
            setDataBeingSaved(true)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 0.1,
            })
            const imageUri = result.assets[0].uri
            if (!result.canceled) {
                setImage(imageUri)
            } else{
                return
            }
            const user = await Auth.currentCredentials()
            const profilePhotoObj = await profileService.setProfilePhoto({
                type: 'main',
                identityId: user.identityId,
            })
            if(!profilePhotoObj) {
                throw new Error('Profile Photo cannot be added!')
            }
            const response = await fetch(imageUri)
            const blob = await response.blob()
            const key = profilePhotoObj.key
            await Storage.put(key, blob, {
                bucket: profilePhotoObj.bucket,
                level: 'protected',
                contentType: blob.type,
                progressCallback: progress => {

                }
            })
            const currentUser = await Auth.currentAuthenticatedUser()
            await profileService.fetchProfile({userId: currentUser.sub})
            loadData().then(r => {})
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    const onEditPhonePressed = () => {
        navigation.navigate('VerifyPasswordScreen',
            {
                changeObject: 'phone',
                phone: phone
            })
    };

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <UserAvatar
                    size={80}
                    name={name}
                    style={styles.avatar}
                    src={image}
                />
                {
                    dataBeingSaved ?
                        <Image source={loading} style={{width: 30, height: 30}} />
                        :
                        <Pressable
                            style={styles.photoChange}
                            onPress={onPhotoPressed}
                        >
                            <Text style={styles.photoChange}>Change Photo</Text>
                        </Pressable>
                }

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
                    onPress={onSettingPressed}
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
        color: '#0f66a9',
        fontSize: 14,
        marginTop: 5
    },
    avatar: {

    },
    editPhoto: {
        color: 'blue',
        alignSelf: 'center',
        marginTop: 3
    },
});

