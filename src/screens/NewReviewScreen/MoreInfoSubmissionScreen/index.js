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
    TouchableOpacity, Image,
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
import {ProfileService} from "../../../backend/ProfileService";
import {ReviewService} from "../../../backend/ReviewService";
import loading from "../../../../assets/images/loading.gif";


const MoreInfoSubmissionScreen = props => {
    const reviewObj = props?.route?.params
    const [isModalVisible, setModalVisible] = useState(false)
    const [location, setLocation] = useState(reviewObj?.location)
    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const reviewService = new ReviewService()

    const navigation = useNavigation()


    function getCategorySelectedValue(value){
        reviewObj.category = value
    }
    async function onSubmitPress() {
        setDataBeingSaved(true)
        try{
            await reviewService.createReview({
                reviewable: {
                    type: reviewObj.type,
                    uri: reviewObj.uri,
                    categories: [reviewObj.category]
                },
                rating: reviewObj.rating,
                review: reviewObj.review,
                category: reviewObj.category,
                location: reviewObj.location
            })
            navigation.navigate('RequestCompletedScreen')
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    useEffect(() => {

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
                    {
                        dataBeingSaved ?
                            <Image source={loading} style={{width: 40, height: 30}} />
                            :
                            <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                    }

                </View>
                <View style={styles.locationContainer}>
                    <LocationSelector locationNameParam={location.locationName} style={{marginTop: 10}} />
                </View>
                <SearchCategory navigation={navigation} style={{marginHorizontal: 10 }}/>
                <ChoiceSelector passSelectedValue={getCategorySelectedValue}/>

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
