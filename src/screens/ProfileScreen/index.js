import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {API, Auth} from "aws-amplify";
import CustomButton from "../../components/CustomButton";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import UserAvatar from 'react-native-user-avatar';
import {LocationSelector} from "../../components/LocationSearch";
import ReferralReviewItem from "../../components/ReferralRequestItem";
import users from "../../../assets/data/users";

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUserData()
    }, []);

    async function setCurrentUserData() {
        // const currentUser = await Auth.currentAuthenticatedUser();
        if(currentUser) {

        }
    }

    async function signOut() {
        try {
            await Auth.signOut();
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

    return (
        <ScrollView style={styles.container} >
            <View style={styles.topContainer} >
                <UserAvatar
                    size={80}
                    name="John doe"
                    // src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                />
                <Text style={styles.name} >
                    {(currentUser ? currentUser.name : "John Doe")}
                </Text>
                <Text style={styles.email} >
                    Email: {(currentUser ? currentUser.email : "john.doe@gmail.com")}
                </Text>
                <Text style={styles.phone} >
                    Phone: {(currentUser ? currentUser.phone : "+1(648)565-9988")}
                </Text>
                <Text style={styles.accountNumber} >
                    ID: {(currentUser ? currentUser.accountId : "456-789-123")}
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
                    text="Change to Business Account"
                    onPress={onUpgradePressed}
                    style={styles.regularButton}
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />
                <View style={styles.doubleButton}>
                    <CustomButton
                        text="Referral Activities"
                        style={styles.activityButton}
                        bgColor="#E3E8F1"
                        fgColor="#000000"
                    />
                    <CustomButton
                        text="Matched Activities"
                        style={styles.activityButton}
                        bgColor="#E3E8F1"
                        fgColor="#000000"
                    />
                </View>
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
