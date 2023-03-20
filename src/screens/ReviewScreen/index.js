import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    Text,
    Pressable,
    SafeAreaView, StyleSheet
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FameorbitFeed from "../../components/FameorbitFeed";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import NewReviewButton from "../../components/NewReviewButton";
import ReviewableSearch from "../../components/ReviewableSearch";
import {ProfileService} from "../../backend/ProfileService";
import UserAvatar from "react-native-user-avatar";


export default function ReviewScreen(props) {
    const [name, setName] = useState('')
    const navigation = useNavigation()
    const bottomSheetModalRef = useRef(null)
    const profileService = new ProfileService()

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if (profile && profile.name) {
            setName(profile.name)
        }
    }

    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {
    }, [])

    useEffect(() => {
        getCurrentUserData().then(r => {
            navigation.setOptions({
                tabBarActiveTintColor: Colors.light.tint,
                // headerLargeTitle: true,
                tabBarIcon: ({color}) => (
                    <Fontisto name="react" size={25} color={color}/>
                ),
                headerTitle: () => (
                    <Text>Gig Buster Reviews</Text>
                ),
                headerSearchBarOptions: {
                    placeholder: "Search ..",
                    // onFocus: ()=>{navigation.navigate('SearchCategory')}
                },
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
                        name={name}
                        // src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                    />
                ),
            })
        })
    }, [navigation, name])

    return (
        <SafeAreaView style={styles.contentContainer}>
            <FameorbitFeed/>
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
        // height: '100%',
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
