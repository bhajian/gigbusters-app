import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, ScrollView, StyleSheet, Dimensions,} from 'react-native';
import Colors from "../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {useNavigation} from "@react-navigation/native";
import {SearchCategory} from "../../components/SearchCategory";
import ChoiceSelector from "../../components/ChoiceSelector";
import {LocationSelector} from "../../components/LocationSearch";
import {ProfileService} from "../../backend/ProfileService";
import {Slider} from '@miblanchard/react-native-slider'
import {Ionicons} from "@expo/vector-icons";

const GigRequestScreen = props => {
    const [profileName, setProfileName] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [distance, setDistance] = useState([50])
    const [price, setPrice] = useState([20])
    const profileService = new ProfileService()
    const navigation = useNavigation()

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if (profile && profile.name) {
            setProfileName(profile.name)
        }
        if(profile && profile.location && profile.location.locationName){
            setLocation(profile.location)
        }
    }

    function onSubmitPress() {
        navigation.navigate('GigRequestDetailScreen', {
            location: location,
            category: category,
            distance: distance[0],
            price: price[0],
        })
    }

    function getCategorySelectedValue(value){
        setCategory(value)
    }

    const onLocationChangePressed = async(props) => {
        setLocation(props)
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
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
                    <Text> Request a gig</Text>
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
                headerLeft: (color) => (
                    <Ionicons name="notifications-sharp" size={25} color={Colors.light.darkerGrey}/>
                ),
            })

    }, [navigation, getCurrentUserData])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.criteriaContainer}>
                <SearchCategory navigation={navigation} style={{marginHorizontal: 10}}/>
                <ChoiceSelector
                    passSelectedValue={getCategorySelectedValue}
                />
                <View style={styles.locationContainer}>
                    <Text>Within: {distance} km of </Text>
                    <Slider
                        value={distance}
                        onValueChange={value => setDistance(value)}
                        step={1}
                        maximumValue={150}
                        minimumValue={1}
                        minimumTrackTintColor={Colors.light.tint}
                        thumbTintColor={Colors.light.turquoise}
                    />
                    <LocationSelector
                        locationNameParam={location.locationName}
                        onLocationChangePressed={onLocationChangePressed}
                        style={{marginTop: 10}}
                    />
                </View>
                <View style={styles.sliderContainer}>
                    <Text>Price/hr: {price} $$ </Text>
                    <Slider
                        value={price}
                        onValueChange={setPrice}
                        step={1}
                        maximumValue={150}
                        minimumValue={1}
                        minimumTrackTintColor={Colors.light.tint}
                        thumbTintColor={Colors.light.turquoise}
                    />
                </View>
            </View>
            {/*<View style={styles.activityContainer}>*/}
            {/*    <View style={styles.activityHeaderContainer}>*/}
            {/*        <Ionicons name="file-tray-full-outline" size={25} color={Colors.dark.grey}/>*/}
            {/*        <Text style={{margin: 5, color: Colors.dark.grey}}>Referral Activities</Text>*/}
            {/*    </View>*/}
            {/*    <GigRequestItem handler={referralActivityClickHandler} item={users[0]} />*/}
            {/*    <GigRequestItem handler={referralActivityClickHandler} item={users[1]} />*/}
            {/*</View>*/}
        </ScrollView>
    );
};

export default GigRequestScreen;

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
