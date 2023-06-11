import React, {Component, useCallback, useEffect, useRef, useState} from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Image} from "react-native";
import Colors from "../../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput from "react-phone-number-input/react-native-input";
import SocialNetworkSelector from "../SocialNetworkSelector";
import Entypo from "react-native-vector-icons/Entypo";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import loading2 from "../../../../assets/images/loading2.gif";
import ProfileListItem from "../../../components/ProfileListItem";
import {ProfileService} from "../../../backend/ProfileService";

const SocialIcon = ({ name }) => {
    if(name === 'gigbusters'){
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
    const [accountType, setAccountType] = useState('gigbusters');
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

    function chosePhoneNumberPress() {
        handleChanges({
            type: accountType,
            uri: phone
        })
    }

    useEffect(() => {
        loadData().then(r => {}).catch(e => console.log(e))
    }, [])

    async function loadData() {
        const profilesObj = await profileService.listProfiles({
            limit: 1000,
        })
        setProfiles(profilesObj)
    }

    async function onProfilePressed(params) {
        params.type = accountType
        handleChanges(params)
    }

    return (
        <View style={styles.container}>
            <View style={styles.bottomContainer}>

            </View>

            <View style={styles.searchTextContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handlePresentPress}>
                    <SocialIcon name={accountType} />
                    <Feather name="chevron-down" size={20} />
                </TouchableOpacity>
                {
                    (accountType === 'phone') ?
                        <View style={styles.phoneContainer}>
                            <PhoneInput
                                defaultCountry="CA"
                                countrySelectProps={{ unicodeFlags: true }}
                                value={phone}
                                onChange={setPhone}
                                style={styles.accountInput}
                            />
                            <TouchableOpacity style={styles.selectButton} onPress={chosePhoneNumberPress}>
                                <FontAwesome5 name="chevron-circle-right" size={25} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        :
                        <TextInput
                            onChangeText={value => setUri(value)}
                            style={styles.searchInput}
                            placeholder={"Search..."}
                        />
                }

            </View>
            <View>
                {
                    dataBeingLoaded ?
                        <Image source={loading2} style={styles.loading2} />
                        :
                        (accountType !== 'phone') ?
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
                            :
                            <></>
                }
            </View>

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
    phoneContainer: {
        flexDirection: 'row',
        width: '90%'
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
        width: '85%',
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
        fontSize: 25,
        color: Colors.light.tint,
        marginHorizontal: 3,
    }
});
