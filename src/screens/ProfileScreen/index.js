import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import {API, Auth} from "aws-amplify";
import CustomButton from "../../components/CustomButton";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import Colors from "../../constants/Colors";
import UserAvatar from "@muhzi/react-native-user-avatar";
import {LocationSelector} from "../../components/LocationSearch";
import {ProfileService} from "../../backend/ProfileService";
import workerImage from '../../../assets/images/worker.png'
import customerImage from '../../../assets/images/customer.png'

const profileService = new ProfileService()
const ProfileScreen = (props) => {
    const navigation = useNavigation()
    const profile = profileService.getProfile()

    const [name, setName] = useState('');
    const [accountCode, setAccountCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [locationName, setLocationName] = useState(profile?.location?.locationName)
    const [accountType, setAccountType] = useState('CONSUMER')
    const [image, setImage] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData()
        })
        return unsubscribe
    }, [])

    function loadData() {
        const profile = profileService.getProfile()
        if(profile && profile.accountCode){
            setAccountCode(profile.accountCode)
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
        if(profile && profile.location && profile.location.locationName){
            setLocationName(profile.location.locationName)
        }
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setImage(url)
        }
    }

    const onLocationChangePressed = async(props) => {
        await profileService.changeUserLocation({
            locationName: props.locationName,
            latitude: props.coordinates.lat,
            longitude: props.coordinates.lng,
        })
        setLocationName(props.locationName)
    }

    async function signOut() {
        try {
            profileService.clearProfile()
            await Auth.signOut({global: true})
            props.updateAuthState('loggedOut');
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }

    const onEditPressed = () => {
        navigation.navigate('EditProfile');
    }

    async function onRatingProfilePressed() {
        navigation.navigate('ReviewableProfileScreen', {
            reviewable: {
                name: name,
                profilePhotoURL: image,
                uri: accountCode
            }})
    }
    const onSwitchProfilePressed = async() => {
        try{
            props.updateAuthState('initializing')
            const profile = profileService.getProfile()
            if(accountType === 'WORKER'){
                profile.accountType = 'CONSUMER'
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
        <ScrollView style={styles.container}>
            <View style={styles.topContainer}>
                <UserAvatar
                    size={80}
                    userName={name}
                    src={image}
                    backgroundColor={Colors.light.turquoise}
                    fontSize={40}
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
                    ID: {accountCode}
                </Text>
                <View style={styles.roleContainer}>
                    <Text style={styles.roleText}>
                        Role:
                    </Text>
                    <Image
                        source={accountType === 'CONSUMER' ?
                            customerImage : workerImage} style={styles.roleImage}
                    />
                    <Text style={styles.roleText}>
                        {accountType === 'CONSUMER'? 'Customer' : 'Worker'}
                    </Text>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.locationContainer}>
                    <LocationSelector
                        onLocationChangePressed={onLocationChangePressed}
                        locationNameParam={locationName}
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
                    text="Ratings and Reviews"
                    onPress={onRatingProfilePressed}
                    style={styles.regularButton}
                    bgColor="#E3E8F1"
                    fgColor="#000000"
                />
                <CustomButton
                    text={'Switch to ' +
                        (accountType === 'CONSUMER'? 'Worker': 'Customer')+ ' Account'}
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
    roleImage: {
        height: 40,
        width: 40,
        borderRadius: 30
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    roleText: {
        marginHorizontal: 5
    }
});
