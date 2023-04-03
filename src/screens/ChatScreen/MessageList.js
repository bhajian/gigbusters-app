import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Image,
    ScrollView, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Pressable,
} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import loading2 from "../../../assets/images/loading2.gif";
import MessageItem from "../../components/MessageItem";
import tipoffs from "../../../assets/data/tipoffs";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import {ProfileService} from "../../backend/ProfileService";
import EditDeleteBottomSheet from "../RequestActivityScreen/RequestActivityDetailScreen/EditDeleteBottomSheet";
import ProfileSearchBottomSheet from "./ProfileSearchBottomSheet";
import Fontisto from "react-native-vector-icons/Fontisto";
import UserAvatar from "@muhzi/react-native-user-avatar";

export default function MessageListScreen() {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState(null)
    const [dataBeingLoaded, setDataBeingLoaded] = useState(false)
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null)
    const profileService = new ProfileService()

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            // headerLargeTitle: true,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Messages</Text>
            ),
            headerSearchBarOptions: {
                placeholder: "Search ..",
                // onFocus: ()=>{navigation.navigate('SearchCategory')}
            },

            headerLeft: () => (
                <UserAvatar
                    size={30}
                    active
                    name={name}
                    src={profileImage}
                />
            ),
        })

    }, [navigation, name])

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setName(profile.name)
        }
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setProfileImage(url)
        }
    }

    const handleSheetChanges = useCallback((value) => {
    }, [])

    async function onChatPressed(cardIndex) {
        navigation.navigate('ChatScreen')
    }

    async function onProfilePressed(params) {
        navigation.navigate('ReviewableProfileScreen', {reviewable: tipoffs[0]})
    }

    const onNewMessagePress = () => {
        bottomSheetModalRef.current.present()
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                dataBeingLoaded ?
                    <Image source={loading2} style={styles.loading2} />
                    :
                    <FlatList
                        data={tipoffs}
                        renderItem={({item}) => {
                            return(
                                <MessageItem
                                    item={item}
                                    onChatPressed={onChatPressed}
                                    onProfilePressed={onProfilePressed}
                                />
                            )
                        }}
                        keyExtractor={(item) => item.to.userId}
                    />
            }
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={onNewMessagePress}>
                <Entypo name="new-message" size={27} color="white"/>
            </TouchableOpacity>
            <ProfileSearchBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        alignItems: "stretch",
        height: '100%'
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        margin: 30
    },
    logo: {
        width: '100%',
        height: 500,
    },
    text:{
        textAlign: "center",
    },
    textLogo: {
        textAlign: "center",
        fontSize: 41,
        color: "#5B67CA"
    },
    button: {
        backgroundColor: Colors.light.tint,
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 55,
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})