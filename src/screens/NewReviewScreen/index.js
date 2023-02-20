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
    Switch, ScrollView, Button, Dimensions, KeyboardAvoidingView,
} from 'react-native';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
import {v4 as uuidv4} from 'uuid';
import Colors from '../../constants/Colors';
import CustomSwitch from '../../components/CustomSwitch';
import {EvilIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import NewReviewTopContainer from "./NewReviewTopContainer";
import {RatingBar} from "@aashu-dubey/react-native-rating-bar";
import {Icon} from "react-native-elements";
import SocialNetworkSelector from "./SocialNetworkSelector";
import {useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UserAvatar from "@muhzi/react-native-user-avatar";
import Feather from "react-native-vector-icons/Feather";
import AccontSearchBottomSheet from "./AccountSearchReviewScreen/AccontSearchBottomSheet";

let {width, height} = Dimensions.get('window')
export default function NewReviewScreen({navigation, route}) {
    let contact = route.params ? route.params.contact : {
        name: 'behnam',
        image: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250',
        id: 1
    };

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2.5);
    const [imageUrl, setImageUrl] = useState('');
    const [accountType, setAccountType] = useState('');
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const bottomSheetModalRef = useRef(null);
    const handleSheetChanges = useCallback((index) => {
    }, []);


    async function getCurrentUserId() {
        // const currentUser = await Auth.currentAuthenticatedUser();
        // if (currentUser) {
        //   setSenderId(currentUser.attributes.sub);
        // }
    }

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            // const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // if (status !== 'granted') {
            //   alert('Sorry, we need camera roll permissions to make this work!');
            // }
        }
    };

    useEffect(() => {
        bottomSheetModalRef.current.present()
        getPermissionAsync().then(e => {
            getCurrentUserId().then(r => {
            });
        });
    }, []);

    const pickImage = async () => {
        try {
            // let result = await ImagePicker.launchImageLibraryAsync({
            //   mediaTypes: ImagePicker.MediaTypeOptions.All,
            //   allowsEditing: true,
            //   aspect: [4, 3],
            //   quality: 1,
            // });
            // if (!result.cancelled) {
            //   setImageUrl(result.uri);
            // }
            //
            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const uploadImage = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1];
            const key = `${uuidv4()}.${extension}`;
            await Storage.put(key, blob);
            return key;
        } catch (e) {
            console.log(e);
        }
        return '';
    };

    function onSubmitPress() {
        navigation.navigate('MoreInfoSubmissionScreen');
    }

    function onReviewerPress() {

    }

    function onRevieweePress() {
        bottomSheetModalRef.current.present()
    }

    function handlePresentPress()
    {
        bottomSheetModalRef.current.present()
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >
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
                                src="https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250"
                            />
                            <TouchableOpacity style={styles.reviewerName} onPress={onReviewerPress}>
                                <Text style={styles.reviewerText}>Behnam</Text>
                                <Feather name="chevron-down" size={20}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatarRevieweeContainer}>
                            <UserAvatar
                                size={35}
                                active
                                src="https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_.jpg"
                            />
                            <TouchableOpacity style={styles.revieweeName} onPress={onRevieweePress}>
                                <Text style={styles.revieweeText}> Katy Perry </Text>
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
                                onRatingUpdate={setRating}
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
                </View>
            </ScrollView>
            <View style={styles.imageSelectorContainer}>
                <TouchableOpacity onPress={onReviewerPress} style={styles.pickImage}>
                    <MaterialCommunityIcons name="image-plus" style={{fontSize: 50, color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                    <Image
                        source={{uri: 'https://d14u0p1qkech25.cloudfront.net/1073359577_1fc084e5-1ae2-4875-b27d-1a42fd80ff28_thumbnail_250x250'}}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            marginVertical: 5
                        }}
                    />
                </TouchableOpacity>
            </View>
            <AccontSearchBottomSheet
                handleSheetChanges={handleSheetChanges}
                bottomSheetModalRef={bottomSheetModalRef}
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
        backgroundColor: Colors.light.grey,
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
        padding: 10,
        color: Colors.light.tint
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
        marginVertical: 5,
        marginHorizontal: 2,
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
    }
});
