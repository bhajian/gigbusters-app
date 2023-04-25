import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    Text,
    Pressable,
    SafeAreaView, StyleSheet
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import ReviewFeed from "../../components/ReviewFeed";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import NewReviewButton from "../../components/NewReviewButton";
import ReviewableSearch from "../../components/ReviewableSearch";
import {ProfileService} from "../../backend/ProfileService";
import UserAvatar from "react-native-user-avatar";


export default function ReviewScreen(props) {
    const [name, setName] = useState('')
    const [profileImage, setProfileImage] = useState(null)

    const navigation = useNavigation()
    const bottomSheetModalRef = useRef(null)
    const profileService = new ProfileService()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData().then().catch(e => console.log(e))
        })
        return unsubscribe
    }, [navigation])

    async function loadData() {
        const profile = profileService.getProfile()
        if (profile && profile.name) {
            setName(profile.name)
        }
        if (profile && profile.photos) {
            const url = profile.mainPhotoUrl
            setProfileImage(url)
        }
    }

    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerTitle: () => (
                <Text>Worker Pool</Text>
            ),
            headerRight: () => (
                <Pressable
                    onPress={handlePresentPress}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="account-search"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <UserAvatar
                    size={35}
                    active
                    name={name}
                    src={profileImage}
                />
            ),
        })
    }, [navigation, name])

    return (
        <SafeAreaView style={styles.contentContainer}>
            <ReviewFeed/>
            <NewReviewButton/>
            <ReviewableSearch
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    searchBarContainer: {
        flexDirection: "row",
        width: '100%',
        borderBottomColor: 'grey',
        backgroundColor: 'white',
    },
    searchInput: {
        flexDirection: "row",
        paddingTop: 7,
        paddingLeft: 7,
        marginHorizontal: 7,
        width: '80%',
        backgroundColor: '#eae8e8',
        borderRadius: 10,
    },
    searchButton: {
        marginTop: 10,
        marginLeft: 5,
        maxWidth: '12%'
    },
    contentContainer: {
        backgroundColor: '#ffffff',
        height: '100%',
        // marginTop: 180,
    },
    iconContainer: {
        borderWidth: 1,
        width: 30,
        height: 30,
        borderColor: "grey",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid'
    },
});
