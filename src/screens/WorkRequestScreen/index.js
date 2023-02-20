import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, ScrollView, StyleSheet, Dimensions,} from 'react-native';
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import PhonebookModal from "../../components/PhonebookModal";
import ProfilePicture from "../../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";
import {SearchCategory} from "../../components/SearchCategory";
import ChoiceSelector from "../../components/ChoiceSelector";
import {LocationSelector} from "../../components/LocationSearch";
import Slider from "@react-native-community/slider";


const WorkRequestScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(50);
    const [priceMax, setPriceMax] = useState(20);
    const navigation = useNavigation()

    function referralActivityClickHandler() {
        navigation.navigate('ReferralActivityScreen');
    }

    function onSubmitPress() {
        navigation.navigate('RequestReferralScreen')
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarActiveTintColor: Colors.light.tint,
            headerLargeTitle: false,
            headerLeftContainerStyle: {
                left: 10,
            },
            tabBarIcon: ({color}) => (
                <Fontisto name="home" size={25} color={color}/>
            ),
            headerTitle: () => (
                <Text> Request a worker</Text>
            ),
            headerRight: () => (
                <Pressable
                    onPress={onSubmitPress}
                    style={[({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    }), styles.submitButton]}>
                    <Text style={styles.submitButtonText}>Request</Text>
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
        <ScrollView style={styles.container}>
            <View style={styles.criteriaContainer}>
                <SearchCategory navigation={navigation} style={{marginHorizontal: 10 }}/>
                <ChoiceSelector/>
                <View style={styles.locationContainer}>
                    <Text>Within: {locationMax} km of  </Text>
                    <Slider
                        value={locationMax}
                        onValueChange={setLocationMax}
                        step={1}
                        minimumTrackTintColor={Colors.light.tint}
                        maximumValue={150}
                        minimumValue={1}
                        thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.light.tint }}
                    />
                    <LocationSelector style={{marginTop: 10}} />
                </View>
                <View style={styles.sliderContainer}>
                    <Text>Max Price/hr: {priceMax} $$  </Text>
                    <Slider
                        value={priceMax}
                        onValueChange={setPriceMax}
                        step={1}
                        minimumTrackTintColor={Colors.light.tint}
                        maximumValue={200}
                        minimumValue={1}
                        thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.light.tint }}
                        trackStyle={{ height: 5, backgroundColor: '#5e5e5e' }}
                    />
                </View>
            </View>
            {/*<View style={styles.activityContainer}>*/}
            {/*    <View style={styles.activityHeaderContainer}>*/}
            {/*        <Ionicons name="file-tray-full-outline" size={25} color={Colors.dark.grey}/>*/}
            {/*        <Text style={{margin: 5, color: Colors.dark.grey}}>Referral Activities</Text>*/}
            {/*    </View>*/}
            {/*    <ReferralRequestItem handler={referralActivityClickHandler} item={users[0]} />*/}
            {/*    <ReferralRequestItem handler={referralActivityClickHandler} item={users[1]} />*/}
            {/*</View>*/}
        </ScrollView>
    );
};

export default WorkRequestScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        height: '100%'
    },
    criteriaContainer: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#d3cfcf',
        borderBottomWidth: 1,
        padding: 10,
    },
    activityContainer: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderColor: '#d3cfcf',
        marginHorizontal: 15,
        height: 200,
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
    },
    activityHeaderContainer: {
        flexDirection: 'row',
        padding: 5,
    },
    sliderContainer: {
        marginTop: 30,
        backgroundColor: '#ffffff',
        borderColor: '#bdb8b8',
        marginHorizontal: 15,
        height: 80,
        borderWidth: 0,
        borderRadius: 15,
        padding: 5,
    },
    locationContainer: {
        marginTop: 5,
        backgroundColor: '#ffffff',
        borderColor: '#bdb8b8',
        marginHorizontal: 10,
        height: 120,
        borderWidth: 0,
        borderRadius: 15,
        padding: 5,
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        width: '70%',
        marginLeft: 25,
    },
    button: {
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: '#e5e0e0',
        width: Dimensions.get('screen').width - 20,
        height: 50,

        borderRadius: 10,
        marginHorizontal: 10,
        // paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 10,
        zIndex: 1
    },
    submitButton: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#fff'
    },
});
