import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Image} from "react-native";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput from "react-phone-number-input/react-native-input";
import SocialNetworkSelector from "../SocialNetworkSelector";
import Entypo from "react-native-vector-icons/Entypo";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import loading2 from "../../../../assets/images/loading2.gif";
import ProfileListItem from "../../../components/ProfileListItem";
import {ProfileService} from "../../../backend/ProfileService";
import tipoffs from "../../../../assets/data/tipoffs";

const SocialIcon = ({ name }) => {
    if(name === 'gigbuster'){
        return <MaterialCommunityIcons
            style={styles.icon}
            name={"orbit"}
        />
    }
    if(name === 'phone'){
        return <Entypo
                    style={styles.icon}
                    name={"phone"}
                />
    }
    if(name === 'web'){
        return <MaterialCommunityIcons
                    style={styles.icon}
                    name={"web"}
                />
    }
    if(name === 'instagram'){
        return <Entypo
                    style={styles.icon}
                    name={"instagram"}
                />
    }
    if(name === 'tiktok'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"tiktok"}
                />
    }
    if(name === 'twitter'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"twitter"}
                />
    }
    if(name === 'linkedin'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"linkedin"}
                />
    }
    if(name === 'facebook'){
        return <FontAwesome5
                    style={styles.icon}
                    name={"facebook"}
                />
    }
    return <></>
}

export default function AccountSearchReviewScreen({navigation, route, handleChanges}) {
    const [accountType, setAccountType] = useState('gigbuster');
    const [phone, setPhone] = useState('+1');
    const [uri, setUri] = useState('');
    const bottomSheetModalRef = useRef(null)
    const [profiles, setProfiles] = useState([])
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)

    const profileService = new ProfileService()

    const handleSheetChanges = useCallback((value) => {
        setAccountType(value)
    }, []);

    const selectPressed = useCallback((value) => {
        handleChanges({
            type: accountType,
            uri: (accountType === 'phone' ? phone : uri)
        })
    }, [phone, uri]);

    const cancelPressed = useCallback((value) => {

    }, [])

    function handlePresentPress() {
        bottomSheetModalRef.current.present()
    }

    function handlePhonebookPress() {

    }

    useEffect(() => {
        loadData().then(r => {})
    }, [])

    async function loadData() {
        const profilesObj = await profileService.listProfiles({
            limit: 20,
        })
        setProfiles(profilesObj)
    }

    async function onProfilePressed(params) {

    }

    return (
        <View style={styles.container}>
            <View style={styles.bottomContainer}>
                <View style={styles.doubleButton}>
                    <CustomButton
                        text="Cancel"
                        onPress={cancelPressed}
                        style={styles.linkAccountButton}
                        bgColor={Colors.light.grey}
                        fgColor="black"
                    />
                    <CustomButton
                        text="Select"
                        onPress={selectPressed}
                        style={styles.linkAccountButton}
                        bgColor={Colors.light.tint}
                        fgColor="white"
                    />
                </View>
            </View>

            <View style={styles.searchTextContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handlePresentPress}>
                    <SocialIcon name={accountType} />
                    <Feather name="chevron-down" size={20} />
                </TouchableOpacity>
                {
                    (accountType === 'phone') ?
                        <PhoneInput
                            defaultCountry="CA"
                            countrySelectProps={{ unicodeFlags: true }}
                            value={phone}
                            onChange={setPhone}
                            style={styles.accountInput}
                        />
                        :
                        <TextInput
                            onChangeText={value => setUri(value)}
                            style={styles.searchInput}
                            placeholder={"Search..."}
                        />
                }
                <TouchableOpacity style={styles.selectButton} onPress={handlePhonebookPress}>
                    <FontAwesome5 name="chevron-circle-right" size={20} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    dataBeingLoaded ?
                        <Image source={loading2} style={styles.loading2} />
                        :
                        <FlatList
                            data={profiles}
                            renderItem={({item}) => {
                                return(
                                    <ProfileListItem
                                        item={item}
                                        onProfilePressed={onProfilePressed}
                                    />
                                )
                            }}
                            keyExtractor={(item) => item.userId}
                        />
                }
            </ScrollView>

            <SocialNetworkSelector
                handleSheetChanges={handleSheetChanges}
                bottomSheetModalRef={bottomSheetModalRef}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fdfdfd",
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 16,
        borderBottomColor: '#e7e5e5',
        borderBottomWidth: 1
    },
    headerContainer: {
        zIndex: -1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        marginTop: 50,
    },
    headerLeft: {
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
    },
    searchInput:{
        marginLeft: 10,
        width: '80%',
    },
    searchContainer: {

    },
    revieweeContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        width: '100%'
    },
    accountInput: {
        backgroundColor: Colors.light.grey,
        marginLeft: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '80%',
    },
    searchTextContainer: {
        backgroundColor: Colors.light.grey,
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    doubleButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linkAccountButton:{
        width: '48%',
        height: 45
    },
    closeButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        // marginTop: 7,
        paddingEnd: 10,
    },
    nameText: {
        marginHorizontal: 10,
    },
    closeText: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    icon: {
        fontSize: 20,
        color: Colors.light.tint,
        marginHorizontal: 3,
    }
});
