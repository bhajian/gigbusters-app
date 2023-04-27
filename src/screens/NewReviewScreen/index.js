import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Image,
    View,
    Text,
    ScrollView, Dimensions, KeyboardAvoidingView, Pressable, Keyboard,
} from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
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
import {Auth} from "aws-amplify";
import {ReviewService} from "../../backend/ReviewService";
import {useNavigation} from "@react-navigation/native";
import ReviewDetailBottomSheet from "./ReviewDetailBottomSheet";
import loading from "../../../assets/images/loading2.gif";

let {width, height} = Dimensions.get('window')

export default function NewReviewScreen({route}) {

    const [dataBeingSaved, setDataBeingSaved] = useState(false)
    const reviewService = new ReviewService()
    const profileService = new ProfileService()
    const navigation = useNavigation()

    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [category, setCategory] = useState('')
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
    const revieweeBottomSheetModalRef = useRef(null)
    const detailBottomSheetModalRef = useRef(null)
    const inputTestRef = useRef()


    const handleRevieweeSheetChanges = useCallback((value) => {
    }, [])

    const handleDetailSheetChanges = useCallback((value) => {
    }, [])

    const removeImage = (value) => {
        setImages(images.filter(item => item !== value))
    }
    const getValueFromBottomSheet = (value) => {
        inputTestRef?.current?.focus()
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
        Keyboard.dismiss()
        detailBottomSheetModalRef.current.present()
    }

    const getValueFromDetailBottomSheet = (props) => {
        setCategory(props.category)
        setLocation(props.location)
        inputTestRef?.current?.focus()
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData])

    useEffect(() => {
        Keyboard.dismiss()
        revieweeBottomSheetModalRef.current.present()
    }, [revieweeBottomSheetModalRef])

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
                dataBeingSaved ?
                    <Image source={loading} style={{width: 30, height: 30}} />
                    :
                    <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
            ),
            headerTintColor: Colors.light.tint
        })
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            },
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            },
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }

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

    async function onSubmitPress() {
        setDataBeingSaved(true)
        try{
            const response = await reviewService.createReview({
                reviewable: {
                    type: revieweeAccountType,
                    uri: revieweeUri,
                    categories: [category]
                },
                rating: rating,
                review: review,
                category: category,
                location: location
            })
            const user = await Auth.currentCredentials()
            images.map(async(e)=> {
                await reviewService.addPhoto({
                    type: 'main',
                    reviewId: response.id,
                    identityId: user.identityId,
                    photo: e
                })
            })
            navigation.navigate('RequestCompletedScreen')
        } catch (e) {
            console.log(e)
        }
        setDataBeingSaved(false)
    }

    async function onImagePickerPress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.1,
        })
        const imageUri = result?.assets[0]?.uri
        if (!result.canceled) {
            setImages([...images, imageUri])
        } else{
            return
        }
    }

    function onRevieweePress() {
        Keyboard.dismiss()
        revieweeBottomSheetModalRef.current.present()
    }

    async function onDetailPress() {
        Keyboard.dismiss()
        detailBottomSheetModalRef.current.present()
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 155}
        >
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.newReviewContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.reviewUsersContainer}>
                            <View style={styles.avatarReviewerContainer}>
                                <UserAvatar
                                    size={35}
                                    fontSize={20}
                                    backgroundColor={Colors.light.turquoise}
                                    userName={reviewerName}
                                    src={profileImage}
                                />
                                <View style={styles.reviewerName}>
                                    <Text style={styles.reviewerText}>{reviewerName}</Text>
                                    <Feather name="chevron-right" size={20}/>
                                </View>
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
                                            fontSize={20}
                                            backgroundColor={Colors.light.turquoise}
                                            userName={revieweeName}
                                            src={revieweeImage}
                                        />
                                }
                                <TouchableOpacity style={styles.revieweeName} onPress={onRevieweePress}>
                                    <Text style={styles.revieweeText}> {revieweeName} </Text>
                                    <Feather name="chevron-down" size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.detailTopContainer}>
                            <TouchableOpacity onPress={onImagePickerPress} style={styles.detailTopButton}>
                                <MaterialCommunityIcons name="image-plus" style={{fontSize: 35, color: Colors.light.tint}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDetailPress} style={styles.detailTopButton}>
                                <MaterialIcons name="category" style={{fontSize: 30, color: Colors.light.tint}}/>
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
                                ref={inputTestRef}
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

            <View style={[{marginBottom: !isKeyboardVisible ? 30: 0}, styles.imageSelectorContainer]}>
                <TouchableOpacity onPress={onImagePickerPress}  style={styles.detailButton}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 30, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRevieweePress}  style={styles.detailButton}>
                    <Ionicons name="person-circle-sharp" style={{fontSize: 30, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetailPress}  style={styles.detailButton}>
                    <MaterialIcons name="category" style={{fontSize: 30, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetailPress} style={styles.locationBar}>
                    <Entypo name="location" style={{fontSize: 30, color: Colors.light.tint}}/>
                    <Text style={styles.locationText}>{location?.locationName}</Text>
                </TouchableOpacity>
            </View>
            <AccontSearchBottomSheet
                handleSheetChanges={handleRevieweeSheetChanges}
                bottomSheetModalRef={revieweeBottomSheetModalRef}
                getValueFromBottomSheet={getValueFromBottomSheet}
            />
            <ReviewDetailBottomSheet
                handleSheetChanges={handleDetailSheetChanges}
                bottomSheetModalRef={detailBottomSheetModalRef}
                getValueFromBottomSheet={getValueFromDetailBottomSheet}
                defaultData={{location: location, category: category}}
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
    detailTopContainer: {
        backgroundColor: 'white',
        borderColor: Colors.light.darkerGrey,
        flexDirection: 'row',
        paddingVertical: 5,
        marginRight: 5,
    },
    imageSelectorContainer: {
        backgroundColor: 'white',
        // borderTopWidth: 1,
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
        // borderWidth: 1,
        borderColor: Colors.light.tint,
        height: 35,
        width: 35,
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
    detailTopButton: {
        borderRadius : 5,
        borderColor: Colors.light.tint,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
