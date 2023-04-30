import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TextInput} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import profileAnim from "../../../../assets/animations/67352-profile-creation-loader.json";
import Lottie from "lottie-react-native";
import Colors from "../../../constants/Colors";
import {ProfileService} from "../../../backend/ProfileService";
import CategoryMultiSelector from "../../../components/CategoryMultiSelector";
import {LocationSelector} from "../../../components/LocationSearch";

const CompleteProfileScreen = ({route, updateAuthState}) => {
    const profile = route?.params
    const [accountType, setAccountType] = useState('CONSUMER')
    const [categories, setCategories] = useState([])
    const [location, setLocation] = useState({})
    const profileService = new ProfileService()

    const onCategoriesChanged = async(params) => {
        const catList = []
        for(let i=0; i<params.length; i++){
            catList.push(params[i].category)
        }
        setCategories(catList)
    }

    const onLocationChangePressed = async(props) => {
        setLocation({
            locationName: props.locationName,
            latitude: props.coordinates.lat,
            longitude: props.coordinates.lng,
        })
    }

    async function onCompletePressed() {
        try {
            if(!location?.locationName ){
                throw new Error('Please select your location.')
            }
            updateAuthState('initializing')
            await profileService.createProfile({
                name: profile.name,
                subscription: profile.subscription,
                accountType: profile.accountType,
                email: {
                    email: profile.email,
                    verified: true // FIX me should be written in the server by default
                },
                phone: {
                    phone: profile.phone,
                    verified: false // FIX me should be written in the server by default
                },
                location: location,
                interestedCategories: categories,
                settings: {
                    allowPublicMessages: true,
                    notifications: true,
                    showMyEmailPublicly: true,
                    showMyPhonePublicly: true,
                }
            })
            updateAuthState('loggedIn')
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Lottie
                    style={{height: 180, width: 180, alignSelf: 'center', margin: 5}}
                    source={profileAnim}
                    autoPlay
                    loop
                />
                <View style={styles.form}>
                    {
                        profile.accountType === 'WORKER' ?
                            <View style={styles.categoriesContainer}>
                                <CategoryMultiSelector
                                    onSelectionChanged={onCategoriesChanged}
                                    selectedItems={categories}
                                />
                            </View>
                            :
                            <View></View>

                    }

                    <View style={styles.locationContainer}>
                        <LocationSelector
                            onLocationChangePressed={onLocationChangePressed}
                            locationNameParam={location.locationName}
                        />
                    </View>
                </View>
                <CustomButton
                    text="Finish"
                    style={styles.component}
                    onPress={onCompletePressed}
                />
            </View>
        </ScrollView>
    );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        // alignItems: "center",
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        height: 800,
    },
    categoriesContainer:{
        width: '100%',
        alignItems: 'center'
    },
    form: {
        marginTop: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30
    },
    phoneContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: 'row',
    },
    phoneIcon: {
        padding: 0,
        color: '#b8b8b8',
        fontSize: 20,
    },
    phoneInput: {
        flex: 1,
        paddingLeft: 5,
    },
    component: {
        marginTop: 20
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    radioButton: {
        fontWeight: '500',
        width: 270,
    },
    icon: {
        fontSize: 20,
        color: Colors.light.tint
    }
});
