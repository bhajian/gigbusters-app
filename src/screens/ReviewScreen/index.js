import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import FameorbitFeed from "../../components/FameorbitFeed";
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import NewReviewButton from "../../components/NewReviewButton";
import ProfilePicture from "../../components/ProfilePicture";
import ReviewableSearch from "../../components/ReviewableSearch";


export default function SearchScreen(props) {
    const [searchText, setSearchText] = useState('');

    const navigation = useNavigation();

    const bottomSheetModalRef = useRef(null);
    const handlePresentPress = () => bottomSheetModalRef.current.present()
    const handleSheetChanges = useCallback((index) => {

    }, []);

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            // headerLargeTitle: true,
            tabBarIcon: ({color}) => (
                <Fontisto name="react" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text>Fame Orbit</Text>
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
                <ProfilePicture
                    size={30}
                    image={
                        'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250'
                    }
                />
            ),
        })
    }, [navigation]);

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

