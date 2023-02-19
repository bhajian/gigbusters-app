import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    FlatList,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../../constants/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import {FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import PhonebookModal from "../../../components/PhonebookModal";
import ProfilePicture from "../../../components/ProfilePicture";
import {useNavigation} from "@react-navigation/native";
import {SearchCategory} from "../../../components/SearchCategory";
import ChoiceSelector from "../../../components/ChoiceSelector";
import {LocationSelector} from "../../../components/LocationSearch";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const MoreInfoSubmissionScreen = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationMax, setLocationMax] = useState(50);
    const [priceMax, setPriceMax] = useState(20);
    const navigation = useNavigation()

    function onSubmitPress() {
        navigation.navigate('ReviewScreen')
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
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <FontAwesome name="chevron-left" style={styles.backIcon}/>
                            <Text style={styles.backIcon}>  Back </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                        <Text style={styles.buttonText}>Submit</Text>
                        {/*<Ionicons name="enter" size={25} color="white"/>*/}
                    </TouchableOpacity>
                </View>
                <View style={styles.locationContainer}>
                    <LocationSelector style={{marginTop: 10}} />
                </View>
                <SearchCategory navigation={navigation} style={{marginHorizontal: 10 }}/>
                <ChoiceSelector/>

            </View>

        </ScrollView>
    );
};

export default MoreInfoSubmissionScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#ffffff',
        height: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
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
    // button: {
    //     backgroundColor: 'white',
    //     width: 200,
    //     height: 40,
    //     borderRadius: 10,
    //     marginTop: 15,
    //     marginLeft: 25,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // buttonText: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },
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
});
