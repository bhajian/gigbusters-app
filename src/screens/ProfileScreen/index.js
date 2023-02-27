import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {API, Auth} from "aws-amplify";
import CustomButton from "../../components/CustomButton";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import UserAvatar from 'react-native-user-avatar';
import {LocationSelector} from "../../components/LocationSearch";
import {ProfileService} from "../../backend/ProfileService";
import { Storage } from 'aws-amplify';

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [accountType, setAccountType] = useState('USER')
    const [image, setImage] = useState(null);

    const profileService = new ProfileService()

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData]);

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.accountCode){
            setAccountNumber(profile.accountCode)
        }
        if(profile && profile.accountType){
            setAccountType(profile.accountType)
        }
        if(profile && profile.name){
            setName(profile.name)
        }
        if(profile && profile.email && profile.email.email){
            setEmail(profile.email.email)
        }
        if(profile && profile.phone && profile.phone.phone){
            setPhone(profile.phone.phone)
        }
        if(profile && profile.photos && profile.photos[0] && profile.photos[0].key){
            try{
                const mainPhoto = profile.photos
                    .filter((item) => item.main === true)

                const key = mainPhoto[0].key
                const signedURL = await Storage.get(key, { level: 'protected' })
                setImage(signedURL)
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function signOut() {
        try {
            await Auth.signOut();
            profileService.clearProfile()
            props.updateAuthState('loggedOut');
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }

    const onUpgradePressed = () => {
        navigation.navigate('UpgradePremium');
    };

    const onEditPressed = () => {
        navigation.navigate('EditProfile');
    };

    const onSwitchProfilePressed = async() => {
        try{
            props.updateAuthState('initializing')
            const profile = profileService.getProfile()
            if(accountType === 'WORKER'){
                profile.accountType = 'USER'
            } else{
                profile.accountType = 'WORKER'
            }
            setAccountType(profile.accountType)
            await profileService.updateProfile(profile)
            props.updateAccountType(profile.accountType)
            props.updateAuthState('loggedIn')
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <UserAvatar
                    size={80}
                    name={name}
                    src={image}
                />
                <Text style={styles.name} >
                    {name}
                </Text>
                <Text style={styles.email} >
                    Email: {email}
                </Text>
                <Text style={styles.phone} >
                    Phone: {phone}
                </Text>
                <Text style={styles.accountNumber} >
                    ID: {accountNumber}
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.locationContainer}>
                    <LocationSelector />
                </View>
                <View style={styles.doubleButton}>
                    <CustomButton
                        text="Link to"
                        iconCategory="Entypo"
                        iconName="instagram"
                        onPress={onUpgradePressed}
                        iconStyle={styles.instagrambuttonIcon}
                        style={styles.linkAccountButton}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                    <CustomButton
                        text="Link to"
                        iconCategory="FontAwesome5"
                        iconName="tiktok"
                        onPress={onUpgradePressed}
                        iconStyle={[styles.tiktokbuttonIcon]}
                        style={styles.linkAccountButton}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                </View>
                <View style={styles.doubleButton}>
                    <CustomButton
                        text="Link to"
                        iconCategory="FontAwesome5"
                        iconName="twitter"
                        onPress={onUpgradePressed}
                        iconStyle={styles.twitterbuttonIcon}
                        style={styles.linkAccountButton}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                    <CustomButton
                        text="Link to"
                        iconCategory="FontAwesome5"
                        iconName="linkedin"
                        onPress={onUpgradePressed}
                        iconStyle={styles.linkedinbuttonIcon}
                        style={styles.linkAccountButton}
                        bgColor="#E3E8F1"
                        fgColor="#5B67CA"
                    />
                </View>
                <CustomButton
                    text="Edit Profile"
                    onPress={onEditPressed}
                    style={styles.regularButton}
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />

                <CustomButton
                    text={'Switch to ' +
                        (accountType === 'USER'? 'Worker': 'Consumer')+ ' Account'}
                    onPress={onSwitchProfilePressed}
                    style={styles.regularButton}
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />
                <CustomButton
                    text="Sign Out"
                    onPress={signOut}
                    style={styles.regularButton}
                    bgColor="#E3E8F1"
                    fgColor="#FB1F1F"
                />
            </View>
        </ScrollView>
    )
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: '100%',
    },
    locationContainer:{
        marginVertical: 5,
    },
    doubleButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    instagrambuttonIcon: {
        marginHorizontal: 5,
        color: '#e35a5a'
    },
    tiktokbuttonIcon: {
        marginHorizontal: 5,
        color: '#000'
    },
    twitterbuttonIcon: {
        marginHorizontal: 5,
        color: '#5397dc'
    },
    linkedinbuttonIcon: {
        marginHorizontal: 5,
        color: '#527fa4'
    },
    topContainer: {
        marginTop: 60,
        alignItems: "center",
        margin: 20,
    },
    linkAccountButton:{
        width: '48%',
        height: 45
    },
    matchedActivityContainer:{
        margin: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#c4bfbf'
    },
    regularButton:{
        height: 45
    },
    activityButton:{
        width: '48%',
        height: 65
    },
    bottomContainer: {
        margin: 20,
        marginTop: 10,
    },
    name:{
        fontSize: 25,
        fontWeight: '600',
        marginTop: 15,
        margin: 5,
    },
    email:{
        margin: 5,
        color: "grey",
    },
    phone:{
        margin: 5,
        color: "grey",
    },
    accountNumber:{
        margin: 5,
        color: Colors.light.tint,
    },
});
