import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Platform,
    Image,
    View,
    Text,
    ScrollView, Dimensions, KeyboardAvoidingView,
} from 'react-native';
import {Storage} from 'aws-amplify';
import Colors from '../../constants/Colors';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RatingBar} from "@aashu-dubey/react-native-rating-bar";
import {Icon} from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import AccontSearchBottomSheet from "./AccountSearchReviewScreen/AccontSearchBottomSheet";
import {ProfileService} from "../../backend/ProfileService";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";

let {width, height} = Dimensions.get('window')

const ImageList = ({ item, remove }) => {
    return <View>
                <TouchableOpacity
                    onPress={(e) => remove(item)}
                    style={styles.imageItem}>
                    <Feather name="x-circle" style={styles.backIcon}/>
                    <Image source={{uri: item}} style={ {width: 100, height: 100 }} />
                </TouchableOpacity>
            </View>
}
export default function NewReviewScreen({navigation, route}) {
    let contact = route.params ? route.params.contact : {
        name: 'behnam',
        image: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250',
        id: 1
    };

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(3)
    const [revieweeAccountType, setRevieweeAccountType] = useState('phone')
    const [revieweeUri, setRevieweeUri] = useState(null)
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const snapPoints = useMemo(() => ['25%', '50%'], [])
    const bottomSheetModalRef = useRef(null)
    const profileService = new ProfileService()

    const handleSheetChanges = useCallback((value) => {
    }, [])

    const remove = (value) => {
        console.log(value)
        setImages(images.filter(item => item !== value))
    }
    const getValueFromBottomSheet = (value) => {
        setRevieweeAccountType(value.type)
        setRevieweeUri(value.uri)
    }

    useEffect(() => {
        getCurrentUserData().then(r => {})
    }, [getCurrentUserData])

    useEffect(() => {
        bottomSheetModalRef.current.present()
    }, [bottomSheetModalRef])

    async function getCurrentUserData() {
        const profile = profileService.getProfile()
        if(profile && profile.name){
            setName(profile.name)
        }
        if(profile && profile.location && profile.location){
            setLocation(profile.location)
        }
        if(profile && profile.photos && profile.photos[0] && profile.photos[0].key){
            try{
                const mainPhoto = profile.photos
                    .filter((item) => item.main === true)
                const key = mainPhoto[0].key
                const signedURL = await Storage.get(key, { level: 'protected' })
                setProfileImage(signedURL)
            } catch (e) {
                console.log(e)
            }
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
        >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}>
                            <FontAwesome name="chevron-left" style={styles.backIcon}/>
                            <Text style={styles.backIcon}> Back </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.newReviewContainer}>
                    <View style={styles.reviewUsersContainer}>
                        <View style={styles.avatarReviewerContainer}>
                            <UserAvatar
                                size={35}
                                active
                                name={name}
                                src={profileImage}
                            />
                            <TouchableOpacity
                                style={styles.reviewerName}
                                // onPress={onImagePickerPress}
                            >
                                <Text style={styles.reviewerText}>{name}</Text>
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
                                        name={revieweeUri}
                                        src=""
                                    />
                            }
                            <TouchableOpacity style={styles.revieweeName} onPress={onRevieweePress}>
                                <Text style={styles.revieweeText}> {revieweeUri} </Text>
                                <Feather name="chevron-down" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.reviewInputContainer}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>Rating: </Text>
                            <RatingBar
                                initialRating={3}
                                minRating={0}
                                direction="horizontal"
                                allowHalfRating
                                unratedColor={Colors.light.grey}
                                itemCount={5}
                                itemPadding={1}
                                itemSize={25}
                                itemBuilder={() => <Icon name="star" color={Colors.light.tint} size={25}/>}
                                onRatingUpdate={value => setRating(value)}
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
                            {/*<Image source={{uri: "file:///Users/behnamhajian/Library/Developer/CoreSimulator/Devices/17CED454-5C51-4994-9A17-DDE884843C08/data/Containers/Data/Application/920CD1FF-6BBF-4F61-AF0F-C5E6CE540667/Library/Caches/ExponentExperienceData/%2540behnamorbitstellar%252Ffameorbit-app/ImagePicker/A44B697B-8A52-4931-A018-7836761EB9DC.jpg"}} style={ {width: 50, height: 50 }} />*/}
                        </View>
                    </View>
                    <View style={styles.imageContainer}>

                        {
                            images.map((e)=> <ImageList item={e} remove={remove} />)
                        }

                    </View>
                </View>
            </ScrollView>

            <View style={styles.imageSelectorContainer}>
                <TouchableOpacity onPress={onImagePickerPress} style={styles.pickImage}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 45, color: Colors.light.tint}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationBar}>
                    <Entypo name="location" style={{fontSize: 30, color: Colors.light.tint}}/>
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
        paddingTop: 50,
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
        borderColor: Colors.dark.grey,
        flexDirection: 'row',
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
