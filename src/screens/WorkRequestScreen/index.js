import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, ScrollView,} from 'react-native';
import styles from './styles';
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
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10,
                    })}>
                    <MaterialCommunityIcons
                        name="email-send"
                        size={25}
                        color={Colors.light.tint}
                        style={{marginRight: 15}}
                    />
                    <PhonebookModal
                        visibility={isModalVisible}
                        // onClose={toggleModal}
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
        <ScrollView style={styles.container}>
            <View style={styles.criteriaContainer}>
                {/*<SearchCategory navigation={navigation} />*/}
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
                        // trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    />
                    <LocationSelector />
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
