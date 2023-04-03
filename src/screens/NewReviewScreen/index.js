import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Image,
    View,
    Text,
    ScrollView, Dimensions, KeyboardAvoidingView, Pressable,
} from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import AccontSearchBottomSheet from "./AccountSearchReviewScreen/AccontSearchBottomSheet";
import {ProfileService} from "../../backend/ProfileService";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { Rating, AirbnbRating } from 'react-native-ratings'
import STAR_IMAGE from '../../../assets/images/star.png'
import ImageList from "../../components/ImageList";
import Fontisto from "react-native-vector-icons/Fontisto";

let {width, height} = Dimensions.get('window')

export default function NewReviewScreen({navigation, route}) {

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(3)
    const [revieweeAccountType, setRevieweeAccountType] = useState('gigbuster')
    const [revieweeUri, setRevieweeUri] = useState(null)
    const [revieweeImage, setRevieweeImage] = useState(null)
    const [revieweeName, setRevieweeName] = useState('')
    const [images, setImages] = useState([])
    const [reviewerName, setReviewerName] = useState('')
    const [location, setLocation] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const bottomSheetModalRef = useRef(null)
    const profileService = new ProfileService()

    const handleSheetChanges = useCallback((value) => {
    }, [])

    const removeImage = (value) => {
        setImages(images.filter(item => item !== value))
    }
    const getValueFromBottomSheet = (value) => {
        setRevieweeAccountType(value.type)
        if(value.type === 'gigbusters'){
            setRevieweeName(value.name)
            setRevieweeUri(value.accountCode)
            setRevieweeAccountType('gigbusters')
            setRevieweeImage(value.mainPhotoUrl)
        }
        if(value.type === 'phone'){
            setRevieweeUri(value.uri)
            setRevieweeAccountType('phone')
            setRevieweeName(value.uri)
        }
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData])

    useEffect(() => {
        bottomSheetModalRef.current.present()
    }, [bottomSheetModalRef])

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
                <Text> </Text>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            ),
            headerTintColor: Colors.light.tint
        })

    }, [onSubmitPress])

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setReviewerName(profile.name)
        }
        if(profile && profile.location && profile.location){
            setLocation(profile.location)
        }
        if(profile && profile.photos){
            const url = profile.mainPhotoUrl
            setProfileImage(url)
        }
    }

    function onSubmitPress() {
        navigation.navigate('MoreInfoSubmissionScreen', {
            review: review,
            rating: rating,
            type: revieweeAccountType,
            uri: revieweeUri,
            location: location,
            images: images
        });
    }

    async function onImagePickerPress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.1,
        })
        const imageUri = result.assets[0].uri
        if (!result.canceled) {
            setImages([...images, imageUri])
        } else{
            return
        }
    }

    function onRevieweePress() {
        bottomSheetModalRef.current.present()
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
        >
            <ScrollView>
                <View style={styles.newReviewContainer}>
                    <View style={styles.reviewUsersContainer}>
                        <View style={styles.avatarReviewerContainer}>
                            <UserAvatar
                                size={35}
                                active
                                name={reviewerName}
                                src={profileImage}
                            />
                            <TouchableOpacity
                                style={styles.reviewerName}
                                // onPress={onImagePickerPress}
                            >
                                <Text style={styles.reviewerText}>{reviewerName}</Text>
                                <Feather name="chevron-down" size={20}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatarRevieweeContainer}>
                            {
                                (revieweeAccountType === 'phone') ?
                                    <Entypo
                                        style={styles.icon}
                                        name={"phone"}
                                    />
                                    :
                                    <UserAvatar
                                        size={35}
                                        active
                                        name={revieweeName}
                                        src={revieweeImage}
                                    />
                            }
                            <TouchableOpacity style={styles.revieweeName} onPress={onRevieweePress}>
                                <Text style={styles.revieweeText}> {revieweeName} </Text>
                                <Feather name="chevron-down" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.reviewInputContainer}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>Rating: </Text>
                            <AirbnbRating
                                type='custom'
                                starImage={STAR_IMAGE}
                                showRating={false}
                                selectedColor={Colors.light.tint}
                                ratingBackgroundColor={Colors.light.grey}
                                ratingCount={5}
                                size={20}
                                onFinishRating={setRating}
                                style={{ paddingVertical: 10 }}
                            />
                        </View>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                value={review}
                                onChangeText={value => setReview(value)}
                                multiline={true}
                                style={styles.reviewInput}
                                placeholder={"Review..."}
                            />
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        {
                            images.map((e)=> <ImageList key={e.toString()} item={e} remove={removeImage} />)
                        }
                    </View>
                </View>
            </ScrollView>

            <View style={styles.imageSelectorContainer}>
                <TouchableOpacity onPress={onImagePickerPress}  style={styles.detailButton}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 35, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationBar}>
                    <Entypo name="location" style={{fontSize: 35, color: Colors.light.tint}}/>
                    <Text style={styles.locationText}>{location.locationName}</Text>
                </TouchableOpacity>
            </View>
            <AccontSearchBottomSheet
                handleSheetChanges={handleSheetChanges}
                bottomSheetModalRef={bottomSheetModalRef}
                getValueFromBottomSheet={getValueFromBottomSheet}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        borderBottomColor: 'lightgrey',
        // backgroundColor: 'grey'
    },
    headerLeft: {
        flexDirection: 'row',
    },
    newReviewContainer: {
        paddingHorizontal: 15,
    },
    reviewUsersContainer: {

    },
    imageSelectorContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: Colors.light.darkerGrey,
        flexDirection: 'row',
        paddingVertical: 5
    },
    closeButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
    },
    closeIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    reviewerName: {
        marginHorizontal: 10,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
    },
    revieweeName: {
        marginHorizontal: 10,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
    },
    locationText: {
        marginHorizontal: 5,
        padding: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.light.grey,
        borderRadius: 5,
    },
    button: {
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        width: 70,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    detailButton: {
        borderRadius : 5,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    ratingText: {
        paddingVertical: 5,
        marginHorizontal: 4,
        fontSize: 16,
        fontWeight: '500',
        textAlignVertical: 'bottom',
    },
    detailRatingText: {
        paddingVertical: 5,
        marginHorizontal: 4,
        fontSize: 20,
        textAlignVertical: 'bottom',
    },
    reviewInputContainer: {
        // zIndex: -10,
        // paddingHorizontal: 15,
        // height: 500,
        // backgroundColor: 'grey'
    },

    inputsContainer: {
        // backgroundColor: Colors.light.grey,
        marginTop: 5,
        borderRadius: 5,
    },
    reviewInput: {
        textAlignVertical: 'top',
        height: 170,
        maxHeight: 300,
        fontSize: 20,
        margin: 5,
        padding: 5,
        borderRadius: 15,
    },
    pickImage: {
        borderRadius: 5,
        marginVertical: 1,
        marginHorizontal: 2,
    },
    locationBar: {
        marginLeft: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'row'
    },
    settingText: {
        fontSize: 15,
        marginVertical: 10,
    },
    newMessageSetting: {
        bottom: 0,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    topContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
    },
    avatarReviewerContainer: {
        flexDirection: 'row',
        marginHorizontal: 7,
        marginTop: 10,
    },
    avatarRevieweeContainer: {
        flexDirection: 'row',
        marginHorizontal: 7,
        marginTop: 10,
    },
    backButton: {
        flexDirection: 'row',
        marginTop: 7,
        paddingEnd: 10,
        alignItems: 'center'
    },
    privateSwitch: {
        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
        marginTop: 5,
    },
    backIcon: {
        fontSize: 17,
        color: Colors.light.tint,
    },
    icon: {
        fontSize: 30,
        color: Colors.light.tint,
        marginHorizontal: 3,
    },
    imageContainer: {
        flexDirection: 'row',
    }
});
